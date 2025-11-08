import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const PersonUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  age: z.number().int().positive("Age must be a positive number").optional(),
  email: z.string().email("Invalid email format").optional(),
});

// GET single person
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const personId = parseInt(params.id);
    
    if (isNaN(personId)) {
      return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
    }

    const person = await prisma.person.findUnique({
      where: { id: personId }
    });
    
    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error("Error fetching person:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

// PUT update person
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const personId = parseInt(params.id);
    
    if (isNaN(personId)) {
      return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
    }

    const body = await req.json();
    
    // Validate input data
    const validatedData = PersonUpdateSchema.parse({
      name: body.name,
      age: body.age ? parseInt(body.age) : undefined,
      email: body.email,
    });

    // Check if person exists
    const existingPerson = await prisma.person.findUnique({
      where: { id: personId }
    });

    if (!existingPerson) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    // Check if email is being changed and if it already exists
    if (validatedData.email && validatedData.email !== existingPerson.email) {
      const emailExists = await prisma.person.findUnique({
        where: { email: validatedData.email }
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    const updatedPerson = await prisma.person.update({
      where: { id: personId },
      data: validatedData,
    });

    return NextResponse.json(updatedPerson);
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
    
    console.error("Error updating person:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

// DELETE person
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const personId = parseInt(params.id);
    
    if (isNaN(personId)) {
      return NextResponse.json({ error: "Invalid person ID" }, { status: 400 });
    }

    // Check if person exists
    const existingPerson = await prisma.person.findUnique({
      where: { id: personId }
    });

    if (!existingPerson) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    const deletedPerson = await prisma.person.delete({
      where: { id: personId }
    });

    return NextResponse.json(deletedPerson);
  } catch (error) {
    console.error("Error deleting person:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}