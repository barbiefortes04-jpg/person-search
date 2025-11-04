# 📋 Person Search - OAuth-Secured CRUD Application

This is a Next.js 14 application demonstrating enterprise-grade OAuth authentication with Auth.js (NextAuth v5) and Google OAuth provider, featuring protected Person CRUD operations.

## 🎯 Week 5 Deliverable: OAuth-Secured Person App

This application meets all requirements for the Week 5 OAuth implementation deliverable, including:

- ✅ **Auth.js (NextAuth v5)** with Google OAuth provider integration
- ✅ **Protected routes** requiring authentication for Person CRUD operations
- ✅ **User session management** with JWT strategy
- ✅ **Secure logout functionality** with proper session handling
- ✅ **OAuth-protected MCP server** access
- ✅ **Built-in documentation pages** (`/auth-setup`, `/security`, `/github`, `/about`)
- ✅ **Professional UI/UX** with modern dark theme
- ✅ **Full CRUD operations** for Person entities

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/person_db
```

To generate a `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

## Database Setup

This project uses Prisma with PostgreSQL. To set up the database:

1. Install PostgreSQL if you haven't already
2. Create a database for the project
3. Update the `DATABASE_URL` in your `.env` file
4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

To view and manage your database:
```bash
npx prisma studio
```

## 🚀 Features

### Authentication & Security
- **Google OAuth 2.0** authentication via Auth.js (NextAuth v5)
- **JWT session management** for stateless authentication
- **Protected routes** with server-side validation
- **Automatic redirects** for unauthenticated users
- **Secure API endpoints** with authentication middleware
- **CSRF protection** built into NextAuth

### Person CRUD Operations
- **Create** new person records with validation
- **Read** all persons or individual records
- **Update** existing person information
- **Delete** person records with confirmation
- **Real-time updates** after CRUD operations
- **Form validation** on client and server side

### User Interface
- **Modern dark theme** with professional styling
- **Responsive navigation** bar with active states
- **Card-based layouts** for better organization
- **Interactive forms** with proper feedback
- **Loading states** and error handling
- **Smooth animations** and transitions

### Documentation Pages
- **`/`** - Home page with user search and authentication status
- **`/person`** - Protected Person CRUD interface
- **`/about`** - Authentication architecture documentation
- **`/auth-setup`** - Complete OAuth setup guide
- **`/security`** - Security features and protected routes
- **`/github`** - Repository information and project structure

### MCP Server
- **OAuth-protected endpoint** at `/api/mcp`
- **Session validation** for all MCP operations
- **Secure access control** for advanced features

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
