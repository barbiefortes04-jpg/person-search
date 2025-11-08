import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const PersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().positive("Age must be a positive number"),
  email: z.string().email("Invalid email format"),
});

// GET all persons
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const persons = await prisma.person.findMany({
      orderBy: { id: 'desc' }
    });
    
    return NextResponse.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

// POST create new person
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // Validate input data
    const validatedData = PersonSchema.parse({
      name: body.name,
      age: parseInt(body.age),
      email: body.email,
    });

    // Check if email already exists
    const existingPerson = await prisma.person.findUnique({
      where: { email: validatedData.email }
    });

    if (existingPerson) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    const newPerson = await prisma.person.create({
      data: validatedData,
    });

    return NextResponse.json(newPerson, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Invalid data", 
          details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        }, 
        { status: 400 }
      );
    }
    
    console.error("Error creating person:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}