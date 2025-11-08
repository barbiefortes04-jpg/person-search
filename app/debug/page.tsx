"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AuthDebugPage() {
  const { data: session, status } = useSession();
  const [envInfo, setEnvInfo] = useState<any>(null);

  useEffect(() => {
    // Fetch environment info from a debug API
    fetch('/api/debug/env')
      .then(res => res.json())
      .then(data => setEnvInfo(data))
      .catch(err => console.error('Failed to fetch env info:', err));
  }, []);

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">Authentication Debug</h1>
        <p className="page-subtitle">Diagnose authentication issues</p>
      </div>

      <div className="card">
        <h2 className="card-title">Session Status</h2>
        <div className="card-content">
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Has Session:</strong> {session ? "Yes" : "No"}</p>
          {session && (
            <div>
              <p><strong>User Name:</strong> {session.user?.name || "N/A"}</p>
              <p><strong>User Email:</strong> {session.user?.email || "N/A"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Environment Variables</h2>
        <div className="card-content">
          {envInfo ? (
            <div>
              <p><strong>NEXTAUTH_SECRET:</strong> {envInfo.hasNextAuthSecret ? "✅ Set" : "❌ Missing"}</p>
              <p><strong>GOOGLE_CLIENT_ID:</strong> {envInfo.hasGoogleClientId ? "✅ Set" : "❌ Missing"}</p>
              <p><strong>GOOGLE_CLIENT_SECRET:</strong> {envInfo.hasGoogleClientSecret ? "✅ Set" : "❌ Missing"}</p>
              <p><strong>NEXTAUTH_URL:</strong> {envInfo.nextAuthUrl}</p>
              <p><strong>NODE_ENV:</strong> {envInfo.nodeEnv}</p>
            </div>
          ) : (
            <p>Loading environment info...</p>
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Quick Actions</h2>
        <div className="card-content">
          <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            <a href="/api/auth/signin" className="btn-primary" style={{ textAlign: "center" }}>
              Test Sign In
            </a>
            <a href="/api/auth/signin/google" className="btn-secondary" style={{ textAlign: "center" }}>
              Direct Google Sign In
            </a>
            {session && (
              <a href="/api/auth/signout" className="btn-secondary" style={{ textAlign: "center" }}>
                Sign Out
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Expected Environment Variables</h2>
        <div className="card-content">
          <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", fontSize: "0.9rem" }}>
{`# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=31768af7e5537a554ef0b6cf095869c1
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret`}
          </pre>
        </div>
      </div>
    </main>
  );
}