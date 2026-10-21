/**
 * Full-Stack Developer Interview Preparation Book
 * Master Curriculum Registry & Metadata
 */

const BOOK_CURRICULUM = {
  title: "Full-Stack Developer Interview Preparation Book",
  subtitle: "A comprehensive guide to JavaScript, Node.js, Express, React, Redux Toolkit, PostgreSQL, MongoDB, System Design, and Production Engineering",
  author: "Senior Full-Stack Engineering Team",
  edition: "2026 Edition",
  parts: [
    {
      id: 1,
      title: "PART I — Programming Foundations and JavaScript",
      description: "Networking fundamentals, browser engine internals, JavaScript execution mechanics, async event loops, TypeScript typing, and DOM internals.",
      chapters: [
        {
          id: 1,
          slug: "ch01-how-the-web-works.html",
          title: "Chapter 1: How the Web Works",
          description: "Client-server architecture, DNS, TCP/UDP, TLS, HTTP/HTTPS lifecycle, headers, cookies, browser rendering pipeline, and end-to-end request flows.",
          status: "complete",
          questionsCount: 16,
          tags: ["DNS", "HTTP/HTTPS", "TCP/IP", "TLS/SSL", "DOM Rendering", "Network Lifecycle"]
        },
        {
          id: 2,
          slug: "ch02-javascript-fundamentals.html",
          title: "Chapter 2: JavaScript Fundamentals",
          description: "Var/let/const, primitives vs references, type coercion, truthy/falsy, equality, scope, closures, hoisting, TDZ, destructuring, and modules.",
          status: "complete",
          questionsCount: 20,
          tags: ["Scope", "Closures", "Hoisting", "Coercion", "ES Modules", "Memory References"]
        },
        {
          id: 3,
          slug: "ch03-advanced-javascript.html",
          title: "Chapter 3: Advanced JavaScript",
          description: "Execution contexts, call stack, lexical environments, this binding, prototypes, classes, FP vs OOP, currying, debounce/throttle, and garbage collection.",
          status: "complete",
          questionsCount: 20,
          tags: ["Prototypes", "this Binding", "Call/Apply/Bind", "Currying", "Garbage Collection", "Deep Clone"]
        },
        {
          id: 4,
          slug: "ch04-asynchronous-javascript.html",
          title: "Chapter 4: Asynchronous JavaScript and the Event Loop",
          description: "Event loop, call stack, tasks vs microtasks, Promises, async/await, Promise combinators, race conditions, AbortController, and streams.",
          status: "complete",
          questionsCount: 20,
          tags: ["Event Loop", "Microtasks", "Promises", "async/await", "Concurrency", "AbortController"]
        },
        {
          id: 5,
          slug: "ch05-typescript-for-full-stack.html",
          title: "Chapter 5: TypeScript for Full-Stack Developers",
          description: "Type inference, interfaces, union/intersections, generics, utility types, discriminated unions, typing React & Express, and runtime validation.",
          status: "complete",
          questionsCount: 20,
          tags: ["Generics", "Discriminated Unions", "Type Guards", "Zod", "React Props", "Express Typing"]
        },
        {
          id: 6,
          slug: "ch06-html-css-browser-fundamentals.html",
          title: "Chapter 6: HTML, CSS, and Browser Fundamentals",
          description: "Semantic markup, forms, accessibility, box model, Flexbox/Grid, stacking contexts, event bubbling/capturing, CORS, XSS, and critical rendering path.",
          status: "complete",
          questionsCount: 20,
          tags: ["Semantic HTML", "Flexbox & Grid", "Event Delegation", "CORS", "XSS", "Web Vitals"]
        }
      ]
    },
    {
      id: 2,
      title: "PART II — Node.js and Express.js Backend Engineering",
      description: "V8 & libuv internals, non-blocking I/O, event loop phases, worker threads, clusters, Express middleware pipelines, production REST architectures, auth, and real-time systems.",
      chapters: [
        {
          id: 7,
          slug: "ch07-nodejs-fundamentals.html",
          title: "Chapter 7: Node.js Fundamentals",
          description: "V8 engine, libuv, non-blocking I/O, event loop phases, Worker Threads vs Child Processes, Cluster module, Buffers, Streams, and process lifecycle.",
          status: "complete",
          questionsCount: 20,
          tags: ["libuv", "Event Loop Phases", "Buffers", "Streams", "Worker Threads", "Cluster"]
        },
        {
          id: 8,
          slug: "ch08-nodejs-modules-and-structure.html",
          title: "Chapter 8: Node.js Modules, Package Management, and Project Structure",
          description: "npm, package.json vs package-lock.json, SemVer, CommonJS vs ESM, module resolution, monorepos, logging, and layered application structures.",
          status: "complete",
          questionsCount: 20,
          tags: ["CommonJS", "ESM", "SemVer", "Package Locks", "Application Architecture"]
        },
        {
          id: 9,
          slug: "ch09-expressjs-in-depth.html",
          title: "Chapter 9: Express.js in Depth",
          description: "Express routing, middleware mechanics, centralized error handling, async wrappers, validation, layered patterns, pagination, and health checks.",
          status: "complete",
          questionsCount: 20,
          tags: ["Middleware", "Error Handling", "Async Handlers", "Layered Architecture", "REST Design"]
        },
        {
          id: 10,
          slug: "ch10-production-rest-apis.html",
          title: "Chapter 10: Production-Quality REST APIs",
          description: "End-to-end task management API build: architecture, validation, authentication, PostgreSQL/MongoDB integration, logging, tests, and deployment.",
          status: "complete",
          questionsCount: 20,
          tags: ["Production API", "Clean Architecture", "JWT", "Validation", "Automated Testing"]
        },
        {
          id: 11,
          slug: "ch11-authentication-and-authorization.html",
          title: "Chapter 11: Authentication and Authorization",
          description: "Sessions vs JWTs, access & refresh token rotation, password hashing (bcrypt/argon2), RBAC, OAuth 2.0, secure cookies, CSRF prevention, and rate limiting.",
          status: "complete",
          questionsCount: 20,
          tags: ["JWT", "Refresh Tokens", "RBAC", "Bcrypt", "CSRF", "OAuth 2.0"]
        },
        {
          id: 12,
          slug: "ch12-nodejs-concurrency-and-performance.html",
          title: "Chapter 12: Node.js Concurrency and Performance",
          description: "Event-loop blocking diagnosis, CPU offloading, queue-based async tasks, distributed locks, memory leak profiling, connection pooling, and backpressure.",
          status: "complete",
          questionsCount: 20,
          tags: ["Profiling", "Memory Leaks", "Event Loop Blocking", "Worker Offloading", "Connection Pools"]
        },
        {
          id: 13,
          slug: "ch13-real-time-systems.html",
          title: "Chapter 13: Real-Time Systems",
          description: "WebSockets vs SSE vs Long Polling, Socket.IO architecture, rooms, authentication, horizontal scaling with Redis pub/sub, presence, and chat design.",
          status: "complete",
          questionsCount: 20,
          tags: ["WebSockets", "Server-Sent Events", "Socket.IO", "Redis Pub/Sub", "Horizontal Scaling"]
        },
        {
          id: 14,
          slug: "ch14-email-files-background-jobs.html",
          title: "Chapter 14: Email, Files, and Background Processing",
          description: "Nodemailer, BullMQ & Redis job queues, dead-letter queues, idempotent workers, multipart uploads, S3-compatible signed URLs, and stream uploads.",
          status: "complete",
          questionsCount: 20,
          tags: ["BullMQ", "Redis Queues", "Idempotency", "Nodemailer", "S3 Uploads", "Signed URLs"]
        }
      ]
    },
    {
      id: 3,
      title: "PART III — React and Redux Toolkit",
      description: "Component lifecycles, virtual DOM reconciliation, hooks in depth, state colocation, Redux Toolkit, RTK Query, performance profiling, and client-side security.",
      chapters: [
        {
          id: 15,
          slug: "ch15-react-fundamentals.html",
          title: "Chapter 15: React Fundamentals",
          description: "JSX compilation, props vs state, unidirectional data flow, reconciliation, keys, controlled inputs, and rules of hooks.",
          status: "complete",
          questionsCount: 20,
          tags: ["JSX", "Virtual DOM", "Reconciliation", "Controlled Inputs", "Lifting State"]
        },
        {
          id: 16,
          slug: "ch16-react-hooks-and-state.html",
          title: "Chapter 16: React Hooks and State Management",
          description: "useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer, custom hooks, effect cleanup, stale closures, and dependency arrays.",
          status: "complete",
          questionsCount: 20,
          tags: ["useState", "useEffect", "useCallback", "useMemo", "useRef", "Stale Closures"]
        },
        {
          id: 17,
          slug: "ch17-redux-toolkit.html",
          title: "Chapter 17: Redux Toolkit",
          description: "configureStore, createSlice, Immer mechanics, createAsyncThunk, selectors with Reselect, RTK Query caching, invalidation, and optimistic updates.",
          status: "complete",
          questionsCount: 20,
          tags: ["Redux Toolkit", "createSlice", "createAsyncThunk", "RTK Query", "Immer", "Optimistic Updates"]
        },
        {
          id: 18,
          slug: "ch18-react-architecture-and-performance.html",
          title: "Chapter 18: React Architecture and Performance",
          description: "Reusable component design, container/presenter, code-splitting (lazy/Suspense), memoization trade-offs, virtualization, error boundaries, and profiling.",
          status: "complete",
          questionsCount: 20,
          tags: ["Code Splitting", "Suspense", "React.memo", "Virtualization", "Error Boundaries"]
        },
        {
          id: 19,
          slug: "ch19-frontend-networking-and-security.html",
          title: "Chapter 19: Frontend Networking and Application Security",
          description: "Axios/Fetch interceptors, token refresh flows, request cancellation, CORS, XSS sanitization, CSP headers, and secret management.",
          status: "complete",
          questionsCount: 20,
          tags: ["Fetch/Axios Interceptors", "Token Refresh", "AbortSignal", "XSS Prevention", "CSP"]
        }
      ]
    },
    {
      id: 4,
      title: "PART IV — PostgreSQL and SQL",
      description: "Relational modeling, SQL query mechanics, ACID transactions, MVCC, locking, B-tree indexing, query plan analysis with EXPLAIN, and ORM integration.",
      chapters: [
        {
          id: 20,
          slug: "ch20-sql-fundamentals.html",
          title: "Chapter 20: SQL Fundamentals",
          description: "Relational schema design, SELECT/INSERT/UPDATE/DELETE, JOIN types, subqueries, CTEs, window functions, and SQL logical query execution order.",
          status: "complete",
          questionsCount: 20,
          tags: ["Joins", "CTEs", "Window Functions", "GROUP BY", "Query Execution Order"]
        },
        {
          id: 21,
          slug: "ch21-postgresql-data-modeling.html",
          title: "Chapter 21: PostgreSQL Data Modeling",
          description: "1NF to 3NF normalization, foreign-key cascading, unique constraints, migrations, soft deletion, audit logs, and multi-tenant modeling.",
          status: "complete",
          questionsCount: 20,
          tags: ["Normalization", "Constraints", "Cascades", "Migrations", "Multi-tenancy"]
        },
        {
          id: 22,
          slug: "ch22-postgresql-transactions-and-concurrency.html",
          title: "Chapter 22: PostgreSQL Transactions and Concurrency",
          description: "ACID properties, isolation levels (Read Committed to Serializable), MVCC, row vs table locks, deadlock detection, and optimistic vs pessimistic locking.",
          status: "complete",
          questionsCount: 20,
          tags: ["ACID", "Isolation Levels", "MVCC", "Deadlocks", "Row Locking", "Pessimistic Concurrency"]
        },
        {
          id: 23,
          slug: "ch23-sql-performance-and-indexing.html",
          title: "Chapter 23: SQL Performance and Indexing",
          description: "B-Tree, GIN, and GiST indexes, composite index column ordering, EXPLAIN ANALYZE, sequential vs index scans, N+1 query debugging, and keyset pagination.",
          status: "complete",
          questionsCount: 20,
          tags: ["B-Tree Indexes", "EXPLAIN ANALYZE", "Index Scans", "N+1 Problem", "Keyset Pagination"]
        },
        {
          id: 24,
          slug: "ch24-advanced-postgresql-and-orms.html",
          title: "Chapter 24: Advanced PostgreSQL and ORM Usage",
          description: "JSONB queries and GIN indexes, full-text search, views, materialized views, Prisma/TypeORM integration, ORM trade-offs, and raw SQL fallbacks.",
          status: "complete",
          questionsCount: 20,
          tags: ["JSONB", "Full-Text Search", "Materialized Views", "Prisma ORM", "Connection Pooling"]
        }
      ]
    },
    {
      id: 5,
      title: "PART V — MongoDB and Data Access",
      description: "Document databases, BSON, aggregation pipelines, schema modeling (embed vs reference), Mongoose production patterns, transactions, replica sets, and Postgres comparison.",
      chapters: [
        {
          id: 25,
          slug: "ch25-mongodb-fundamentals.html",
          title: "Chapter 25: MongoDB Fundamentals",
          description: "Document model, BSON, ObjectId internals, CRUD operations, update operators, aggregation pipeline ($match, $group, $lookup), and embedding vs referencing.",
          status: "complete",
          questionsCount: 20,
          tags: ["BSON", "ObjectId", "Aggregation Pipeline", "Embedding vs Referencing", "CRUD"]
        },
        {
          id: 26,
          slug: "ch26-mongodb-in-production.html",
          title: "Chapter 26: MongoDB in Production",
          description: "Mongoose schemas, validation, middleware hooks, populate vs aggregation, replica sets, write concerns, compound indexes, and sharding concepts.",
          status: "complete",
          questionsCount: 20,
          tags: ["Mongoose", "Write Concerns", "Replica Sets", "Compound Indexes", "Populate"]
        },
        {
          id: 27,
          slug: "ch27-postgresql-vs-mongodb.html",
          title: "Chapter 27: PostgreSQL vs MongoDB",
          description: "Deep architectural comparison: ACID vs eventual consistency, relational joins vs denormalization, schema evolution, query performance, and workload selection.",
          status: "complete",
          questionsCount: 20,
          tags: ["PostgreSQL vs MongoDB", "SQL vs NoSQL", "Consistency Models", "Workload Fit"]
        }
      ]
    },
    {
      id: 6,
      title: "PART VI — API Design, Security, and Software Engineering",
      description: "RESTful best practices, OWASP Top 10 defenses, Git mastery, SOLID design principles, clean architecture patterns, and automated testing strategies.",
      chapters: [
        {
          id: 28,
          slug: "ch28-api-design.html",
          title: "Chapter 28: API Design",
          description: "REST principles, HTTP idempotency, status code semantics, RFC 7807 error formats, cursor vs offset pagination, API versioning, OpenAPI, and webhooks.",
          status: "complete",
          questionsCount: 20,
          tags: ["REST Guidelines", "HTTP Idempotency", "RFC 7807", "Cursor Pagination", "Versioning"]
        },
        {
          id: 29,
          slug: "ch29-web-application-security.html",
          title: "Chapter 29: Web Application Security",
          description: "OWASP Top 10: SQL/NoSQL injection, stored/reflected XSS, CSRF, SSRF, broken access control, CORS misconfigurations, security headers, and secret management.",
          status: "complete",
          questionsCount: 20,
          tags: ["OWASP Top 10", "SQL Injection", "XSS", "CSRF", "SSRF", "Security Headers"]
        },
        {
          id: 30,
          slug: "ch30-git-github-team-development.html",
          title: "Chapter 30: Git, GitHub, and Team Development",
          description: "Git object model, merge vs rebase, interactive rebase, conflict resolution, reset vs revert vs restore, cherry-pick, conventional commits, and CI pipelines.",
          status: "complete",
          questionsCount: 20,
          tags: ["Git Internals", "Merge vs Rebase", "Conflict Resolution", "Reset vs Revert", "Git Flow"]
        },
        {
          id: 31,
          slug: "ch31-clean-code-and-design.html",
          title: "Chapter 31: Clean Code and Software Design",
          description: "SOLID principles in JS/TS, DRY, KISS, YAGNI, dependency injection, layered architecture (Controller-Service-Repository), code smells, and refactoring.",
          status: "complete",
          questionsCount: 20,
          tags: ["SOLID Principles", "Dependency Injection", "Repository Pattern", "Code Smells"]
        },
        {
          id: 32,
          slug: "ch32-testing.html",
          title: "Chapter 32: Testing",
          description: "Testing pyramid, unit vs integration vs E2E, mocks/stubs/spies with Vitest/Jest, Supertest API testing, React Testing Library, database fixture isolation, and CI.",
          status: "complete",
          questionsCount: 20,
          tags: ["Vitest/Jest", "Supertest", "React Testing Library", "Test Doubles", "CI Pipelines"]
        }
      ]
    },
    {
      id: 7,
      title: "PART VII — System Design and Distributed Systems",
      description: "Scalability patterns, Redis caching, microservices vs monoliths, messaging queues, CAP theorem, saga patterns, and practical system design interview scenarios.",
      chapters: [
        {
          id: 33,
          slug: "ch33-system-design-fundamentals.html",
          title: "Chapter 33: System Design Fundamentals",
          description: "Latency vs throughput, capacity estimations, vertical vs horizontal scaling, load balancers, reverse proxies, CDNs, database scaling, and fault tolerance.",
          status: "complete",
          questionsCount: 20,
          tags: ["Capacity Planning", "Load Balancers", "Reverse Proxies", "Horizontal Scaling", "SPOF"]
        },
        {
          id: 34,
          slug: "ch34-caching-and-redis.html",
          title: "Chapter 34: Caching and Redis",
          description: "Cache patterns (cache-aside, read/write-through), TTL, eviction policies (LRU/LFU), cache stampede, hot keys, Redis data structures, distributed locks, and rate limiters.",
          status: "complete",
          questionsCount: 20,
          tags: ["Cache-Aside", "Redis Structures", "Cache Stampede", "Distributed Locks", "Rate Limiting"]
        },
        {
          id: 35,
          slug: "ch35-distributed-systems-basics.html",
          title: "Chapter 35: Distributed Systems Basics",
          description: "Monolith vs microservices, message queues (Kafka, RabbitMQ, BullMQ), delivery guarantees, idempotency, CAP theorem, Saga pattern, and transactional outbox.",
          status: "complete",
          questionsCount: 20,
          tags: ["Microservices", "Delivery Guarantees", "CAP Theorem", "Saga Pattern", "Outbox Pattern"]
        },
        {
          id: 36,
          slug: "ch36-practical-system-design-scenarios.html",
          title: "Chapter 36: Practical System Design Scenarios",
          description: "Complete design blueprints: URL shortener, real-time chat, email scheduler, notification engine, rate limiter, file sharing service, and e-commerce backend.",
          status: "complete",
          questionsCount: 20,
          tags: ["System Design Walkthroughs", "URL Shortener", "Chat App", "Rate Limiter", "Notification Service"]
        }
      ]
    },
    {
      id: 8,
      title: "PART VIII — DevOps, Deployment, and Production Readiness",
      description: "Linux CLI mastery, Docker containers, multi-stage builds, Docker Compose, GitHub Actions CI/CD pipelines, structured logging, distributed tracing, and reliability.",
      chapters: [
        {
          id: 37,
          slug: "ch37-linux-and-cli-essentials.html",
          title: "Chapter 37: Linux and Command-Line Essentials",
          description: "File permissions, process management (ps, top, kill), environment variables, pipes and redirection, curl, netstat, SSH, disk inspection, and production troubleshooting.",
          status: "complete",
          questionsCount: 20,
          tags: ["Linux Commands", "Permissions", "Pipes", "Process Management", "Networking CLI"]
        },
        {
          id: 38,
          slug: "ch38-docker-and-containers.html",
          title: "Chapter 38: Docker and Containers",
          description: "VMs vs containers, Dockerfile instructions, layer caching, multi-stage builds for Node.js & React, Docker Compose, volumes, networking, and debugging containers.",
          status: "complete",
          questionsCount: 20,
          tags: ["Docker", "Multi-stage Builds", "Docker Compose", "Container Networking", "Volumes"]
        },
        {
          id: 39,
          slug: "ch39-cicd-and-deployment.html",
          title: "Chapter 39: CI/CD and Deployment",
          description: "GitHub Actions workflows, build & test automation, secrets management, deployment strategies (blue-green, rolling, canary), database migrations in CI/CD, and GitHub Pages.",
          status: "complete",
          questionsCount: 20,
          tags: ["CI/CD", "GitHub Actions", "Deployment Strategies", "Database Migrations", "GitHub Pages"]
        },
        {
          id: 40,
          slug: "ch40-observability-and-reliability.html",
          title: "Chapter 40: Observability and Reliability",
          description: "Structured logging (Pino/Winston), correlation IDs, metrics (Prometheus), distributed tracing (OpenTelemetry), SLI/SLO/SLA, alerting, graceful shutdown, and post-mortems.",
          status: "complete",
          questionsCount: 20,
          tags: ["Observability", "Structured Logging", "Correlation IDs", "SLO/SLI", "Graceful Shutdown"]
        }
      ]
    },
    {
      id: 9,
      title: "PART IX — Advanced and Frequently Overlooked Topics",
      description: "Modern Next.js & Server Components, Core Web Vitals optimization, web accessibility, capacity calculations, engineering math, and behavioral interview mastery.",
      chapters: [
        {
          id: 41,
          slug: "ch41-modern-react-and-nextjs.html",
          title: "Chapter 41: Modern React and Next.js",
          description: "SSR vs SSG vs ISR, React Server Components (RSC) vs Client Components, Next.js App Router, Server Actions, streaming with Suspense, hydration errors, and security.",
          status: "complete",
          questionsCount: 20,
          tags: ["Next.js App Router", "Server Components", "SSR/SSG", "Streaming", "Hydration Errors"]
        },
        {
          id: 42,
          slug: "ch42-web-performance.html",
          title: "Chapter 42: Web Performance",
          description: "Core Web Vitals (LCP, INP, CLS), bundle analysis, tree shaking, image compression, HTTP caching headers (Cache-Control, ETag), and Chrome DevTools profiling.",
          status: "complete",
          questionsCount: 20,
          tags: ["Core Web Vitals", "LCP/INP/CLS", "Bundle Optimization", "HTTP Caching", "DevTools Profiling"]
        },
        {
          id: 43,
          slug: "ch43-accessibility-and-product-quality.html",
          title: "Chapter 43: Accessibility and Product Quality",
          description: "WCAG principles, ARIA roles, keyboard navigation, focus management, screen reader compatibility, accessible forms, color contrast, and i18n.",
          status: "complete",
          questionsCount: 20,
          tags: ["Accessibility", "WCAG", "ARIA", "Keyboard Navigation", "Focus Traps"]
        },
        {
          id: 44,
          slug: "ch44-engineering-math-and-networking.html",
          title: "Chapter 44: Engineering Mathematics and Networking",
          description: "Binary/hex, byte calculations, latency vs bandwidth, serialization overhead, Little's Law, latency percentiles (P50, P95, P99), and back-of-the-envelope estimations.",
          status: "complete",
          questionsCount: 20,
          tags: ["Engineering Math", "Little's Law", "Percentiles P95/P99", "Capacity Estimation", "Bandwidth vs Latency"]
        },
        {
          id: 45,
          slug: "ch45-engineering-judgment-and-behavioral.html",
          title: "Chapter 45: Engineering Judgment and Behavioral Interviews",
          description: "STAR method interview responses, explaining architecture trade-offs, debugging stories, incident management, resolving technical disagreements, and questions to ask.",
          status: "complete",
          questionsCount: 20,
          tags: ["STAR Method", "Behavioral Interview", "Architecture Explanations", "Engineering Judgment", "Reverse Interviewing"]
        }
      ]
    }
  ]
};

// Flattened chapter list for quick lookups and prev/next navigation
const ALL_CHAPTERS = BOOK_CURRICULUM.parts.flatMap(p => p.chapters.map(c => ({
  ...c,
  partId: p.id,
  partTitle: p.title
})));

/**
 * Helper to get chapter by ID or Slug
 */
function getChapterById(id) {
  return ALL_CHAPTERS.find(c => c.id === Number(id));
}

function getChapterBySlug(slug) {
  const clean = slug.split('/').pop().split('#')[0];
  return ALL_CHAPTERS.find(c => c.slug === clean);
}

function getAdjacentChapters(currentId) {
  const index = ALL_CHAPTERS.findIndex(c => c.id === Number(currentId));
  return {
    prev: index > 0 ? ALL_CHAPTERS[index - 1] : null,
    next: index < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[index + 1] : null
  };
}

// Export for Node environments (testing) or make available in window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOOK_CURRICULUM, ALL_CHAPTERS, getChapterById, getChapterBySlug, getAdjacentChapters };
} else {
  window.BOOK_CURRICULUM = BOOK_CURRICULUM;
  window.ALL_CHAPTERS = ALL_CHAPTERS;
  window.getChapterById = getChapterById;
  window.getChapterBySlug = getChapterBySlug;
  window.getAdjacentChapters = getAdjacentChapters;
}

