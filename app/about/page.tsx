export default function About() {
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">About Authentication Architecture</h1>
        <p className="page-subtitle">Understanding the OAuth implementation and security features</p>
      </div>

      <div className="card">
        <h2 className="card-title">Architecture Overview</h2>
        <p className="card-content">
          This application demonstrates enterprise-grade authentication using Auth.js (NextAuth v5) 
          with Google OAuth provider integration. The architecture follows modern best practices for 
          secure web applications.
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">Authentication Flow</h2>
        <p className="card-content">
          The authentication system uses OAuth 2.0 protocol with Google as the identity provider:
        </p>
        <ul style={{ marginTop: "1rem", marginLeft: "1.5rem" }}>
          <li>User initiates login through Google OAuth</li>
          <li>Google authenticates and returns authorization code</li>
          <li>NextAuth exchanges code for access token</li>
          <li>JWT session token is created and stored</li>
          <li>Session persists across page refreshes</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Security Features</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li>Protected routes requiring authentication</li>
          <li>JWT-based session management</li>
          <li>Secure token storage and validation</li>
          <li>CSRF protection built-in</li>
          <li>OAuth-secured API endpoints</li>
          <li>MCP server with authentication requirements</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Technical Stack</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>Framework:</strong> Next.js 14 with App Router</li>
          <li><strong>Authentication:</strong> Auth.js (NextAuth v5)</li>
          <li><strong>OAuth Provider:</strong> Google OAuth 2.0</li>
          <li><strong>Session Strategy:</strong> JWT (JSON Web Tokens)</li>
          <li><strong>Database:</strong> Prisma with PostgreSQL</li>
          <li><strong>Deployment:</strong> Vercel</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Key Components</h2>
        <p className="card-content">
          <strong>Authentication Layer:</strong> Centralized auth configuration in <code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>lib/auth.ts</code> 
          {" "}ensures consistent authentication across all routes.
        </p>
        <p className="card-content" style={{ marginTop: "1rem" }}>
          <strong>Protected Routes:</strong> Server-side session validation prevents unauthorized access 
          to Person CRUD operations and MCP server endpoints.
        </p>
        <p className="card-content" style={{ marginTop: "1rem" }}>
          <strong>Session Management:</strong> Client-side SessionProvider maintains authentication state 
          and enables seamless user experience.
        </p>
      </div>
    </main>
  );
}
