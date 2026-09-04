export type ProjectChallenge = {
  code: string;
  title: string;
  technology: string;
  description: string;
  diagram: string[];
};

export type Project = {
  slug: string;
  title: string;
  fileName: string;
  filePath: string;
  status: "placeholder" | "draft" | "published";
  summary: string;
  tags: string[];
  metadata: {
    type: string;
    focus: string;
    year: string;
  };
  overview: {
    statement: string;
    body: string;
  };
  problem: {
    question: string;
    body: string;
    workflow: string[];
  };
  architecture: {
    caption: string;
    nodes: string[];
    annotations: string[];
  };
  challenges: ProjectChallenge[];
  failureHandling: {
    question: string;
    steps: string[];
    outcomes: Array<{ state: string; action: string }>;
  };
  techStack: Array<{ category: string; items: string[] }>;
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "e-commerce",
    title: "E-Commerce Platform",
    fileName: "e-commerce.project",
    filePath: "C:\\HEWEN\\PROJECTS\\E-COMMERCE",
    status: "published",
    summary: "A distributed order-to-payment platform designed around reliable transactions and event-driven services.",
    tags: ["Java", "Spring Cloud", "Redis", "RocketMQ", "Elasticsearch"],
    metadata: { type: "Distributed System", focus: "Backend / Microservices", year: "2025" },
    overview: {
      statement: "One transaction, many independently operating services.",
      body: "The platform follows an order from cart validation and inventory reservation through payment and downstream fulfillment. Each service owns its data while events coordinate the end-to-end workflow without turning the entire system into one synchronous transaction."
    },
    problem: {
      question: "How do order, payment, inventory, and cart services remain consistent across asynchronous operations and failures?",
      body: "A successful local write does not guarantee a successful business transaction. The design treats uncertainty, retries, duplicate delivery, and delayed payment confirmation as normal operating conditions.",
      workflow: ["ORDER", "PAYMENT", "EVENT", "INVENTORY + CART"]
    },
    architecture: {
      caption: "ORDER-TO-PAYMENT SERVICE TOPOLOGY / REV. 01",
      nodes: ["API Gateway", "Order / Trade", "Payment", "Inventory", "Cart", "Redis", "RocketMQ", "MySQL", "Elasticsearch"],
      annotations: ["Synchronous commands at the edge", "Transactional events between domains", "Search and cache are rebuilt from durable state"]
    },
    challenges: [
      { code: "A", title: "Atomic Inventory Reservation", technology: "Redis + Lua", description: "Reserve and validate stock in one atomic operation to prevent overselling during concurrent order placement.", diagram: ["CHECK", "RESERVE", "CONFIRM"] },
      { code: "B", title: "Transactional Messaging", technology: "RocketMQ transactional messages", description: "Publish payment-success events only when the local transaction is known to be durable, then verify uncertain sends.", diagram: ["LOCAL TX", "HALF MSG", "COMMIT"] },
      { code: "C", title: "Idempotent Consumption", technology: "Order ID + event type", description: "Deduplicate every consumer operation so retries and at-least-once delivery cannot apply a business change twice.", diagram: ["EVENT", "DEDUP KEY", "APPLY ONCE"] },
      { code: "D", title: "Timeout & Compensation", technology: "Scheduled verification", description: "Confirm the remote payment state before cancelling an unpaid order and releasing its reserved inventory.", diagram: ["TIMEOUT", "VERIFY", "COMPENSATE"] }
    ],
    failureHandling: {
      question: "What happens when payment state is uncertain?",
      steps: ["Order created", "Payment initiated", "State uncertain", "Timeout", "Compensation record", "Scheduled verification"],
      outcomes: [{ state: "PAID", action: "Reconcile order" }, { state: "UNPAID", action: "Cancel order + restore stock" }]
    },
    techStack: [
      { category: "Language", items: ["Java"] },
      { category: "Framework", items: ["Spring Cloud"] },
      { category: "Data", items: ["MySQL", "Redis", "Elasticsearch"] },
      { category: "Messaging", items: ["RocketMQ"] }
    ]
  },
  {
    slug: "education",
    title: "Education Platform",
    fileName: "education-platform.project",
    filePath: "C:\\HEWEN\\PROJECTS\\EDUCATION",
    status: "draft",
    summary: "A microservices learning platform connecting coursework, progress tracking, and collaborative learning.",
    tags: ["React", "Java", "Spring Boot", "PostgreSQL"],
    metadata: { type: "Microservices Platform", focus: "Learning Systems", year: "2025" },
    overview: { statement: "Learning activity becomes a continuous, observable workflow.", body: "The platform connects course delivery, assessment, progress, and collaboration while preserving clear ownership between learner, content, and reporting services." },
    problem: { question: "How can progress remain accurate when learning events arrive from many activities and devices?", body: "Completion, scores, and rankings must converge even when events are delayed or repeated.", workflow: ["COURSE", "ACTIVITY", "PROGRESS", "LEADERBOARD"] },
    architecture: { caption: "LEARNING PLATFORM SERVICE MAP / REV. 01", nodes: ["Web Client", "API Gateway", "Course Service", "Progress Service", "Assessment", "Identity", "PostgreSQL", "Event Bus", "Leaderboard"], annotations: ["Role-aware access at the gateway", "Activity events update progress", "Read models support reporting"] },
    challenges: [
      { code: "A", title: "Progress Aggregation", technology: "Event-driven updates", description: "Combine lesson, quiz, and assignment activity into one stable learner progress model.", diagram: ["ACTIVITY", "AGGREGATE", "PROGRESS"] },
      { code: "B", title: "Role Boundaries", technology: "Policy-based access", description: "Keep learner, instructor, and administrator operations explicit across service boundaries.", diagram: ["IDENTITY", "POLICY", "RESOURCE"] },
      { code: "C", title: "Leaderboard Consistency", technology: "Ranked read model", description: "Update rankings efficiently without coupling score writes to every leaderboard query.", diagram: ["SCORE", "PROJECT", "RANK"] }
    ],
    failureHandling: { question: "What happens when an activity event arrives twice?", steps: ["Activity submitted", "Event delivered", "Identity checked", "Deduplication", "Progress recalculated"], outcomes: [{ state: "NEW", action: "Apply progress update" }, { state: "DUPLICATE", action: "Acknowledge without mutation" }] },
    techStack: [{ category: "Frontend", items: ["React"] }, { category: "Backend", items: ["Java", "Spring Boot"] }, { category: "Data", items: ["PostgreSQL"] }, { category: "Pattern", items: ["Microservices", "Event-driven"] }]
  },
  {
    slug: "ai-music-agent",
    title: "AI Music Agent",
    fileName: "ai-music-agent.project",
    filePath: "C:\\HEWEN\\PROJECTS\\AI-MUSIC-AGENT",
    status: "draft",
    summary: "A human-in-the-loop agent workflow for turning creative direction into iterative music exploration.",
    tags: ["Python", "LLMs", "Audio APIs", "Vector Search"],
    metadata: { type: "AI Agent", focus: "Generative Music Workflow", year: "2025" },
    overview: { statement: "Creative direction remains human; orchestration becomes programmable.", body: "The agent converts a musical brief into structured actions, retrieves relevant context, coordinates audio tools, and returns iterations that a person can accept, reject, or refine." },
    problem: { question: "How can an agent explore creative options without taking control away from the musician?", body: "The workflow needs memory and tool autonomy, but every meaningful creative decision must remain inspectable and reversible.", workflow: ["BRIEF", "PLAN", "TOOLS", "HUMAN REVIEW"] },
    architecture: { caption: "AGENT + AUDIO TOOLCHAIN / REV. 01", nodes: ["Creative Brief", "Agent Planner", "Context Store", "Prompt Builder", "Audio API", "Track Analysis", "Vector Search", "Session Memory", "Review UI"], annotations: ["Plans are visible before execution", "Tool outputs return to session memory", "Human feedback controls the next pass"] },
    challenges: [
      { code: "A", title: "Context Selection", technology: "Vector retrieval", description: "Retrieve only the musical references and session history relevant to the current creative decision.", diagram: ["QUERY", "RETRIEVE", "CONTEXT"] },
      { code: "B", title: "Tool Orchestration", technology: "Typed agent actions", description: "Keep model reasoning separate from deterministic audio operations and their validation.", diagram: ["PLAN", "TOOL", "RESULT"] },
      { code: "C", title: "Human Review Loop", technology: "Checkpointed sessions", description: "Preserve versions so the musician can compare, revert, and direct the next iteration.", diagram: ["GENERATE", "REVIEW", "REFINE"] }
    ],
    failureHandling: { question: "What happens when a tool result is invalid or musically unusable?", steps: ["Action planned", "Tool invoked", "Output validated", "Failure recorded", "Plan revised"], outcomes: [{ state: "VALID", action: "Present for human review" }, { state: "INVALID", action: "Retry or choose another tool" }] },
    techStack: [{ category: "Language", items: ["Python"] }, { category: "Intelligence", items: ["LLMs", "Vector Search"] }, { category: "Audio", items: ["Audio APIs"] }, { category: "Pattern", items: ["Agent orchestration", "Human in the loop"] }]
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
