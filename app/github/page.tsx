export default function Github() {
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">GitHub Repository</h1>
        <p className="page-subtitle">Source code and OAuth implementation details</p>
      </div>

      <div className="card">
        <h2 className="card-title">Repository Information</h2>
        <p className="card-content">
          This project is open source and available on GitHub. The repository contains the complete 
          implementation of OAuth-secured Person CRUD application with NextAuth v5 and Google OAuth.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <a 
            href="https://github.com/barbiefortes04-jpg/person-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: "inline-block", textDecoration: "none" }}
          >
            View Repository on GitHub
          </a>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Project Structure</h2>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px",
          overflow: "auto"
        }}>
{`person-app/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth route handler
│   │   ├── persons/               # Person CRUD API
│   │   └── mcp/                   # MCP server endpoint
│   ├── person/                    # Person CRUD page
│   ├── about/                     # About page
│   ├── auth-setup/                # OAuth setup guide
│   ├── security/                  # Security documentation
│   ├── github/                    # GitHub info page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── providers.tsx              # Session provider
├── components/
│   ├── Navigation.tsx             # Navigation bar
│   └── AuthButtons.tsx            # Auth buttons
├── lib/
│   ├── auth.ts                    # Auth configuration
│   └── prisma.ts                  # Prisma client
├── prisma/
│   └── schema.prisma              # Database schema
└── types.ts                       # TypeScript types`}
        </pre>
      </div>

      <div className="card">
        <h2 className="card-title">Key Features Implemented</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li>✅ Auth.js (NextAuth v5) with Google OAuth provider</li>
          <li>✅ Protected routes requiring authentication</li>
          <li>✅ JWT session management</li>
          <li>✅ Full CRUD operations for Person entities</li>
          <li>✅ OAuth-secured API endpoints</li>
          <li>✅ MCP server with authentication</li>
          <li>✅ Modern dark theme UI</li>
          <li>✅ Responsive design</li>
          <li>✅ TypeScript implementation</li>
          <li>✅ Prisma ORM integration</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Technologies Used</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>Framework:</strong> Next.js 14 (App Router)</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>Authentication:</strong> Auth.js (NextAuth v5)</li>
          <li><strong>OAuth Provider:</strong> Google OAuth 2.0</li>
          <li><strong>Database:</strong> PostgreSQL with Prisma ORM</li>
          <li><strong>Styling:</strong> Custom CSS with dark theme</li>
          <li><strong>Deployment:</strong> Vercel</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">OAuth Implementation Highlights</h2>
        <p className="card-content">
          The repository demonstrates professional OAuth implementation:
        </p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
          <li>Centralized auth configuration in <code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>lib/auth.ts</code></li>
          <li>Server-side session validation on protected routes</li>
          <li>Client-side session management with SessionProvider</li>
          <li>Secure API endpoints with authentication middleware</li>
          <li>Proper error handling and redirects</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Setup Instructions</h2>
        <p className="card-content">
          To run this project locally:
        </p>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginTop: "1rem"
        }}>
{`# Clone the repository
git clone https://github.com/barbiefortes04-jpg/person-app.git

# Install dependencies
cd person-app
npm install

# Set up environment variables
# Create .env file with required variables

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev`}
        </pre>
      </div>

      <div className="card">
        <h2 className="card-title">License & Contribution</h2>
        <p className="card-content">
          This project is created for educational purposes demonstrating OAuth implementation 
          with Next.js and NextAuth v5.
        </p>
        <p className="card-content" style={{ marginTop: "1rem" }}>
          Feel free to explore the code, learn from the implementation, and use it as a reference 
          for your own projects.
        </p>
      </div>
    </main>
  );
}
