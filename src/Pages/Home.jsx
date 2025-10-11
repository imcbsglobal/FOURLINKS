import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Home.scss';

// Banner background video
// import myVideo from '../assets/bannervideo.mp4';

// Office section media (make sure the filenames match exactly)

const videoUrl = "https://res.cloudinary.com/dvxrou1vc/video/upload/office_nf7huc.mp4";

// TAJ section video
// import tajVideo from '../assets/taj.mp4';

import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";

export default function Home() {
  // Background banner video controls
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Office section: toggle image → video
  const [showOfficeVideo, setShowOfficeVideo] = useState(false);
  const officeVideoRef = useRef(null);

  // Gallery state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonials state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const scrollToContent = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const toggleOfficeVideo = () => {
    setShowOfficeVideo(true);
    if (officeVideoRef.current) {
      officeVideoRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < images.length) setCurrentSlide(index);
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      text: "I really like the dresses from the Borcelle Boutique. Nice design, feminine color, soft and comfortable material. In addition, at an affordable price I can get a dress with good quality like this. Borcelle is special, thank you."
    },
    {
      id: 2,
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      text: "Absolutely love my purchase! The quality exceeded my expectations and the customer service was outstanding. I'll definitely be shopping here again."
    },
    {
      id: 3,
      name: "Jessica Miller",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
      text: "Beautiful designs and amazing fit! The attention to detail is impressive. Borcelle has become my go-to boutique for elegant dresses."
    },
    {
      id: 4,
      name: "Amanda Wilson",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop",
      text: "The experience was fantastic from start to finish. Every detail was perfect and the staff was incredibly helpful and friendly."
    },
    {
      id: 5,
      name: "Rachel Green",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop",
      text: "I've been a loyal customer for years. The quality never disappoints and the designs are always on trend. Highly recommended!"
    },
    {
      id: 6,
      name: "Sophie Anderson",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
      text: "Exceptional service and beautiful products. This boutique has exceeded all my expectations. Thank you for making me feel special!"
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <>
      {/* Background Banner Section */}
      <div className="video-banner">
      <video
  ref={videoRef}
  className="video-banner__background-video"
  autoPlay
  loop
  muted
  playsInline
>
  <source src={videoUrl} type="video/mp4" />
  Your browser does not support the video tag.
</video>

        <div className="video-banner__overlay" />

        <div className="video-banner__content">
          <div className="video-banner__text">
            <h1 className="video-banner__title">Luxury Living Spaces</h1>
            <p className="video-banner__subtitle">Experience tranquility in nature</p>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="video-banner__scroll"
          aria-label="Scroll down"
        >
          <div className="video-banner__scroll-circle">
            <ChevronDown size={24} />
          </div>
          <span className="video-banner__scroll-text">Scroll</span>
        </button>
      </div>

      {/* TAJ Hero Section */}
      <section className="taj-hero">
        <div className="taj-hero__container">
          <div className="taj-hero__logo">VAFA ACRES</div>
          
          <div className="taj-hero__content">
            <div className="taj-hero__divider taj-hero__divider--left"></div>
            <h1 className="taj-hero__title">WHERE YOUR HEART FINALLY FEELS AT HOME</h1>
            <div className="taj-hero__divider taj-hero__divider--right"></div>
          </div>

          <p className="taj-hero__subtitle">
            Surrounded by nature’s calm and the warmth of rustic charm, every moment here feels like coming home
            From sunrise to starlight, let our farmhouse remind you what it means to truly unwind
          </p>

          <div className="taj-hero__image-container">
            <div className="taj-hero__badge-container">
              <div className="taj-hero__badge taj-hero__badge--left">
                <h2 className="taj-hero__badge-title"></h2>
                <p className="taj-hero__badge-subtitle"></p>
                <p className="taj-hero__badge-years"></p>
              </div>
              
              <div className="taj-hero__ampersand">&</div>
              
              <div className="taj-hero__badge taj-hero__badge--right">
                <h2 className="taj-hero__badge-title"></h2>
                <p className="taj-hero__badge-subtitle"></p>
                <p className="taj-hero__badge-years"></p>
              </div>
              
              <p className="taj-hero__attribution"></p>
            </div>
            
    <video 
  className="taj-hero__image"
  autoPlay
  loop
  muted
  playsInline
>
  <source src={videoUrl} type="video/mp4" />
  Your browser does not support the video tag.
</video>
            
            <div className="taj-hero__lights"></div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <div className="gallery">
        <h2 className="gallery__title">GALLERY</h2>

        <div className="gallery__container">
          <div className="gallery__slider">
            <div
              className="gallery__track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="gallery__slide">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="gallery__image"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="gallery__nav gallery__nav--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            className="gallery__nav gallery__nav--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>

          <div className="gallery__dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`gallery__dot ${currentSlide === index ? 'gallery__dot--active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="subtitle">Customer</h2>
            <h1 className="title">TESTIMONIALS</h1>
          </div>

          <div className="testimonials-slider-wrapper">
            <div className="testimonials-slider">
              <div
                className="testimonials-track"
                style={{ transform: `translateX(-${currentTestimonial * (100 / 3)}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="quote-icon quote-left">"</div>
                    <div className="quote-icon quote-right">"</div>
                    
                    <div className="testimonial-image-wrapper">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="testimonial-image"
                      />
                    </div>

                    <div className="testimonial-content">
                      <p className="testimonial-text">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="testimonials-nav testimonials-nav--prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              ‹
            </button>

            <button
              className="testimonials-nav testimonials-nav--next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              ›
            </button>

            <div className="testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonials-dot ${currentTestimonial === index ? 'testimonials-dot--active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}