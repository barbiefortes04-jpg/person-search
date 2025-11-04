import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { persons } from "@/data";

// GET single person
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const person = persons.find(p => p.id === parseInt(params.id));
  
  if (!person) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 });
  }

  return NextResponse.json(person);
}

// PUT update person
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, age, email } = body;
    
    const index = persons.findIndex(p => p.id === parseInt(params.id));
    
    if (index === -1) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    persons[index] = {
      ...persons[index],
      name: name || persons[index].name,
      age: age ? parseInt(age) : persons[index].age,
      email: email || persons[index].email,
    };

    return NextResponse.json(persons[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// DELETE person
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const index = persons.findIndex(p => p.id === parseInt(params.id));
  
  if (index === -1) {
    return NextResponse.json({ error: "Person not found" }, { status: 404 });
  }

  const deletedPerson = persons.splice(index, 1)[0];

  return NextResponse.json(deletedPerson);
}
