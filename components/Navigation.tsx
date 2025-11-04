"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    setIsDark(theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          Person Search
        </Link>

        <div className="nav-links">
          <Link 
            href="/" 
            className={`nav-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
          <Link 
            href="/auth-setup" 
            className={`nav-link ${isActive("/auth-setup") ? "active" : ""}`}
          >
            Auth Setup
          </Link>
          <Link 
            href="/security" 
            className={`nav-link ${isActive("/security") ? "active" : ""}`}
          >
            Security
          </Link>
          <Link 
            href="/github" 
            className={`nav-link ${isActive("/github") ? "active" : ""}`}
          >
            GitHub
          </Link>
          
          {session && (
            <Link 
              href="/person" 
              className={`nav-link ${isActive("/person") ? "active" : ""}`}
            >
              Person CRUD
            </Link>
          )}
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {session ? (
            <div className="user-info">
              <span className="user-name">{session.user?.name}</span>
              <button onClick={() => signOut()} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/api/auth/signin" className="btn-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
