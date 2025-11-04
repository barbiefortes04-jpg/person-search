"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Person } from "@/types";

export default function PersonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    } else if (status === "authenticated") {
      fetchPersons();
    }
  }, [status, router]);

  const fetchPersons = async () => {
    try {
      const res = await fetch("/api/persons");
      if (res.ok) {
        const data = await res.json();
        setPersons(data);
      }
    } catch (error) {
      console.error("Error fetching persons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPerson) {
        // Update existing person
        const res = await fetch(`/api/persons/${editingPerson.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          await fetchPersons();
          resetForm();
        }
      } else {
        // Create new person
        const res = await fetch("/api/persons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          await fetchPersons();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving person:", error);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      age: person.age.toString(),
      email: person.email,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this person?")) return;

    try {
      const res = await fetch(`/api/persons/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchPersons();
      }
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", age: "", email: "" });
    setEditingPerson(null);
    setShowForm(false);
  };

  if (status === "loading" || loading) {
    return (
      <main className="main-content">
        <p>Loading...</p>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="main-content">
      <div className="page-header">
        <h1 className="page-title">Person CRUD</h1>
        <p className="page-subtitle">Manage person records with full CRUD operations</p>
      </div>

      <div className="auth-status">
        <span className="status-text">
          Logged in as <span className="status-user">{session.user?.name}</span>
        </span>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? "Cancel" : "Add New Person"}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 className="card-title">
            {editingPerson ? "Edit Person" : "Add New Person"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit" className="btn-primary">
                {editingPerson ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="person-grid">
        {persons.map((person) => (
          <div key={person.id} className="person-card">
            <h3 className="person-name">{person.name}</h3>
            <p className="person-detail">Age: {person.age}</p>
            <p className="person-detail">Email: {person.email}</p>
            <div className="person-actions">
              <button
                onClick={() => handleEdit(person)}
                className="btn-edit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(person.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {persons.length === 0 && !loading && (
        <div className="card">
          <p className="card-content">
            No persons found. Click "Add New Person" to create one.
          </p>
        </div>
      )}
    </main>
  );
}
