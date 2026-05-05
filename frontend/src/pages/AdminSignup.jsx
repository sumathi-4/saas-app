import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function AdminSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/create-test-admin", {
        name,
        email,
        password,
        organizationId
      });
      alert("Admin user created! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Admin signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Admin Account</h2>
        <p style={styles.subtitle}> creates an admin user</p>
        {error && <div style={styles.error}>{error}</div>}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Organization ID (e.g., myorg)"
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdminSignup} disabled={loading} style={styles.button}>
          {loading ? "Creating admin..." : "Create Admin"}
        </button>
        <div style={styles.loginLink}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%)",
    padding: "1rem",
  },
  card: {
    background: "white",
    padding: "2.5rem",
    borderRadius: "32px",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#0f172a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "#64748b",
    marginBottom: "2rem",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "0.85rem 1rem",
    marginBottom: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    fontSize: "0.9rem",
    transition: "all 0.2s",
    outline: "none",
    backgroundColor: "#f8fafc",
  },
  button: {
    width: "100%",
    background: "#0f172a",
    color: "white",
    border: "none",
    padding: "0.85rem",
    borderRadius: "40px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s, transform 0.1s",
    marginTop: "0.5rem",
  },
  error: {
    background: "#fef2f2",
    borderLeft: "4px solid #ef4444",
    padding: "0.75rem",
    borderRadius: "12px",
    marginBottom: "1.5rem",
    fontSize: "0.85rem",
    color: "#b91c1c",
  },
  footer: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#64748b",
  },
  loginLink: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#64748b",
  },
};

export default AdminSignup;