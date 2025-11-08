import { NextResponse } from "next/server";
import { getEnvironmentInfo } from "@/lib/env-validation";

export async function GET() {
  try {
    const envInfo = getEnvironmentInfo();
    return NextResponse.json(envInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get environment info" },
      { status: 500 }
    );
  }
}