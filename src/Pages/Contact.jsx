// src/Pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="contact" className="page contact-page" style={{ minHeight: "60vh", padding: "6rem 1rem 2rem" }}>
      <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.25rem", lineHeight: 1.2, marginBottom: "0.5rem" }}>Contact Us</h1>
        <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>Have a question or want to plan a visit? Send a note.</p>

        {submitted ? (
          <div style={{ padding: "1rem", border: "1px solid #e5e7eb", borderRadius: 12 }}>
            Thanks, {form.name || "friend"} — we’ll be in touch at {form.email || "your email"}.
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.75rem" }}>
            <input
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={onChange}
              required
              style={{ padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
              style={{ padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Message"
              value={form.message}
              onChange={onChange}
              style={{ padding: "0.75rem 1rem", borderRadius: 10, border: "1px solid #e5e7eb" }}
            />
            <button type="submit" style={{ padding: "0.8rem 1.2rem", borderRadius: 10, background: "black", color: "white" }}>
              Send
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
