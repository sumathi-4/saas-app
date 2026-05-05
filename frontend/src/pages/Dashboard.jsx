import { useEffect, useState } from "react";
import API from "../services/api";



function Dashboard({user}) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Fetch error:", err.response?.data);
    }
  };

  const createTask = async () => {
    try {
      await API.post("/tasks", { title, description });
      fetchTasks();
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log("Create error:", err.response?.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const updateTask = async (id) => {
  if (!editTitle.trim() && !editDesc.trim()) {
    alert("Please enter a title or description");
    return;
  }
  try {
    const payload = {
      title: editTitle,
      description: editDesc
    };
    console.log("Sending update:", payload);
    const res = await API.put(`/tasks/${id}`, payload);
    console.log("Update success:", res.data);
    setEditingId(null);
    fetchTasks();
  } catch (err) {
    console.error("Update failed:", err);
    alert("Update failed: " + (err.response?.data?.message || err.message));
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Task Manager</h1>
          <p style={styles.userInfo}>👤 Role: {user?.role} | 🏢 Org: {user?.organizationId}</p>
          <p style={styles.userInfo}>📊 Total Tasks: {tasks.length}</p>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.addTaskCard}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button onClick={createTask} style={styles.addBtn}>
          + Add Task
        </button>
      </div>

      <div style={styles.taskGrid}>
        {tasks.length === 0 && <p style={styles.empty}>✨ No tasks yet. Create one!</p>}
        {tasks.map((t) => (
          <div key={t._id} style={styles.taskCard}>
            <div style={styles.taskHeader}>
              <strong>{t.title}</strong>
              <div>
                <button
                  onClick={() => {
                    setEditingId(t._id);
                    setEditTitle(t.title);
                    setEditDesc(t.description);
                  }}
                  style={styles.editBtn}
                >
                  ✏️ Edit
                </button>
                {user?.role === "admin" && (
                  <button onClick={() => deleteTask(t._id)} style={styles.deleteBtn}>
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
            <p style={styles.taskDesc}>{t.description}</p>
            {editingId === t._id && (
              <div style={styles.editForm}>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                  style={styles.editInput}
                />
                <input
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="Edit description"
                  style={styles.editInput}
                />
                <button onClick={() => updateTask(t._id)} style={styles.saveBtn}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  dashboard: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1.5rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
    background: "white",
    padding: "1rem 1.5rem",
    borderRadius: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f6",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: 0,
    color: "#0f172a",
  },
  userInfo: {
    color: "#475569",
    marginTop: "0.25rem",
    fontSize: "0.85rem",
  },
  logoutBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.5rem 1.2rem",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background 0.2s, transform 0.1s",
  },
  addTaskCard: {
    background: "white",
    borderRadius: "24px",
    padding: "1.5rem",
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f6",
  },
  input: {
    flex: 1,
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "40px",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border 0.2s",
    backgroundColor: "#ffffff",
  },
  addBtn: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "0.75rem 1.8rem",
    borderRadius: "40px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background 0.2s, transform 0.1s",
  },
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "1.5rem",
  },
  taskCard: {
    background: "white",
    borderRadius: "24px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px -2px rgba(0,0,0,0.05)",
    border: "1px solid #eef2f6",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  editBtn: {
    background: "#e0f2fe",
    border: "none",
    padding: "0.3rem 1rem",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "500",
    transition: "background 0.2s",
  },
  deleteBtn: {
    background: "#fee2e2",
    border: "none",
    padding: "0.3rem 1rem",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "500",
    transition: "background 0.2s",
  },
  taskDesc: {
    color: "#334155",
    marginBottom: "1rem",
    lineHeight: "1.5",
  },
  editForm: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #eef2f6",
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  editInput: {
    flex: 1,
    padding: "0.5rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "30px",
    fontSize: "0.85rem",
  },
  saveBtn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "0.5rem 1.2rem",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "500",
  },
  cancelBtn: {
    background: "#9ca3af",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "30px",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "3rem",
    gridColumn: "1 / -1",
  },
};

export default Dashboard;