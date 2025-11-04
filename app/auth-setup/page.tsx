export default function AuthSetup() {
  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">OAuth Setup Guide</h1>
        <p className="page-subtitle">Complete guide to configuring Google OAuth authentication</p>
      </div>

      <div className="card">
        <h2 className="card-title">Prerequisites</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li>Google Cloud Platform account</li>
          <li>Node.js 18+ installed</li>
          <li>PostgreSQL database (local or cloud)</li>
          <li>Git for version control</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">1. Google OAuth Configuration</h2>
        <p className="card-content">
          <strong>Step 1:</strong> Go to{" "}
          <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">
            Google Cloud Console
          </a>
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 2:</strong> Create a new project or select existing one
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 3:</strong> Enable Google+ API
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 4:</strong> Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 5:</strong> Configure OAuth consent screen
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 6:</strong> Set authorized redirect URIs:
        </p>
        <ul style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>http://localhost:3000/api/auth/callback/google</code></li>
          <li><code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>https://yourdomain.com/api/auth/callback/google</code></li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">2. Environment Variables</h2>
        <p className="card-content">
          Create a <code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>.env</code> file in the root directory:
        </p>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginTop: "1rem",
          overflow: "auto"
        }}>
{`GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/person_db`}
        </pre>
        <p className="card-content" style={{ marginTop: "1rem" }}>
          Generate <code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>NEXTAUTH_SECRET</code> using:
        </p>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginTop: "0.5rem"
        }}>
          openssl rand -base64 32
        </pre>
      </div>

      <div className="card">
        <h2 className="card-title">3. Database Setup</h2>
        <p className="card-content">
          Initialize Prisma and run migrations:
        </p>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginTop: "1rem"
        }}>
{`# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio
npx prisma studio`}
        </pre>
      </div>

      <div className="card">
        <h2 className="card-title">4. Running the Application</h2>
        <pre style={{ 
          background: "#2a2d3e", 
          padding: "1rem", 
          borderRadius: "8px"
        }}>
{`# Development mode
npm run dev

# Production build
npm run build
npm start`}
        </pre>
        <p className="card-content" style={{ marginTop: "1rem" }}>
          Access the application at{" "}
          <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
            http://localhost:3000
          </a>
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">5. Deployment to Vercel</h2>
        <p className="card-content">
          <strong>Step 1:</strong> Push code to GitHub repository
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 2:</strong> Connect repository to Vercel
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 3:</strong> Add environment variables in Vercel dashboard
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 4:</strong> Update <code style={{ background: "#2a2d3e", padding: "2px 6px", borderRadius: "4px" }}>NEXTAUTH_URL</code> to production URL
        </p>
        <p className="card-content" style={{ marginTop: "0.5rem" }}>
          <strong>Step 5:</strong> Add production URL to Google OAuth authorized redirects
        </p>
      </div>

      <div className="card">
        <h2 className="card-title">Troubleshooting</h2>
        <ul style={{ marginLeft: "1.5rem" }}>
          <li><strong>Redirect URI mismatch:</strong> Verify authorized redirect URIs in Google Console</li>
          <li><strong>Invalid client:</strong> Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET</li>
          <li><strong>Session not persisting:</strong> Verify NEXTAUTH_SECRET is set</li>
          <li><strong>Database connection:</strong> Confirm DATABASE_URL is correct</li>
        </ul>
      </div>
    </main>
  );
}
