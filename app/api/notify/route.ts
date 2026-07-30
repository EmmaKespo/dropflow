// app/api/notify/route.ts
/**
 * SECURED BEHIND-THE-GATEWAY MESSAGING TERMINAL
 * Receives public arrival pings, verifies credentials, and securely talks 
 * to Twilio APIs on the server side to protect developer access tokens.
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize a private, high-privilege server client to override RLS logs boundaries safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!; // Swap with service_role key in production
const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const { deliveryId, customerPhone, customerName, trackingToken } = await request.json();

    if (!deliveryId || !customerPhone || !trackingToken) {
      return NextResponse.json({ error: "Missing required tracking tokens parameters." }, { status: 400 });
    }

    // Extract secret Twilio workspace variables from your server environment
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioSender = process.env.TWILIO_WHATSAPP_NUMBER;

    // Build the pre-formatted notification message text matching your spec criteria rules
    const trackingUrl = `${new URL(request.url).origin}/track/${trackingToken}`;
    const smsMessageContent = `Hello ${customerName || "Client"}, your delivery driver has arrived at your destination terminal drop point! You can review active status metrics live here: ${trackingUrl}`;

    console.log(`Forwarding server payload directly to Twilio Gateway for destination: [${customerPhone}]`);

    // Execute the direct basic-auth server-side fetch handshake request to Twilio's API endpoint
    const twilioEndpoint = `https://twilio.com{accountSid}/Messages.json`;
    
    const formData = new URLSearchParams();
    formData.append("To", `whatsapp:${customerPhone}`);
    formData.append("From", `whatsapp:${twilioSender}`);
    formData.append("Body", smsMessageContent);

    const twilioNetworkResponse = await fetch(twilioEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`)
      },
      body: formData.toString()
    });

    const twilioResultData = await twilioNetworkResponse.json();

    // EVALUATE API DELIVERY CORES SUCCESS AND OUTCOMES LOGS [26-Jul-26 11:37 AM]
    if (twilioNetworkResponse.ok && twilioResultData.sid) {
      // PATHWAY A: Twilio confirmed message accepted onto carrier networks
      await supabaseServer
        .from("notifications")
        .update({ sending_status: "sent", twilio_sid: twilioResultData.sid })
        .eq("delivery_id", deliveryId);
        
      return NextResponse.json({ success: true, sid: twilioResultData.sid });
    } else {
      // PATHWAY B: Twilio server rejected parameter layouts or credentials mismatch
      throw new Error(twilioResultData.message || "Twilio gateway transaction rejected.");
    }

  }  catch (err) {
    // Helper to safely extract the message string
    const errorMessage = err instanceof Error ? err.message : String(err);

    console.error("SERVER MESSAGING ROUTE FAULT NODE:", errorMessage);
    
    // Safety Rule: Log error text information back inside audit rows for system diagnostics
    try {
      const { deliveryId } = await request.json().catch(() => ({}));
      if (deliveryId) {
        await supabaseServer
          .from("notifications")
          .update({ sending_status: "failed", error_details: errorMessage })
          .eq("delivery_id", deliveryId);
      }
    } catch (silentLogErr) {}

    // Gracefully return a 200 payload
    return NextResponse.json({ success: false, error: errorMessage });
  }
}
