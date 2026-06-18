import React, { useState, useEffect } from "react";
import { Download, Trash2, Loader } from "lucide-react";
import "./messages.css";
import { API_URL } from "../services/blogApi";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const FORMS_API = `${API_URL}/api/forms`;

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${FORMS_API}/all`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      } else {
        setError("Failed to load messages");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      setDeleting(id);
      const response = await fetch(`${FORMS_API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setMessages(messages.filter((msg) => msg._id !== id));
      } else {
        setError("Failed to delete message");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      setError("Network error. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const handleExportExcel = async () => {
    try {
      const response = await fetch(`${FORMS_API}/export/excel`);
      if (!response.ok) {
        throw new Error("Failed to export");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "form_submissions.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      setError("Failed to export to Excel");
    }
  };

  if (loading) {
    return (
      <div className="messages-container">
        <div className="loading">
          <Loader size={40} />
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h1 className="messages-title">Contact Form Messages</h1>
        <div className="messages-actions">
          <button
            className="btn btn-export"
            onClick={handleExportExcel}
            disabled={messages.length === 0}
          >
            <Download size={18} />
            Export to Excel
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="messages-list">
          <div className="messages-stats">
            <p>Total Messages: <strong>{messages.length}</strong></p>
          </div>

          <div className="messages-table-wrapper">
            <table className="messages-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message._id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.phone}</td>
                    <td>{message.subject}</td>
                    <td className="message-content">
                      {message.message.substring(0, 50)}...
                    </td>
                    <td>
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(message._id)}
                        disabled={deleting === message._id}
                        title="Delete message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="messages-detail">
            <h2>Message Details</h2>
            {messages.length > 0 && (
              <div className="message-cards">
                {messages.map((message) => (
                  <div key={message._id} className="message-card">
                    <div className="message-card-header">
                      <h3>{message.name}</h3>
                      <span className="message-date">
                        {new Date(message.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="message-card-body">
                      <p>
                        <strong>Email:</strong> {message.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {message.phone}
                      </p>
                      <p>
                        <strong>Subject:</strong> {message.subject}
                      </p>
                      <p>
                        <strong>Message:</strong>
                        <br />
                        {message.message}
                      </p>
                    </div>
                    <div className="message-card-footer">
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(message._id)}
                        disabled={deleting === message._id}
                      >
                        <Trash2 size={16} />
                        {deleting === message._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
