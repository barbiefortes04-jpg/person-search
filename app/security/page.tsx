export default function Security() {
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">Security Features</h1>
        <p className="page-subtitle">Enterprise-grade security implementation and protected routes</p>
      </div>

      <div className="card">
        <h2 className="card-title">Authentication & Authorization</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>OAuth 2.0:</strong> Industry-standard authentication protocol via Google</li>
          <li><strong>JWT Sessions:</strong> Stateless, secure token-based session management</li>
          <li><strong>Protected Routes:</strong> Server-side authentication checks on all sensitive endpoints</li>
          <li><strong>Automatic Redirects:</strong> Unauthenticated users redirected to login</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Route Protection</h2>
        <p className="card-content">
          The following routes require authentication:
        </p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>/person</code> - Person CRUD operations page</li>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>/api/persons</code> - GET all persons</li>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>/api/persons</code> - POST create person</li>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>/api/persons/[id]</code> - GET, PUT, DELETE person</li>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>/api/mcp</code> - MCP server operations</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Session Management</h2>
        <p className="card-content">
          <strong>Strategy:</strong> JWT (JSON Web Tokens)
        </p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
          <li>Sessions persist across page refreshes</li>
          <li>Secure token storage in HTTP-only cookies</li>
          <li>Automatic token refresh on expiration</li>
          <li>Secure logout with token invalidation</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Security Best Practices</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>CSRF Protection:</strong> Built-in Cross-Site Request Forgery protection</li>
          <li><strong>Secure Headers:</strong> Next.js security headers configured</li>
          <li><strong>Environment Variables:</strong> Sensitive credentials stored securely</li>
          <li><strong>HTTPS Only:</strong> Production deployment enforces HTTPS</li>
          <li><strong>Input Validation:</strong> Server-side validation on all API endpoints</li>
          <li><strong>Error Handling:</strong> Secure error messages without sensitive data exposure</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">API Security</h2>
        <p className="card-content">
          All API routes implement authentication middleware:
        </p>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginTop: "1rem",
          overflow: "auto"
        }}>
{`const session = await getServerSession(authOptions);

if (!session) {
  return NextResponse.json(
    { error: "Unauthorized" }, 
    { status: 401 }
  );
}`}
        </pre>
      </div>

      <div className="card">
        <h2 className="card-title">Security Compliance</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li>OAuth 2.0 compliance for authentication</li>
          <li>OWASP security guidelines followed</li>
          <li>Regular dependency updates for security patches</li>
          <li>Secure coding practices throughout codebase</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">MCP Server Security</h2>
        <p className="card-content">
          The MCP (Model Context Protocol) server endpoint requires authenticated sessions:
        </p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "1rem" }}>
          <li>All MCP operations validate user authentication</li>
          <li>Unauthorized requests return 401 status</li>
          <li>Session-based access control for MCP features</li>
        </ul>
      </div>
    </main>
  );
}
