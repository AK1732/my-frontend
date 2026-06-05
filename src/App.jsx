import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Could not load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setAdding(true);
    try {
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setName("");
      setEmail("");
      setSuccess("User added!");
      setTimeout(() => setSuccess(""), 2500);
      fetchUsers();
    } catch {
      setError("Failed to add user.");
    } finally {
      setAdding(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") addUser(); };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const colors = ["#6366f1","#0ea5e9","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899","#14b8a6"];

  return (
    <div className="page">

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">⚡</div>
          <span className="logo-text">UserFlow</span>
        </div>

        <nav>
          <a className="nav-link active" href="#">
            <span className="nav-icon">👥</span>
            Users
            <span className="nav-count">{users.length}</span>
          </a>
        </nav>

        <div className="sidebar-stat">
          <p className="sidebar-stat-num">{users.length}</p>
          <p className="sidebar-stat-label">Total Users</p>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main">

        <div className="topbar appear" style={{ animationDelay: '40ms' }}>
          <div>
            <h1 className="page-title">User Management</h1>
            <p className="page-sub">Add and manage your users</p>
          </div>
          <span className="badge">{users.length} users</span>
        </div>

          <div className="cards">
            <div className="user-count-card appear" style={{ animationDelay: '80ms' }}>
              <div className="count-num">{users.length}</div>
              <div className="count-label">Total Users</div>
            </div>
          </div>

          <div className="layout">

          {/* ── Add User Panel ── */}
          <section className="panel appear" style={{ animationDelay: '140ms' }}>
            <h2 className="panel-title">Add New User</h2>

            {error && <div className="toast toast-error">{error}</div>}
            {success && <div className="toast toast-success">{success}</div>}

            <label className="field-label">Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <label className="field-label">Email Address</label>
            <input
              type="email"
              className="input"
              placeholder="e.g. rahul@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button className="btn" onClick={addUser} disabled={adding}>
              {adding ? "Adding..." : "+ Add User"}
            </button>
          </section>

          {/* ── Users List Panel ── */}
          <section className="panel appear" style={{ animationDelay: '180ms' }}>
            <div className="list-header">
              <h2 className="panel-title" style={{marginBottom:0}}>
                All Users
                <span className="count-chip">{filtered.length}</span>
              </h2>
              <input
                type="text"
                className="search"
                placeholder="🔍  Search users..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="center">
                <div className="spinner"></div>
                <p className="muted-text">Loading...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="center">
                <p className="empty-text">
                  {search ? "No results found." : "No users yet. Add one!"}
                </p>
              </div>
            ) : (
              <div className="user-list">
                <div className="table-header">
                  <div></div>
                  <div className="th">Name</div>
                  <div className="th">Email</div>
                  <div className="th">ID</div>
                  <div className="th">Actions</div>
                </div>
                {filtered.map((user, i) => (
                  <div className="user-row" key={user.id} style={{ animationDelay: `${i * 60}ms` }}>
                    <div
                      className="avatar"
                      style={{ background: colors[i % colors.length] }}
                    >
                      {getInitials(user.name)}
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    <span className="user-id">#{user.id}</span>
                    <button
                      className="del-btn"
                      onClick={() => deleteUser(user.id)}
                      title="Delete"
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;