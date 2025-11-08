# Person Search App - OAuth-Secured CRUD Application

A modern Next.js 14 application with OAuth authentication and CRUD operations for managing person records.

## 🚀 Features

### Authentication & Security
- **Google OAuth 2.0** authentication via NextAuth.js
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

## 🛠️ Technologies Used

- **Framework**: Next.js 14
- **Authentication**: NextAuth.js v4
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod
- **Styling**: CSS with custom properties
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- PostgreSQL database
- Google OAuth credentials

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd person-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/person_app"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env.local` file

## 📊 Database Schema

The application uses a simple Person model:

```prisma
model Person {
  id    Int    @id @default(autoincrement())
  name  String
  age   Int
  email String @unique
}
```

## 🎯 Usage

1. **Authentication**: Click "Login" to authenticate with Google
2. **View Persons**: Navigate to "Person CRUD" to see all person records
3. **Add Person**: Click "Add New Person" and fill out the form
4. **Edit Person**: Click "Edit" on any person card to modify their details
5. **Delete Person**: Click "Delete" on any person card (with confirmation)

## 📱 App Pages

### Main Pages
- **`/`** - Home page with user search and authentication status
- **`/person`** - Protected Person CRUD interface
- **`/about`** - Authentication architecture documentation
- **`/auth-setup`** - Complete OAuth setup guide
- **`/security`** - Security features and protected routes
- **`/github`** - Repository information and project structure

### API Routes
- **`/api/auth/[...nextauth]`** - NextAuth.js authentication handler
- **`/api/persons`** - CRUD operations for persons
- **`/api/persons/[id]`** - Individual person operations
- **`/api/mcp`** - OAuth-protected MCP server endpoint

## 🛡️ Security Features

- **Input Validation**: All inputs are validated using Zod schemas
- **Authentication Protection**: API routes require valid sessions
- **SQL Injection Prevention**: Prisma ORM handles query sanitization
- **CSRF Protection**: NextAuth.js includes CSRF protection
- **Environment Variables**: Sensitive data stored in environment variables
- **Email Uniqueness**: Prevents duplicate email addresses
- **Error Handling**: Comprehensive error handling with user feedback

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth handler
│   │   ├── persons/route.ts               # Person CRUD API
│   │   ├── persons/[id]/route.ts          # Individual person API
│   │   └── mcp/route.ts                   # MCP server endpoint
│   ├── person/page.tsx                    # Person CRUD interface
│   ├── about/page.tsx                     # Documentation page
│   ├── auth-setup/page.tsx                # Setup guide
│   ├── security/page.tsx                  # Security info
│   ├── github/page.tsx                    # Repository info
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Home page
│   ├── providers.tsx                      # Session provider
│   └── globals.css                        # Global styles
├── components/
│   └── Navigation.tsx                     # Navigation component
├── lib/
│   ├── auth.ts                           # Auth configuration
│   ├── prisma.ts                         # Database client
│   └── env.ts                            # Environment validation
├── prisma/
│   └── schema.prisma                     # Database schema
├── types.ts                              # TypeScript types
└── package.json
```

## 🔄 Recent Fixes Applied

### ✅ Fixed Issues:
1. **NextAuth API Route**: Added missing `/api/auth/[...nextauth]/route.ts`
2. **Database Integration**: Replaced in-memory storage with Prisma + PostgreSQL
3. **Input Validation**: Added Zod schemas for all API endpoints
4. **Error Handling**: Comprehensive error handling with user feedback
5. **Type Safety**: Improved TypeScript types and interfaces
6. **Dependencies**: Updated to compatible versions
7. **UI/UX**: Added loading states, error messages, and disabled states
8. **Security**: Enhanced validation and authentication checks
9. **Performance**: Optimized database queries and form handling
10. **Documentation**: Complete setup and usage instructions

### 🛠️ Implementation Details:
- **Authentication**: Proper NextAuth.js v4 configuration with Google OAuth
- **Database**: Full Prisma integration with proper client instantiation
- **Validation**: Server-side validation with Zod schemas
- **Error Handling**: User-friendly error messages and proper HTTP status codes
- **UI**: Responsive design with dark/light theme support
- **Security**: Protected routes, input sanitization, and session validation

## 🚀 Deployment

### Prerequisites for deployment:
1. Set up a PostgreSQL database (e.g., Railway, Supabase, or PlanetScale)
2. Update your Google OAuth settings with production URLs
3. Set environment variables in your hosting platform

### Deploy to Vercel:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Verify DATABASE_URL is correct
   - Ensure PostgreSQL is running
   - Run `npx prisma db push` to sync schema

2. **OAuth Error**
   - Check Google OAuth credentials
   - Verify redirect URIs in Google Cloud Console
   - Ensure NEXTAUTH_URL matches your domain

3. **Build Errors**
   - Run `npm run lint` to check for issues
   - Ensure all environment variables are set
   - Check TypeScript errors with `npx tsc --noEmit`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.