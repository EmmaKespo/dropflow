# DropFlow 

> A lightweight logistics delivery platform that helps businesses track riders in real time and keep customers updated throughout the delivery process.

![Project Demo](path/to/screenshot.png)

# live preview  
https://dropflow-six.vercel.app

## 🌟 Features

- Delivery Management: Create and manage deliveries from a centralized business dashboard.

- Real-Time Tracking: Monitor delivery status updates in real time with Supabase Realtime.

- Simple Rider Tracking: Riders use a mobile-friendly tracking link without creating an account.

- One-Tap Status Updates: Riders can update deliveries with Picked Up, Arrived, and Delivered actions.

- Secure Tracking Links: Every delivery receives a unique tracking token.

- Customer Notifications: Automatically notify customers through WhatsApp when a rider arrives.

- Activity Logs: Keep a history of important delivery events and status changes.

- Authentication: Secure business authentication powered by Supabase Auth.

- Row-Level Security: Supabase RLS ensures businesses can only access their own delivery data.

- Free & Premium Workflow: Manual tracking-link sharing for free users and automated WhatsApp workflows for premium users.

## 🛠 Built With

- [Next.js](https://nextjs.org) - Full-stack React framework

- [TypeScript](https://www.typescriptlang.org) - Type safety

- [Tailwind CSS](https://tailwindcss.com) - Styling and responsive UI

- [Supabase](https://supabase.com) - PostgreSQL, authentication, RLS, and Realtime

- [Twilio](https://www.twilio.com) - WhatsApp messaging and notifications

- [Vercel](https://vercel.com) - Deployment and hosting



### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase project
- A Twilio account if you want to test WhatsApp notifications

### Installation

1. Clone the repository:

   `bash
   git clone https://github.com/EmmaKespo/dropflow.git

2. Navigate into the directory:

   `bash
 3.  cd dropflow

4. Install dependencies

npm install

5. Create a .env.local file in the root directory

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=your_twilio_whatsapp_number

Never expose your Twilio Auth Token or Supabase service-role key in client-side code.

 6. To launch the local development server

npm run dev

Open your browser and visit:
http://localhost:3000  

 # Basic Workflow

Create Delivery
      ↓
Generate Tracking Link
      ↓
Send Link to Rider
      ↓
Rider Opens Tracking Page
      ↓
Picked Up
      ↓
Arrived
      ↓
Customer Notification
      ↓
Delivered
      ↓
Admin Dashboard Updates  

 Security
DropFlow uses Supabase Row-Level Security (RLS) to protect business data.  

Businesses can:
View and update their own profiles
View their own deliveries
Create their own deliveries
Update their own deliveries
View activity logs belonging to their deliveries
View notifications belonging to their deliveries
Rider actions are handled through secure server-side logic instead of giving anonymous users unrestricted database access.  

# Database
DropFlow currently uses four main tables:

profiles
    │
    └── deliveries
            │
            ├── activity_logs
            │
            └── notifications

Main Tables
profiles — Business and account information
deliveries — Customer, rider, status, and tracking information
activity_logs — Delivery status history
notifications — WhatsApp and notification records  

# Contributing
Contributions are what make the open-source community an amazing place to learn, inspire, and create.  

Fork the Project  

Create your Feature Branch:
git checkout -b feature/AmazingFeature  

Commit your Changes:
git commit -m "Add some AmazingFeature"  

Push to the Branch:
git push origin feature/AmazingFeature  

Open a Pull Request
 License
Distributed under the MIT License. See LICENSE for more information.
✉️ Contact
Emma Kespo - kespoemma@gmail.com

