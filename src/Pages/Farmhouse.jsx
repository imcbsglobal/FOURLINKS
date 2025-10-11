// src/Pages/Farmhouse.jsx
import React from "react";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";

export default function Farmhouse() {
  const features = [
    "Spacious verandas and airy interiors",
    "Three cozy bedrooms with garden views",
    "Open dining & rustic kitchen for long, slow meals",
    "Bonfire pit • Hammocks • Walking trails",
  ];

  return (
    <main id="farmhouse" className="page farmhouse-page" style={{ minHeight: "60vh", padding: "6rem 1rem 2rem" }}>
      <div className="container" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.25rem", lineHeight: 1.2, marginBottom: "0.5rem" }}>The Farmhouse</h1>
        <p style={{ opacity: 0.8, marginBottom: "2rem" }}>
          Rustic charm, soft light, and plenty of room to gather.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <img src={gallery1} alt="Veranda" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12 }} />
          <img src={gallery2} alt="Interior" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12 }} />
          <img src={gallery3} alt="Garden" style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12 }} />
        </div>

        <ul style={{ display: "grid", gap: ".5rem", paddingLeft: "1.2rem" }}>
          {features.map((f, i) => (
            <li key={i} style={{ listStyle: "disc" }}>{f}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
