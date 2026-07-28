//main/marketing page
app/
├── layout.tsx               
├── globals.css              
└── (marketing)/
    ├── HeroAndForm.tsx
    ├── MarketingDetails.tsx
    └── page.tsx  
    |__ layout.tsx             

// riders 
app/(riders)/track/[token]/
├── components/
│   ├── DeliveryInfoCard.tsx
│   ├── DeliveryNotesCard.tsx
│   ├── ProgressTrackBar.tsx
│   └── ContactCustomerPanel.tsx
├── layout.tsx
└── page.tsx

//admin dashboard
app/
└── (admin)/
    ├── components/
    │   ├── AdminSidebar.tsx         <-- Navigation & layout menu panel
    │   ├── FleetSummaryGrid.tsx     <-- Live statistic counter blocks
    │   ├── RealTimeAlertsPanel.tsx  <-- Real-time notification banners
    │   ├── DeliveriesTable.tsx      <-- Tabular data view grid for desktop/mobile
    │   ├── CreateDeliveryModal.tsx  <-- New manifest intake form wrapper
    │   └── DeliveryDetailModal.tsx  <-- Single row analytical drilldown window
    ├── layout.tsx                   <-- Secure workspace structural shell container
    └── dashboard/
        └── page.tsx                 <-- Ultra-clean state orchestration controller

// reusable form / component  
components/
└── shared-form/
    ├── InputFields.tsx     <-- Handles purely the 4 input fields & styling
    ├── SuccessScreen.tsx   <-- Handles clipboard copy & WhatsApp deep links
    └── index.tsx           <-- Core state orchestrator & validation runner


// authentication  
app/
├── (auth)/                    <-- Consolidated Authentication Route Group
│   ├── layout.tsx             <-- Centered, focused auth styling wrapper shell
│   │
│   ├── login/
│   │   ├── page.tsx           <-- Login Orchestrator Screen Container
│   │   └── components/
│   │       └── LoginForm.tsx  <-- Handles strict email/password intakes & actions
│   │
│   ├── signup/
│   │   ├── page.tsx           <-- Signup Orchestrator Screen Container
│   │   └── components/
│   │       └── SignupForm.tsx <-- Handles profile metadata intake (Business Name, etc.)
│   │
│   ├── forgot-password/
│   │   ├── page.tsx           <-- Recovery Initiation Page Layout
│   │   └── components/
│   │       └── RecoveryForm.tsx <-- Pure email extraction submission terminal
│   │
│   └── reset-password/
│       ├── page.tsx           <-- Password Override Page Layout
│       └── components/
│           └── ResetForm.tsx  <-- Double-entry validation password reset fields
│
└── middleware.ts              <-- Root Layer (Intercepts unauthenticated /admin/* access)
🧱 Phase 1: Shared Core Layout & Edge SecurityFolder 
1: Root Configuration Layer middleware.ts (The global guard redirecting unauthenticated users away from /admin/*)Folder 
2: Global Auth Group Layout Containerapp/(auth)/layout.tsx (The centered, minimal black-and-white structural card shell wrapping all login/signup pages)

🚪 Phase 2: Core Business Entry PointsFolder 
3: The Business Login Terminalapp/(auth)/login/components/LoginForm.tsx (Pure input execution panel)app/(auth)/login/page.tsx (Master Orchestrator)Folder
 4: The Fleet Registration Terminalapp/(auth)/signup/components/SignupForm.tsx (Captures email, business name, and profiles variables)app/(auth)/signup/page.tsx (Master Orchestrator)
 
 🔒 Phase 3: Password Safety OperationsFolder 
 5: Forgot Password Recovery Hubapp/(auth)/forgot-password/components/RecoveryForm.tsx (Intakes recovery emails securely)app/(auth)/forgot-password/page.tsx (Master Orchestrator)Folder 
 6: Reset Password Enforcement Hubapp/(auth)/reset-password/components/ResetForm.tsx (Double-entry password verification inputs)app/(auth)/reset-password/page.tsx (Master Orchestrator)
