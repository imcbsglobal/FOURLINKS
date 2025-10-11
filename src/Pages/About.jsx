// src/Pages/About.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./About.scss";

export default function About() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&h=800&fit=crop",
      color: "#f9c74f",
    },
    {
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1400&h=800&fit=crop",
      color: "#90be6d",
    },
    {
      image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1400&h=800&fit=crop",
      color: "#577590",
    },
    {
      image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1400&h=800&fit=crop",
      color: "#577590",
    },
    {
      image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1400&h=800&fit=crop",
      color: "#577590",
    },
  ];

  const highlights = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
      title: "EARTH-FRIENDLY RESORT WITH GORGEOUS VIEWS OF THE BANASURA",
      alt: "Couple enjoying scenic mountain and lake views"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      title: "ROOMS, COTTAGES AND VILLAS WITH PANORAMIC VIEWS OF THE EARTH, SKIES",
      alt: "Luxurious hotel room interior"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      title: "61 KEYS, 05 POOL VILLAS WITH PLUNGE POOLS, 43 WATERFRONT COTTAGES",
      alt: "Resort pool at sunset with palm trees"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      title: "LUXURY AMENITIES AND WORLD-CLASS HOSPITALITY",
      alt: "Resort pool at sunset with palm trees"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
      title: "EXPERIENCE THE BEAUTY OF NATURE IN COMFORT",
      alt: "Resort pool at sunset with palm trees"
    }
  ];


  const experiences = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      title: 'EXPERIENCE TOGETHERNESS',
      type: 'main'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
      title: 'TIME WITH NEAR AND DEAR',
      type: 'secondary'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      title: 'BONDS THAT BIND',
      type: 'secondary'
    }
  ];

  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section 
        className="banner" 
        style={{ backgroundColor: slides[current].color }}
      >
        <div className="banner__overlay">
          <div className="banner__image-container">
            <img
              src={slides[current].image}
              alt={`Slide ${current + 1}`}
              className="banner__image"
            />
          </div>

          {/* Navigation */}
          <div className="banner__controls">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? "active" : ""}`}
                onClick={() => setCurrent(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="decorative-icon">
              <svg viewBox="0 0 100 200" className="wine-glass-icon">
                <path
                  d="M30,20 Q30,15 35,15 L65,15 Q70,15 70,20 L65,60 Q50,80 50,100 L50,170 L35,170 Q30,170 30,175 Q30,180 35,180 L65,180 Q70,180 70,175 Q70,170 65,170 L50,170 L50,100 Q50,80 35,60 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <h2 className="about-title">About</h2>
            
            <p className="about-description">
              Updown is a beautiful 17th century former farmstead just outside Deal, Kent. 
              Along with Fig Tree Cottage, Gardener's Cottage and the Stables, the house has 
              been lovingly updated to provide a total of ten luxuriously appointed rooms. The 
              conservatory restaurant is open to the public on Monday to Saturday for lunch & 
              dinner and lunch on Sunday. Breakfast is open to the public every day.
            </p>
          </div>

          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" 
              alt="Updown restaurant conservatory with dining tables"
            />
          </div>
        </div>
      </section>

      <section className="highlights-section">
        <div className="highlights-container">
          <div className="highlights-header">
            <div className="header-line"></div>
            <h2 className="header-title">HIGHLIGHTS</h2>
          </div>

          <div className="highlights-intro">
            <p>
              Kerala's celebrated charm lies in its enchanting blend of natural beauty, rich cultural heritage, and warm hospitality. Embark on a journey to experience the magic of this captivating land, where every moment unfolds a story of sun-kissed beaches, lush greenery and delectable cuisine.
            </p>
          </div>

          <div className="highlights-scroll-container">
            {canScrollLeft && (
              <button 
                className="scroll-arrow scroll-arrow-left"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <div className="highlights-scroll-wrapper" ref={scrollRef}>
              <div className="highlights-scroll">
                {highlights.map((highlight) => (
                  <div key={highlight.id} className="highlight-card">
                    <div className="highlight-image-wrapper">
                      <img 
                        src={highlight.image} 
                        alt={highlight.alt}
                        className="highlight-image"
                      />
                    </div>
                    <h3 className="highlight-title">{highlight.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {canScrollRight && (
              <button 
                className="scroll-arrow scroll-arrow-right"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>
        </div>
      </section>


      <section className="luxury-experiences">
      <div className="container">
        <h1 className="section-title">EXCLUSIVE DEALS FOR MEMORABLE EXPERIENCES</h1>
        <div className="divider"></div>

        <div className="hero-card">
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop" 
              alt="Luxury pool with mountain view" 
            />
          </div>
          <div className="hero-content">
            <h2>EMBRACE LOVE IN LUXURY</h2>
            <p className="subtitle">(Luxury Honeymoon Package 2Nights & 3Days)</p>
            <p className="description">
              What better way is there to celebrate a couple togetherness and devotion than 
              with a luxury honeymoon package in Wayanad? Your holiday mood will be raised 
              by the scenic surroundings and pleasant weather at this location...
            </p>
            <button className="cta-button">KNOW MORE</button>
          </div>
        </div>

        <div className="experiences-grid">
          {experiences.map((exp) => (
            <div key={exp.id} className="experience-card">
              <div className="card-image">
                <img src={exp.image} alt={exp.title} />
              </div>
              <h3 className="card-title">{exp.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}