"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Person, ApiResponse } from "@/types";

interface FormData {
  name: string;
  age: string;
  email: string;
}

export default function PersonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
      setError("");
      const res = await fetch("/api/persons");
      const data = await res.json();
      
      if (res.ok) {
        setPersons(data);
      } else {
        setError(data.error || "Failed to fetch persons");
      }
    } catch (error) {
      console.error("Error fetching persons:", error);
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        email: formData.email.trim(),
      };

      // Validate on client side
      if (!payload.name || !payload.age || !payload.email) {
        setError("All fields are required");
        return;
      }

      if (payload.age <= 0) {
        setError("Age must be a positive number");
        return;
      }

      const url = editingPerson 
        ? `/api/persons/${editingPerson.id}`
        : "/api/persons";
      
      const method = editingPerson ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchPersons();
        resetForm();
      } else {
        setError(data.error || "Failed to save person");
        if (data.details) {
          const fieldErrors = data.details.map((d: any) => `${d.field}: ${d.message}`).join(", ");
          setError(`${data.error}: ${fieldErrors}`);
        }
      }
    } catch (error) {
      console.error("Error saving person:", error);
      setError("Network error occurred");
    } finally {
      setSubmitting(false);
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
    setError("");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this person?")) return;

    try {
      setError("");
      const res = await fetch(`/api/persons/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        await fetchPersons();
      } else {
        setError(data.error || "Failed to delete person");
      }
    } catch (error) {
      console.error("Error deleting person:", error);
      setError("Network error occurred");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", age: "", email: "" });
    setEditingPerson(null);
    setShowForm(false);
    setError("");
  };

  if (status === "loading" || loading) {
    return (
      <main className="main-content">
        <div className="loading-container">
          <p>Loading...</p>
        </div>
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
          disabled={submitting}
        >
          {showForm ? "Cancel" : "Add New Person"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError("")} className="btn-close">×</button>
        </div>
      )}

      {showForm && (
        <div className="card">
          <h2 className="card-title">
            {editingPerson ? "Edit Person" : "Add New Person"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                disabled={submitting}
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Age *</label>
              <input
                type="number"
                className="form-input"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
                min="1"
                max="120"
                disabled={submitting}
                placeholder="Enter age"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={submitting}
                placeholder="Enter email address"
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={submitting}
              >
                {submitting 
                  ? (editingPerson ? "Updating..." : "Creating...") 
                  : (editingPerson ? "Update" : "Create")
                }
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
                disabled={submitting}
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
                disabled={submitting}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(person.id)}
                className="btn-delete"
                disabled={submitting}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {persons.length === 0 && !loading && !error && (
        <div className="card">
          <p className="card-content">
            No persons found. Click "Add New Person" to create one.
          </p>
        </div>
      )}
    </main>
  );
}