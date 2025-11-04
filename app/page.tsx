"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">User Search</h1>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn-primary">
            Add User
          </button>
        </form>

        <div className="info-box">
          <h2 className="info-title">How it works</h2>
          <p className="info-text">
            The search functionality is implemented using a server action, which searches an array of pre-populated user data. 
            The AsyncSelect component sends the search query to the server action, which filters the users based on a{" "}
            <code style={{ background: "#1a1f2e", padding: "2px 6px", borderRadius: "4px" }}>startsWith</code> matching logic. 
            When a user is selected from the dropdown, their details are displayed in a card component.
          </p>
        </div>
      </div>

      {session && (
        <div className="card">
          <h2 className="card-title">Authentication Status</h2>
          <p className="card-content">
            You are logged in as <strong style={{ color: "#4a9eff" }}>{session.user?.name}</strong>
          </p>
          <p className="card-content" style={{ marginTop: "1rem" }}>
            Access the <Link href="/person">Person CRUD</Link> page to manage person records.
          </p>
        </div>
      )}
    </main>
  );
}
