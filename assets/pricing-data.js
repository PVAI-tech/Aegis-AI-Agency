/* Single source of truth for Productised AI pricing. Every card, the
   comparison table, and the FAQ render from this object — no plan
   numbers are hand-duplicated elsewhere. See docs/PRICING_POLICY.md
   for the reasoning behind these numbers and docs/PRICING_PAGE_AUDIT.md
   for what this replaced. */
window.PRICING_DATA = {
  usage: {
    unit: "conversations",
    definition: "A conversation is one customer chat session lasting up to 24 hours and containing up to 20 user messages.",
    // TODO(usage-metering): this definition is provisional. The Jarvis
    // widget currently runs entirely client-side with no backend and no
    // usage logging (see docs/Database.md, docs/Agents.md) — there is no
    // system in place yet to actually count conversations against this
    // definition for a real subscriber. Do not bill against these limits
    // until metering is built and this TODO is removed. See
    // docs/UsageMetering.md for the full architecture this needs.
    provisional: true
  },
  knowledgeSourceNote: "An approved knowledge source may be one webpage, one FAQ document, one PDF, or one approved product/service information file. File-size and content-volume limits apply — a 500-page document requires technical review before being counted as a single source.",
  vatNote: "Prices exclude VAT where applicable.",
  minimumTerm: "Plans begin with a three-month minimum service term following launch, then continue monthly unless otherwise agreed. Full terms are set out in the signed service agreement.",
  billing: {
    startsWhen: "Monthly billing starts on the launch date, billed in advance.",
    cancellation: "Cancellation takes effect at the end of the current billing period. Outstanding invoices remain payable.",
    setupRefund: "Once implementation work begins, the one-time setup fee is non-refundable.",
    dataExport: "A data export is available on request at the end of an engagement.",
    subjectToAgreement: true
  },
  overagePolicy: {
    alerts: [70, 90, 100],
    description: "Overages are never charged unexpectedly. Clients choose either automatic top-ups, manual approval, or a usage pause at their limit.",
    automaticTopUps: "planned", // not yet built — see docs/PaymentSystem.md; Stripe overage billing isn't configured, so top-ups are manual for now
    resetCycle: "Usage resets at the start of each monthly billing period. Unused allowance does not roll over."
  },
  plans: [
    {
      id: "starter",
      name: "Starter AI",
      tagline: "Best for small businesses handling routine website enquiries.",
      setupFee: 299,
      monthlyFee: 59,
      conversationsIncluded: 300,
      assistants: 1,
      channels: "Website chat widget",
      whatsapp: "not_included",
      knowledgeSources: 20,
      leadCapture: "Basic lead capture",
      booking: false,
      crm: false,
      analytics: "Standard usage reporting",
      optimisationReview: false,
      supportWindow: "Response within 2 UK business days",
      overageRate: 15,
      implementationEstimate: "Approximately 5–7 UK business days",
      featured: false,
      ctaLabel: "Start with Starter",
      features: [
        "One branded AI assistant",
        "Website chat widget",
        "Up to 20 approved knowledge sources",
        "Basic lead capture",
        "Standard usage reporting",
        "Secure managed hosting & routine monitoring",
        "Support response within 2 UK business days"
      ]
    },
    {
      id: "professional",
      name: "Professional AI",
      tagline: "Best for growing businesses receiving regular enquiries.",
      setupFee: 599,
      monthlyFee: 119,
      conversationsIncluded: 1500,
      assistants: 1,
      channels: "Website + WhatsApp (add-on)",
      whatsapp: "addon",
      knowledgeSources: 100,
      leadCapture: "Lead capture + email notifications",
      booking: "Appointment / enquiry routing",
      crm: false,
      analytics: "Usage dashboard",
      optimisationReview: "Quarterly optimisation review",
      supportWindow: "Response within 1 UK business day",
      overageRate: 12,
      implementationEstimate: "Approximately 1–2 weeks",
      featured: true,
      ctaLabel: "Choose Professional",
      features: [
        "One branded AI assistant",
        "Website integration",
        "WhatsApp integration available as an add-on*",
        "Up to 100 approved knowledge sources",
        "Lead capture + email notifications",
        "Appointment / enquiry routing",
        "Response within 1 UK business day"
      ],
      featureFootnote: "*Third-party messaging fees may apply. WhatsApp integration is available as an add-on, subject to technical scoping."
    },
    {
      id: "business",
      name: "Business AI",
      tagline: "Best for businesses requiring multiple workflows or departments.",
      setupFee: 1199,
      monthlyFee: 249,
      conversationsIncluded: 5000,
      assistants: 2,
      channels: "Website + WhatsApp (add-on) + booking",
      whatsapp: "addon",
      knowledgeSources: null,
      knowledgeSourcesLabel: "Extended knowledge sources (scoped)",
      leadCapture: "Advanced lead qualification",
      booking: "Booking integration",
      crm: "One standard CRM integration",
      analytics: "Analytics & conversation insights",
      optimisationReview: "Monthly optimisation review",
      supportWindow: "Priority response during UK business hours",
      overageRate: 10,
      implementationEstimate: "Approximately 2–4 weeks",
      featured: false,
      ctaLabel: "Discuss Business AI",
      features: [
        "Up to two branded AI assistants",
        "Website + WhatsApp (add-on) + booking integration",
        "One standard CRM integration†",
        "Advanced lead qualification",
        "Analytics & conversation insights",
        "Monthly optimisation review",
        "Priority response during UK business hours",
        "Custom escalation & human-handover rules"
      ],
      featureFootnote: "†Complex or non-standard CRM work requires separate scoping."
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "Multiple assistants, brands or locations with bespoke requirements.",
      setupFee: null,
      monthlyFee: null,
      customPricing: true,
      conversationsIncluded: null,
      assistants: "Multiple",
      channels: "All channels + voice (optional, subject to scoping)",
      whatsapp: "included_scoped",
      knowledgeSources: null,
      knowledgeSourcesLabel: "Tailored allowance",
      leadCapture: "Advanced, tailored",
      booking: "Included",
      crm: "Bespoke integrations",
      analytics: "Custom reporting",
      optimisationReview: "Agreed service levels",
      supportWindow: "Dedicated account management",
      overageRate: null,
      overageLabel: "Agreed allowance and overage terms",
      implementationEstimate: "Timeline agreed after discovery",
      featured: false,
      ctaLabel: "Book an Enterprise Call",
      features: [
        "Multiple assistants, brands or locations",
        "Tailored usage allowance",
        "Bespoke integrations",
        "Voice & omnichannel options (optional, subject to scoping)",
        "Advanced permissions",
        "Dedicated account management",
        "Custom reporting",
        "Security & deployment review",
        "Agreed service levels",
        "Staff onboarding & training"
      ]
    }
  ],
  addOns: [
    { name: "Additional AI assistant", price: "from £49/mo" },
    { name: "Additional 500 conversations", price: "from £50" },
    { name: "Extra standard integration", price: "from £199 setup" },
    { name: "Additional language", price: "from £99 setup" },
    { name: "Extra website, location or brand", price: "from £49/mo" },
    { name: "Monthly performance report", price: "from £49/mo" },
    { name: "Voice AI", price: "custom quotation" },
    { name: "Custom dashboard", price: "from £499 setup" },
    { name: "Priority optimisation session", price: "from £99" }
  ],
  exclusions: [
    "Fully bespoke application development",
    "Complex CRM migration",
    "Mobile app development",
    "Unlimited revisions",
    "Unlimited AI usage",
    "Paid third-party subscriptions",
    "Advertising spend",
    "Large-scale data cleaning",
    "Regulated medical, legal or financial decision-making",
    "Advanced multilingual training",
    "Custom voice systems",
    "Complex workflow engineering"
  ],
  clientResponsibilities: [
    "Accurate business information",
    "Approved content",
    "Brand assets",
    "System access where required",
    "Privacy and escalation instructions",
    "A named contact for decisions and approvals"
  ]
};
