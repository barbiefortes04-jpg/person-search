// lib/env-validation.ts
export function validateEnvironment() {
  const required = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  };

  const missing = Object.entries(required)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach(key => console.error(`   - ${key}`));
    console.error("\n📝 Please add these to your .env.local file:");
    console.error("   NEXTAUTH_SECRET=your-secret-here");
    console.error("   GOOGLE_CLIENT_ID=your-google-client-id");
    console.error("   GOOGLE_CLIENT_SECRET=your-google-client-secret");
    return false;
  }

  console.log("✅ All required environment variables are set");
  return true;
}

export function getEnvironmentInfo() {
  return {
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || "not set",
    nodeEnv: process.env.NODE_ENV,
  };
}