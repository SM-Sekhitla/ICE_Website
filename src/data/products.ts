export interface Product {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
  description: string;
  features: string[];
  websiteUrl: string | null;
}

// Expanded from the supplied 2026 business profile, PDF pages 11–12.
// Existing product names, asset paths and IDs are retained; see .audit/product-profile-sources.json.
// Replace null websiteUrl values with the product website when available.
export const products: Product[] = [
  {
    id: "product-1",
    websiteUrl: null,
    title: "TAIP",
    subtitle: "Intelligent Workflow Automation & Compliance",
    image: "/brand/taip22.png",
    description:
      "TAIP is a rule-driven digital processing engine that reads, validates and routes documents and tasks according to business rules, policies and compliance requirements. It automates repetitive decision-making while preserving transparency and human oversight, helping teams manage document-intensive workflows with a clear record of every decision.",
    features: [
      "Automated validation of documents, forms and submissions",
      "Configurable business rules and compliance logic without code changes",
      "Intelligent task routing, escalation and SLA tracking",
      "Full decision logging for auditability",
      "Integration with enterprise systems through email, APIs and databases",
    ],
  },
  {
    id: "product-2",
    websiteUrl: null,
    title: "Mail Sorter",
    subtitle: "AI-Driven Ingestion, Classification & Workflow Automation",
    image: "/brand/mailsorter.jpeg",
    description:
      "Mail Sorter processes high volumes of digital mail and documents for enterprise and government environments. Using AI, machine learning and rules, it automates classification, sorting, routing and structured data extraction while supporting accuracy, availability and compliance.",
    features: [
      "Automated email and document classification using machine learning and rules",
      "Structured data extraction from emails and attachments, including PDFs",
      "Queue-based, high-throughput processing for performance and resilience",
      "Secure routing into downstream systems and workflows",
      "Full audit trails, monitoring and operational analytics",
    ],
  },
  {
    id: "product-3",
    websiteUrl: null,
    title: "SIZR",
    subtitle: "AI Document Intelligence, Pricing & Quotation Automation",
    image: "/brand/sizr.png",
    description:
      "SIZR analyses digital documents to determine their content density, complexity and production requirements. Combining computer vision with rule-based logic, it replaces manual estimation with fast, consistent and auditable quotations. It is designed for high-volume document environments where speed, accuracy and pricing transparency are critical.",
    features: [
      "Automated analysis of PDF and DOCX documents using computer vision",
      "Intelligent fill-ratio estimation to determine actual content coverage",
      "Rule-based pricing and quantity calculations aligned with business standards",
      "Near real-time quotation generation",
      "Consistent, repeatable outputs with reduced human error",
      "API-ready integration with CRM, ERP and billing systems",
      "Full auditability of estimation logic and quotation results",
    ],
  },
  {
    id: "product-5",
    websiteUrl: null,
    title: "Data Archive",
    subtitle: "Real-Time Data Archiving & Storage Optimisation",
    image: "/brand/dataarchive.png",
    description:
      "Data Archive offloads, secures and preserves operational data from transactional systems without disrupting live operations. The platform combines automated data tiering, resilient storage and rapid retrieval across cloud and on-premise environments. It is designed for industrial, enterprise and data-intensive operations where reliability, compliance and performance matter.",
    features: [
      "Automated real-time archiving from transactional databases to archive stores",
      "Intelligent hot, warm and cold data tiering for performance and cost optimisation",
      "High-speed file transfer using NFS with RDMA support",
      "Reduced database load and improved system stability",
      "Built-in monitoring, alerting and automated housekeeping",
      "Secure audit metadata retention for regulatory and compliance needs",
      "Cloud, hybrid and on-premise deployment support",
      "Scalable architecture for long-term data growth",
    ],
  },
  {
    id: "product-6",
    websiteUrl: null,
    title: "LEAF",
    subtitle: "Live Environmental Analysis Framework",
    image: "/brand/leaf logo.png",
    description:
      "LEAF brings together physical sensors, analytics and mobile interfaces for real-time environmental monitoring. It supports proactive and predictive environmental management in agricultural, industrial and infrastructure settings, providing a scalable monitoring ecosystem where reliability and sustainability are critical.",
    features: [
      "Real-time monitoring of temperature, humidity, vibration, motion and soil conditions",
      "Smart alerts with automated, rule-based responses",
      "Historical and time-series analytics for trend analysis",
      "Web and mobile dashboards with role-based access",
      "Scalable IoT architecture for cloud or on-premise deployment",
    ],
  },
  {
    id: "product-7",
    websiteUrl: null,
    title: "EAMS",
    subtitle: "LOTA — Electronic Asset Management System",
    image: "/brand/lotalogo.jpeg",
    description:
      "EAMS (LOTA — Location, Ownership and Traceability of Assets) is a modular web and mobile platform that provides real-time visibility into asset location, ownership, lifecycle status and compliance across different asset classes and geographies. Teams can manage assets throughout their lifecycle, track accountability and access operational insights from the office or in the field.",
    features: [
      "Real-time asset visibility and end-to-end lifecycle management",
      "Ownership, custodianship and accountability tracking",
      "Web access and mobile access on iOS and Android",
      "Offline functionality",
      "Asset maintenance and work-in-progress tracking",
      "Reporting with XLS and CSV exports",
      "Dashboard analytics",
    ],
  },
  {
    id: "product-8",
    websiteUrl: null,
    title: "ELMS",
    subtitle: "Electronic Lease Management & Contract Governance",
    image: "/brand/ELMS.png",
    description:
      "ELMS centralises and automates lease management across government, corporate and private property portfolios. The web-based platform provides end-to-end visibility from lease approval through renewal, escalation and compliance oversight, helping teams manage contracts, payments and key dates in one place.",
    features: [
      "Centralised digital repository for lease contracts and supporting documents",
      "Real-time lease tracking for payments, renewals, expiries and escalations",
      "Configurable approval workflows and policy compliance checks",
      "Secure role-based access with full audit trails",
      "Dashboards and KPIs for spend, risk exposure and renewal timelines",
    ],
  },
  // TAMP is named TAMPON in the supplied profile.
  {
    id: "product-tamp",
    websiteUrl: null,
    title: "TAMP",
    subtitle: "TAMPON — Digital Freight Matching & Logistics Automation",
    image: "/brand/tamp-recreated.png",
    description:
      "TAMP is a digital logistics platform that matches transport assets with cargo demand in real time. It digitises freight discovery, contracting and tracking while laying the foundation for AI-driven optimisation and sustainable logistics. Its modular, SaaS-ready design supports both independent operators and enterprise fleets.",
    features: [
      "Intelligent rule-based matching of trucks to loads",
      "Digital posting of transport assets and cargo demand",
      "Automated match recommendations with acceptance workflows",
      "Auditable digital contracting and confirmation records",
      "Simulated or real-time vehicle tracking capability",
      "Role-based dashboards for operators, clients and administrators",
      "Open API architecture for future telematics, ERP and payment integration",
      "Scalable, cloud-native design using open-source technologies",
    ],
  },
  {
    // Expanded from the supplied ŠOMA360.pdf, PDF pages 2–11.
    id: "product-soma",
    websiteUrl: "https://soma360.mycelixai.com/",
    title: "SOMA 360",
    subtitle: "Verified Cleaning & Facilities Operations",
    image: "/brand/soma360-transparent.png",
    description:
      "SOMA 360 is a centralised, web and mobile-enabled platform that gives cleaning and facilities teams real-time visibility, control and accountability across multiple sites. A site QR code connects the physical facility to attendance, task assignments, live photo evidence, supervisor inspections and corrective actions. The platform creates a traceable record of who was on site, what work was completed, when it happened and who verified it, while allowing building users to report shortages, incidents and maintenance issues directly from their location.",
    features: [
      "QR-based clock-in and clock-out with geofencing verification",
      "Task assignments with location-specific checklists and evidence requirements",
      "Live photo evidence captured at the point of work",
      "Independent supervisor inspections, approval and quality control",
      "Corrective actions and reinspection to close out failed work",
      "Hourly compliance checks and incident management",
      "Public QR reporting for shortages, defects and maintenance needs",
      "Inventory and asset management for consumables, equipment and reported faults",
      "Centralised multi-site oversight, site maps, reports and analytics",
      "Invite-based access, role-based permissions and per-site data scoping",
      "Tamper-evident audit history linking actions, people and timestamps",
    ],
  },
  {
    // Broker-focused scope from 04_Rightsure_CRM_BRS_.docx.pdf, sections 2, 5 and 8.
    id: "product-prism",
    websiteUrl: null,
    title: "PRISM",
    subtitle: "Client Onboarding, CRM & Advisory Workflows for Insurance Brokers",
    image: "/brand/prism-wordmark.png",
    description:
      "PRISM is designed for insurance brokers to manage the client journey from lead intake and onboarding through quotations, advice, acceptance and policy activation. It brings individual and business client records, organisation relationships, supporting documents and workflow status into a central CRM. Broker-led recommendations, compliance evidence and management reporting help teams coordinate follow-ups and maintain a traceable record of each client case, with brokers and insurers retaining control of advice and underwriting decisions.",
    features: [
      "Organisation and lead-source management with bulk member imports and duplicate checks",
      "Web and approved WhatsApp-channel onboarding with consent and document capture",
      "Individual and business client records, case ownership and workflow tracking",
      "Broker mandate and underwriting-completion checkpoints",
      "Tracking of insurer quotation requests and responses across email and portal channels",
      "Storage of quote PDFs and broker-prepared Benefit Illustration comparisons",
      "Advisor recommendations, client acceptance and declined-offer records",
      "Record of Advice and FICA documentation and status tracking",
      "Policy activation, payment-status, cancellation and reinstatement tracking",
      "Communication history, searchable document archives and audit trails",
      "Role-based access and management dashboards for pipeline and conversion reporting",
    ],
  },
];
