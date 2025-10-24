// src/Pages/About.jsx
import React, { useState, useEffect } from "react";
import "./About.scss";

import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";

export default function About() {
  // Banner slides
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      color: "#f9c74f",
    },
    {
      image:
        "https://i.pinimg.com/1200x/77/b4/15/77b415274ba9cd547f20db99046d61ff.jpg",
      color: "#90be6d",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1400&h=800&fit=crop",
      color: "#577590",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // --- NEW ANIMATION EFFECT FOR "WHY CHOOSE US" ---
  useEffect(() => {
    const rows = document.querySelectorAll(".wcc-row");
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  // --- WHAT WE DO section data ---
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 0,
      title: "Building Construction",
      image: gallery1,
      heading: "Building Construction",
      description:
        "We deal with all fields of building construction, metal & steel works like preparation of drawings, getting approvals from authorities, supervision, and execution of projects. Our team is motivated, experienced, and committed — professionals who prove their worth in various projects with appreciation from respected clients.",
    },
    {
      id: 1,
      title: "Villa Renovation",
      image: gallery2,
      heading: "Villa Renovation",
      description:
        "Four Links is a top villa renovation company offering exceptional and coherent interior renovation solutions and villa modification services. We provide international-standard renovation & modification services to upgrade the value of your property.",
    },
    {
      id: 2,
      title: "Fitout / Interior Works",
      image: gallery3,
      heading: "Fitout / Interior Works",
      description:
        "Interior design is a multifaceted profession that includes conceptual development, space planning, site inspections, and communication with stakeholders — ensuring harmony between aesthetics and functionality.",
    },
    {
      id: 3,
      title: "Aluminium and Glass Works",
      image: gallery4,
      heading: "Aluminium and Glass Works",
      description:
        "We specialize in aluminum and glass works including windows, curtain walls, and partitions. Our focus is on design precision, safety, and visual appeal using the highest quality materials.",
    },
    {
      id: 4,
      title: "MEP Works",
      image: gallery5,
      heading: "MEP Works",
      description:
        "As professionals, we provide high-quality MEP contractual services for both large and small projects. Our team ensures reliability, efficiency, and superior engineering standards across all systems.",
    },
    {
      id: 5,
      title: "Warehouse Construction",
      image: gallery6,
      heading: "Warehouse Construction",
      description:
        "Four Links delivers turnkey warehouse construction solutions — from design to build — equipped with the latest technologies and experienced resources to ensure precision and performance.",
    },
  ];

  const experiences = [
    {
      id: 1,
      title: "EXPERIENCE TOGETHERNESS",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&h=700&fit=crop",
    },
    {
      id: 2,
      title: "TIME WITH NEAR AND DEAR",
      image:
        "https://images.unsplash.com/photo-1581574209469-7b1f7a1aab3f?w=1000&h=700&fit=crop",
    },
    {
      id: 3,
      title: "BONDS THAT BIND",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&h=700&fit=crop",
    },
  ];

  /* -----------------------
     WHAT WE BUILT (portfolio tabs)
  ----------------------- */
  const [portfolioTab, setPortfolioTab] = useState(0);

  const portfolioData = {
    0: [
      {
        id: 1,
        title: "Featured Project 1",
        image:
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop",
      },
      {
        id: 2,
        title: "Featured Project 2",
        image:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&h=400&fit=crop",
      },
      {
        id: 3,
        title: "Featured Project 3",
        image:
          "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=600&h=400&fit=crop",
      },
      {
        id: 4,
        title: "Featured Project 4",
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
      },
    ],
  };

  const tabs = ["Featured", "Buildings", "Civil", "Industrial", "Special Projects"];
  const currentProjects = portfolioData[portfolioTab] || portfolioData[0];

 return (
    <>
     {/* --- HERO BANNER (replace existing banner section) --- */}
<section className="hero-banner" aria-label="Hero banner">
  {/* slideshow background image (uses slides[current].image) */}
  <img
    src={slides[current].image}
    alt={`Slide ${current + 1}`}
    className="hero-banner__bg"
  />

  {/* dark overlay to improve contrast */}
  <div className="hero-banner__overlay" />

  {/* centered headline + CTA */}
  <div className="hero-banner__center">
    <h1 className="hero-banner__title">FOUR LINKS</h1>
    <p className="hero-banner__subtitle">Building Contracting LLC</p>
    <div className="hero-banner__actions">
      <a href="#who-we-are" className="hero-btn hero-btn--primary">WHO WE ARE</a>
    </div>
  </div>

  {/* bottom cards that overlap the hero (three preview cards) */}
  <div className="hero-banner__cards">
    <article className="hero-card">
      <div className="hero-card__media">
        <img src={gallery1} alt="House Renovation" />
        <button className="hero-card__play" aria-hidden="true">▶</button>
      </div>
      <div className="hero-card__body">
        <h4>Best House Renovation</h4>
        <p>Constructor explains how you can enjoy high end flooring trends like textured wood and realistic stones.</p>
        <a className="hero-card__link" href="#read1">READ MORE</a>
      </div>
    </article>

    <article className="hero-card">
      <div className="hero-card__media">
        <img src={gallery2} alt="Teamwork" />
        <button className="hero-card__play" aria-hidden="true">▶</button>
      </div>
      <div className="hero-card__body">
        <h4>The Effective Teamwork</h4>
        <p>As the general contractor, we first create the highest level of trust and integrity with our clients.</p>
        <a className="hero-card__link" href="#read2">THE BENEFITS</a>
      </div>
    </article>

    <article className="hero-card">
      <div className="hero-card__media">
        <img src={gallery3} alt="Green Building" />
        <button className="hero-card__play" aria-hidden="true">▶</button>
      </div>
      <div className="hero-card__body">
        <h4>The Green Building</h4>
        <p>Green construction refers to resource-efficient design and processes throughout a building's life cycle.</p>
        <a className="hero-card__link" href="#read3">THE PROGRESS</a>
      </div>
    </article>
  </div>

  {/* small slide controls (dots) - optional, keeps your current logic) */}
  <div className="hero-banner__dots">
    {slides.map((_, index) => (
      <button
        key={index}
        className={`dot ${index === current ? "active" : ""}`}
        onClick={() => setCurrent(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>




      {/* WHO WE ARE Section */}
      <section className="who-we-are">
        <div className="who-we-are__container">
          <div className="who-we-are__header">
            <h2 className="who-we-are__subtitle">WHO WE ARE</h2>
            <div className="who-we-are__divider"></div>
            <h1 className="who-we-are__title">
              Building trust through innovation and integrity.
            </h1>
          </div>

          <div className="who-we-are__content">
            <div className="who-we-are__text-content">
              <p>
                At Four Links, we believe in shaping skylines and creating
                spaces that inspire. Our team of dedicated professionals brings
                decades of experience, blending modern design with engineering
                excellence to deliver unmatched quality.
              </p>
              <p>
                Our success is built on collaboration, innovation, and a
                commitment to sustainability — ensuring every project leaves a
                lasting legacy for generations to come.
              </p>
              <button className="who-we-are__button">Learn More</button>
            </div>

            <div className="who-we-are__image">
              <img src={gallery3} alt="Our team" />
            </div>
          </div>
        </div>
      </section>


{/* =====================
     WHY CHOOSE US SECTION
====================== */}
<section className="why-choose-classic">
  <div className="why-choose-classic__container">
    <h2 className="why-choose-classic__title">
      WHY CHOOSE US
      <span className="why-choose-classic__underline"></span>
    </h2>

    {/* Row 1: Text Left, Image Right */}
    <div className="wcc-row">
      <div className="wcc-text">
        <h3>On-Time Delivery</h3>
        <p>
          We ensure every project is completed within the agreed timeframe through meticulous planning and
          continuous progress tracking, so you can rely on our punctuality and commitment.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
          alt="On-Time Delivery"
        />
      </div>
    </div>

    {/* Row 2: Image Left, Text Right */}
    <div className="wcc-row wcc-row--reverse">
      <div className="wcc-text">
        <h3>Quality of Work</h3>
        <p>
          Our meticulous approach and use of high-quality materials ensure exceptional craftsmanship at every stage. 
          Each project is executed with precision and care, creating results that stand the test of time.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop"
          alt="Quality of Work"
        />
      </div>
    </div>

    {/* Row 3: Text Left, Image Right */}
    <div className="wcc-row">
      <div className="wcc-text">
        <h3>Quality Products</h3>
        <p>
          Our commitment to quality begins with the materials we choose. 
          From structure to finish, we source only trusted, high-performance products that ensure durability, beauty, and long-term value.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
          alt="Quality Products"
        />
      </div>
    </div>

    {/* Row 4: Image Left, Text Right */}
    <div className="wcc-row wcc-row--reverse">
      <div className="wcc-text">
        <h3>Space-Saving Plans & Designs</h3>
        <p>
          We create innovative, space-efficient designs that make the most of every square foot. 
          Our approach blends functionality, comfort, and modern aesthetics to deliver spaces that feel open, 
          practical, and beautifully designed.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1503594384566-461fe158e797?w=800&h=600&fit=crop"
          alt="Space Saving Plans"
        />
      </div>
    </div>

    {/* Row 5: Text Left, Image Right */}
    <div className="wcc-row">
      <div className="wcc-text">
        <h3>Qualified Staff</h3>
        <p>
          With a team of qualified engineers, designers, and project managers, we combine technical skill with creative 
          vision to bring every idea to life. Our professionals work collaboratively to ensure each project is completed 
          with precision, safety, and excellence.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
          alt="Qualified Staff"
        />
      </div>
    </div>

    {/* Row 6: Image Left, Text Right */}
    <div className="wcc-row wcc-row--reverse">
      <div className="wcc-text">
        <h3>Reliable Value</h3>
        <p>
          We blend cost-efficiency with uncompromising quality to deliver results that stand the test of time. 
          Every project is crafted to provide lasting value, ensuring our clients receive excellence within their budget.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=800&h=600&fit=crop"
          alt="Reliable Value"
        />
      </div>
    </div>

    {/* Row 7: Text Left, Image Right */}
    <div className="wcc-row">
      <div className="wcc-text">
        <h3>Strong & Assured</h3>
        <p>
          Every project receives our full attention and commitment — from concept to completion — because your vision is our priority. 
          Our hands-on approach, continuous communication, and quality-driven mindset ensure outcomes that exceed expectations.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
          alt="Dedicated"
        />
      </div>
    </div>

    {/* Row 8: Image Left, Text Right */}
    <div className="wcc-row wcc-row--reverse">
      <div className="wcc-text">
        <h3>Warm & Customer-Centric</h3>
        <p>
          We believe in open communication, transparency, and personalized service, ensuring a seamless experience for every client. 
          By understanding each client’s unique goals, we deliver tailored solutions with care, professionalism, and attention to detail.
        </p>
        <a href="#learn-more" className="wcc-btn">Learn More</a>
      </div>
      <div className="wcc-image">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
          alt="Customer Friendly"
        />
      </div>
    </div>
  </div>
</section>


      {/* WHAT WE DO Section */}
      <section className="what-we-do">
        <div className="what-we-do__container">
          <div className="what-we-do__header">
            <h2 className="what-we-do__subtitle">WHAT WE DO</h2>
            <h1 className="what-we-do__title">
              Where Expertise Meets Impact
            </h1>
            <p className="what-we-do__description">
              From construction to renovation, our expertise spans vital sectors—driving innovation, 
              delivering results, and building what matters most to communities across the region.
            </p>
          </div>

          <div className="what-we-do__grid">
            {services.map((service) => (
              <div key={service.id} className="what-we-do__card">
                <div className="what-we-do__card-image">
                  <img
                    src={service.image}
                    alt={service.title}
                  />
                  <div className="what-we-do__card-overlay">
                    <h3 className="what-we-do__card-title">{service.title}</h3>
                    <div className="what-we-do__card-arrow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* --- READY TO WORK TOGETHER SECTION (LEFT CONTENT, RIGHT GEOMETRY) --- */}
 {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-left">
              <h2 className="cta-title">Ready to work together?</h2>
              <p className="cta-subtitle">
                Whether you have a project in mind and you're looking for a reliable construction partner
                or you're looking to take the next step in your career, we want to hear from you!
              </p>

              <div className="cta-buttons">
                <a href="/contact" className="cta-btn cta-btn--primary">
                  BUILD A PROJECT WITH US
                </a>
                {/* <a href="/careers" className="cta-btn cta-btn--outline">
                  BUILD A CAREER WITH US
                </a> */}
              </div>
            </div>

            <div className="cta-right" aria-hidden="true">
              <div className="shape shape--pale" />
              <div className="shape shape--gold" />
              <div className="shape shape--small" />
              <div className="shape shape--green" />
            </div>
          </div>
        </div>
      </section>





      {/* EXPERIENCE SECTION */}
      {/* <section className="experience">
        <div className="experience__container">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience__card">
              <img src={exp.image} alt={exp.title} />
              <h3>{exp.title}</h3>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}



