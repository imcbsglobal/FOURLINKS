import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Home.scss';

//  const videoUrl = "https://res.cloudinary.com/dvxrou1vc/video/upload/office_nf7huc.mp4";

import bannerVideo from "../assets/video.mp4";

import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";
/**
 * AnimatedNumber
 * - Will only start when:
 *    a) the element becomes visible (IntersectionObserver) AND
 *    b) the user has scrolled past the page position that existed at mount time (so refresh won't trigger),
 *       OR the user has interacted (wheel/touch/pointer/keyboard).
 * - Adds a brief pulse class once finished.
 */
function AnimatedNumber({ value, suffix = "", duration = 1200, format = (n) => n }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  const started = useRef(false);
  const finished = useRef(false);

  // Track whether the user has interacted (wheel/touch/pointer/keyboard)
  const userInteracted = useRef(false);

  // Capture initial scrollY on mount to detect later user scrolls
  const initialScrollY = useRef(0);

  useEffect(() => {
    initialScrollY.current = window.scrollY || window.pageYOffset || 0;
  }, []);

  // Listen for user interactions that should allow the animation to run
  useEffect(() => {
    function markInteracted() {
      if (!userInteracted.current) userInteracted.current = true;
    }

    function onKey(e) {
      const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Space', 'Home', 'End'];
      if (keys.includes(e.key)) markInteracted();
    }

    window.addEventListener('wheel', markInteracted, { passive: true });
    window.addEventListener('touchstart', markInteracted, { passive: true });
    window.addEventListener('pointerdown', markInteracted);
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', markInteracted);
      window.removeEventListener('touchstart', markInteracted);
      window.removeEventListener('pointerdown', markInteracted);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // animation runner
  const startCount = () => {
    if (started.current) return;
    started.current = true;
    const el = ref.current;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const from = 0;
    const to = value;
    const start = performance.now();
    const animate = (ts) => {
      const t = Math.min((ts - start) / duration, 1);
      const current = Math.round(from + (to - from) * easeOutCubic(t));
      setCount(current);
      if (t < 1) requestAnimationFrame(animate);
      else {
        setCount(to);
        if (!finished.current) {
          finished.current = true;
          if (el) {
            el.classList.add('where-we-work__stat-number--pulse');
            setTimeout(() => el.classList.remove('where-we-work__stat-number--pulse'), 700);
          }
        }
      }
    };
    requestAnimationFrame(animate);
  };

  // IntersectionObserver + scroll re-check logic
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer = null;

    const checkAndStartIfAllowed = () => {
      // element in viewport?
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom >= 0;

      // user scrolled since load?
      const scrolledSinceLoad = (window.scrollY || window.pageYOffset || 0) > initialScrollY.current;

      if (inView && (scrolledSinceLoad || userInteracted.current)) {
        startCount();
        if (observer) observer.unobserve(el);
        window.removeEventListener('scroll', onScroll);
      }
    };

    const onScroll = () => {
      checkAndStartIfAllowed();
    };

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // If user has already interacted OR scrolled since load -> start immediately
            const scrolledSinceLoad = (window.scrollY || window.pageYOffset || 0) > initialScrollY.current;
            if (scrolledSinceLoad || userInteracted.current) {
              startCount();
              if (observer) observer.unobserve(el);
            } else {
              // otherwise wait for actual user scroll (not page refresh)
              // add scroll listener to trigger when they scroll into it
              window.addEventListener('scroll', onScroll, { passive: true });
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    // In case user interacts (pointer/keyboard) after observer sets waiting, re-check
    const onInteractionRecheck = () => {
      checkAndStartIfAllowed();
    };
    window.addEventListener('pointerdown', onInteractionRecheck);
    window.addEventListener('wheel', onInteractionRecheck, { passive: true });
    window.addEventListener('touchstart', onInteractionRecheck, { passive: true });
    window.addEventListener('keydown', onInteractionRecheck);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onInteractionRecheck);
      window.removeEventListener('wheel', onInteractionRecheck);
      window.removeEventListener('touchstart', onInteractionRecheck);
      window.removeEventListener('keydown', onInteractionRecheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <div
      ref={ref}
      className="where-we-work__stat-number where-we-work__stat-number--animated"
      aria-hidden="false"
    >
      {format(count)}
      {suffix ? <span className="where-we-work__stat-suffix">{suffix}</span> : null}
    </div>
  );
}

// ---------------------- Banner headings + timing ----------------------
// Edit these to change the rotating headings and sweep speed


const LINE_DURATION_MS = 3600; // sweep duration in milliseconds

export default function Home() {
  // Background banner video controls
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // --- HERO BANNER STATE ---
const [heroIndex, setHeroIndex] = useState(0);
const heroHeadings = [
  "Building\nDreams That\nStand Tall",
  "Renovating\nSpaces,\nReinventing Lives",
  "Shaping the\nFuture with\nSteel and Glass",
  "Powering\nProgress with\nPrecision Engineering",
  "Constructing\nWarehouses That\nDrive Industries",
  "Maintaining\nExcellence,\nEvery Single Day"
];

// <-- ADD THIS: small/label headings used by the tabs & sweep (must exist before tab refs) -->
const bannerHeadings = [
  "Building Construction",
  "Villa Renovation",
  "Aluminium and Glass Works",
  "MEP Works",
  "Warehouse Construction",
  "General Maintenance"
];

// ----------------------- TABS: refs + underline measurement -----------------------
const tabsRef = useRef(null);
const tabButtonRefs = useRef([]);

// keep tabButtonRefs length in-sync with bannerHeadings
tabButtonRefs.current = bannerHeadings.map((_, i) => tabButtonRefs.current[i] ?? React.createRef());

useEffect(() => {
  let rafId = null;
  const elTabs = tabsRef.current;
  if (!elTabs) return;

  const updateUnderline = () => {
    const activeBtn = tabButtonRefs.current[heroIndex]?.current;
    if (!activeBtn) {
      elTabs.classList.remove('tabs--js-controlled');
      elTabs.style.removeProperty('--underline-left');
      elTabs.style.removeProperty('--underline-width');
      return;
    }

    const tabsRect = elTabs.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const leftPx = Math.round(btnRect.left - tabsRect.left + elTabs.scrollLeft);
    const widthPx = Math.round(btnRect.width);

    rafId = window.requestAnimationFrame(() => {
      elTabs.style.setProperty('--underline-left', `${leftPx}px`);
      elTabs.style.setProperty('--underline-width', `${widthPx}px`);
      elTabs.classList.add('tabs--js-controlled');
    });
  };

  // initial measurement
  updateUnderline();

  const onWin = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateUnderline);
  };

  window.addEventListener('resize', onWin);
  window.addEventListener('orientationchange', onWin);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onWin);
    window.removeEventListener('orientationchange', onWin);
  };
}, [heroIndex, bannerHeadings.length]);

// Auto-rotate (remove if you only want manual clicks)
useEffect(() => {
  const interval = setInterval(() => {
    setHeroIndex(prev => (prev + 1) % heroHeadings.length);
  }, 6000);
  return () => clearInterval(interval);
}, [heroHeadings.length]);


  // Office section: toggle image → video
  const [showOfficeVideo, setShowOfficeVideo] = useState(false);
  const officeVideoRef = useRef(null);

  // Gallery state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonials state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- WHAT WE DO section state & data ---
  const [activeTab, setActiveTab] = useState(0);
const services = [
  {
    id: 0,
    title: "Building Construction",
    images: [
      { src: gallery1, label: "Commercial Buildings" },
      { src: gallery2, label: "Residential Projects" },
      { src: gallery3, label: "Industrial Facilities" }
    ]
  },
  {
    id: 1,
    title: "Villa Renovation",
    images: [
      { src: gallery2, label: "Modern Villas" },
      { src: gallery4, label: "Classic Restoration" },
      { src: gallery5, label: "Luxury Upgrades" }
    ]
  },
  {
    id: 2,
    title: "Fitout / Interior Works",
    images: [
      { src: gallery1, label: "Office Interiors" },
      { src: gallery3, label: "Retail Spaces" },
      { src: gallery6, label: "Hospitality Design" }
    ]
  },
  {
    id: 3,
    title: "Aluminium and Glass Works",
    images: [
      { src: gallery4, label: "Curtain Walls" },
      { src: gallery1, label: "Window Systems" },
      { src: gallery7, label: "Glass Partitions" }
    ]
  },
  {
    id: 4,
    title: "MEP Works",
    images: [
      { src: gallery5, label: "Electrical Systems" },
      { src: gallery2, label: "Plumbing Solutions" },
      { src: gallery3, label: "HVAC Installation" }
    ]
  },
  {
    id: 5,
    title: "Warehouse Construction",
    images: [
      { src: gallery6, label: "Storage Facilities" },
      { src: gallery4, label: "Distribution Centers" },
      { src: gallery1, label: "Industrial Warehouses" }
    ]
  },
  {
    id: 6,
    title: "General Maintenance",
    images: [
      { src: gallery7, label: "Building Maintenance" },
      { src: gallery5, label: "Facility Management" },
      { src: gallery2, label: "Repair Services" }
    ]
  }
];


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
      role: "Happy Client",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
      text: "I really like the dresses from the Borcelle Boutique. Nice design, feminine color, soft and comfortable material. In addition, at an affordable price I can get a dress with good quality like this. Borcelle is special, thank you."
    },
    {
      id: 2,
      name: "Emily Davis",
      role: "Happy Client",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      text: "Absolutely love my purchase! The quality exceeded my expectations and the customer service was outstanding. I'll definitely be shopping here again."
    },
    {
      id: 3,
      name: "Jessica Miller",
      role: "Happy Client",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop",
      text: "Beautiful designs and amazing fit! The attention to detail is impressive. Borcelle has become my go-to boutique for elegant dresses."
    },
    {
      id: 4,
      name: "Amanda Wilson",
      role: "Happy Client",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop",
      text: "The experience was fantastic from start to finish. Every detail was perfect and the staff was incredibly helpful and friendly."
    },
    {
      id: 5,
      name: "Rachel Green",
      role: "Happy Client",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=300&fit=crop",
      text: "I've been a loyal customer for years. The quality never disappoints and the designs are always on trend. Highly recommended!"
    },
    {
      id: 6,
      name: "Sophie Anderson",
      role: "Happy Client",
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

  // ---------------------- Banner rotation + sweep state/effect ----------------------
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [lineTick, setLineTick] = useState(0); // used to retrigger sweep animation

  useEffect(() => {
  let mounted = true;
  let cancelled = false;

  const cycle = async () => {
    while (!cancelled && mounted) {
      // retrigger sweep animation
      setLineTick(t => t + 1);

      // wait half the line duration, then switch the headings while the sweep passes
      await new Promise((resolve) => setTimeout(resolve, Math.floor(LINE_DURATION_MS / 2)));
      if (!mounted || cancelled) break;

      // advance both the small banner index and the hero (big heading) index so they stay synced
      setCurrentBannerIndex((prev) => {
        const next = (prev + 1) % bannerHeadings.length;
        setHeroIndex(next); // keep hero in sync with the sweep
        return next;
      });

      // wait remaining half before next cycle
      await new Promise((resolve) => setTimeout(resolve, Math.ceil(LINE_DURATION_MS / 2)));
    }
  };

  cycle();

  return () => {
    mounted = false;
    cancelled = true;
  };
}, [bannerHeadings.length]); // rerun only if number of headings changes

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
    preload="auto"
  >
    <source src={bannerVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div className="video-banner__overlay" />

  <div className="video-banner__inner">
    <div className="video-banner__left">
 {/* Dynamic Main Headings */}
<div className="video-banner__heading-wrapper">
  {/* top yellow line (remounts when lineTick changes so animation replay) */}
  <div key={lineTick} className="video-banner__heading-line-top" />

  {/* small label under the line */}
  <div className="video-banner__small-label" aria-hidden="false">
    {bannerHeadings[currentBannerIndex]}
  </div>

  <h1
    className="video-banner__heading"
    aria-live="polite"
    style={{ '--hero-index': heroIndex }}
  >
    {heroHeadings.map((h, idx) => (
      <span
        key={idx}
        className={`video-banner__heading-line ${idx === heroIndex ? 'is-active' : ''}`}
      >
        {h.split('\n').map((line, i) => (
          <span key={i} className="video-banner__heading-line-part">{line}</span>
        ))}
      </span>
    ))}
  </h1>
</div>



      {/* Small labels + underline */}
     {/* Small labels + underline */}
<div

  className="video-banner__tabs"
  role="tablist"
  aria-label="Hero sections"
  ref={tabsRef}
>
  {/* TOP YELLOW LINE */}
  <div className="video-banner__overline" />

  {/* TAB BUTTONS */}
  {bannerHeadings.map((label, i) => (
    <button
      key={i}
      role="tab"
      aria-selected={heroIndex === i}
      ref={tabButtonRefs.current[i]}
      className={`video-banner__tab ${heroIndex === i ? 'active' : ''}`}
      onClick={() => setHeroIndex(i)}
    >
      {label}
    </button>
  ))}

  {/* BOTTOM YELLOW LINE */}
  <div className="video-banner__underline" />
</div>


    </div>

    {/* Play / Pause button */}
    <div className="video-banner__right">
      <button
        className="video-banner__playbtn"
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        onClick={togglePlayPause}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden focusable="false">
          <circle cx="12" cy="12" r="11" fill="rgba(255,255,255,0.08)" stroke="white" strokeWidth="1" />
          {isPlaying ? (
            <g transform="translate(8,6)">
              <rect x="0" y="0" width="3" height="12" fill="white" />
              <rect x="6" y="0" width="3" height="12" fill="white" />
            </g>
          ) : (
            <polygon points="9,6 9,18 18,12" fill="white" />
          )}
        </svg>
      </button>
    </div>
  </div>

  {/* Scroll Button */}
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


      {/* WHO WE ARE Section */}
      <section className="who-we-are">
        <div className="who-we-are__container">
          <div className="who-we-are__header">
            <h2 className="who-we-are__subtitle">WHO WE ARE</h2>
            <div className="who-we-are__divider"></div>
            <h1 className="who-we-are__title">
              When we focus on mutual success, everyone wins.
            </h1>
          </div>

          <div className="who-we-are__content">
            <div className="who-we-are__text-content">
              <p className="who-we-are__intro">
                The flexibility to mobilize the right people to deliver unique solutions, an unwavering focus to delivering value to your business bottom line and the capability to leverage innovation to meet emerging challenges and keep you at the fore. This is Fourlinks.
              </p>

              <p className="who-we-are__paragraph">
                As a company that is 100 percent employee-owned, we collaborate and innovate to help our partners thrive. Our culture of ownership drives your success.
              </p>

              <p className="who-we-are__paragraph">
                Whether you are in the buildings, civil, or industrial market, partnering with Fourlinks means you're gaining a proven, reliable and trusted full-service partner with a mobile network of more than 2,000 employees, experts and seasoned professionals across Canada, the United States, Australia and the Caribbean.
              </p>

              <p className="who-we-are__paragraph">
                From advanced digital construction technologies to innovative offsite modular manufacturing, to the cutting edge of sustainable construction, we lead the industry as we have for more than 100 years. We leverage the expertise from this vast experience to help our clients and partners build lasting legacies.
              </p>

              <button className="who-we-are__button">
                About Us
              </button>
            </div>

            <div className="who-we-are__stats-sidebar">
              <h3 className="who-we-are__about-title">ABOUT US</h3>

              <div className="who-we-are__stats-grid">
                <div className="who-we-are__stat-item">
                  <div className="who-we-are__stat-number">119</div>
                  <div className="who-we-are__stat-label">Years in Operation</div>
                </div>

                <div className="who-we-are__stat-item">
                  <div className="who-we-are__stat-number">$8.3B+</div>
                  <div className="who-we-are__stat-label">Annual Construction Volume</div>
                  <div className="who-we-are__stat-subtext">#11 Rank in ENR's list of Top 400 Contractors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE WE WORK Section */}
      <section className="where-we-work">
        <div className="where-we-work__container">
          <div className="where-we-work__header">
            <span className="where-we-work__label">Where We Work</span>
            <div className="where-we-work__divider"></div>
            <h2 className="where-we-work__title">
              Helping you transform communities across the globe.
            </h2>
          </div>

          <div className="where-we-work__locations-row">
            {["United States", "Canada", "Caribbean", "Australia"].map((loc) => (
              <div className="where-we-work__location-item" key={loc}>
                <h3 className="where-we-work__location-name">{loc}</h3>
              </div>
            ))}
          </div>

          <div className="where-we-work__content">
            <div className="where-we-work__map-content">
              <svg className="where-we-work__map" viewBox="0 0 300 400" aria-hidden>
                <g className="where-we-work__map-outline">
                  <path d="M 80 50 L 120 40 L 140 80 L 130 120 L 100 130 L 80 100 Z" />
                  <path d="M 60 100 L 110 90 L 140 110 L 135 160 L 90 170 L 50 140 Z" />
                  <path d="M 85 170 L 110 160 L 115 200 L 100 240 L 80 220 Z" />
                  <path d="M 200 280 L 225 275 L 230 305 L 210 310 Z" />
                </g>

                {/* Map Markers */}
                {[{ cx: 85, cy: 90 }, { cx: 95, cy: 155 }, { cx: 75, cy: 240 }, { cx: 215, cy: 290 }].map(
                  (m, i) => (
                    <React.Fragment key={i}>
                      <circle cx={m.cx} cy={m.cy} r="5" className="where-we-work__marker" />
                      <circle cx={m.cx} cy={m.cy} r="8" className="where-we-work__pulse">
                        <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
                        <animate
                          attributeName="opacity"
                          from="0.4"
                          to="0"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </React.Fragment>
                  )
                )}
              </svg>
            </div>

            <div className="where-we-work__info-content">
              <p className="where-we-work__description">
                Fourlinks ranks among the largest general contractors in the United States.
                No matter where or what you want to build, we mobilize the right experts and
                resources to drive value, deliver excellence and exceed your expectations.
              </p>

              <div className="where-we-work__stats">
                <div className="where-we-work__stat-item">
                  {/* Animated 100% */}
                  <AnimatedNumber
                    value={100}
                    suffix="%"
                    duration={900}
                    format={(n) => `${n}`}
                  />
                  <div className="where-we-work__stat-label">Employee Owned</div>
                </div>
                <div className="where-we-work__stat-item">
                  {/* Animated 1000+ */}
                  <AnimatedNumber
                    value={1000}
                    suffix="+"
                    duration={1400}
                    format={(n) => n >= 1000 ? `${n.toLocaleString()}` : `${n.toLocaleString()}`}
                  />
                  <div className="where-we-work__stat-label">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     <section className="what-we-do home-what-we-do" id="what-we-do">
  <div className="what-we-do__container">
    <div className="what-we-do__header">
      <h2 className="what-we-do__subtitle">WHAT WE DO</h2>
      <div className="what-we-do__underline"></div>
      <h1 className="what-we-do__title">
        Building the future through innovation and excellence.
      </h1>
    </div>

    {/* Tabs */}
    <div className="what-we-do__tabs" role="tablist" aria-label="Services">
      {services.map((service, index) => (
        <button
          key={service.id}
          type="button"
          role="tab"
          aria-pressed={activeTab === index}
          className={`what-we-do__tab ${activeTab === index ? "active" : ""}`}
          onClick={() => setActiveTab(index)}
        >
          {service.title}
        </button>
      ))}
    </div>

    {/* Content: Clean grid of image cards like screenshot */}
    <div className="what-we-do__tab-content" key={activeTab}>
      {services[activeTab].images.map((item, i) => (
        <div key={i} className="what-we-do__image-card">
          <img
            src={item.src}
            alt={item.label}
            className="what-we-do__card-image"
          />
          <div className="what-we-do__card-overlay">
            <h3 className="what-we-do__card-title">{item.label}</h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* =====================
          TESTIMONIALS SECTION
      ===================== */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="subtitle">OUR CLIENTS</h2>
            <h1 className="title">WHAT THEY SAY</h1>
            <span className="underline"></span>
          </div>

          <div className="testimonials-slider-wrapper">
            <div className="testimonials-slider">
              <div
                className="testimonials-track"
                style={{
                  transform: `translateX(-${currentTestimonial * (100 / 3)}%)`,
                }}
              >
                {testimonials.map((t) => (
                  <div key={t.id} className="testimonial-card" role="group" aria-roledescription="slide">
                    <div className="testimonial-quote">“</div>
                    <div className="testimonial-text">{t.text}</div>
                    <div className="testimonial-client">
                      <img src={t.image} alt={t.name} />
                      <div className="testimonial-info">
                        <h4>{t.name}</h4>
                        <p>{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="testimonials-nav prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button
              className="testimonials-nav next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              ›
            </button>

            <div className="testimonials-dots" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonials-dot ${
                    currentTestimonial === index ? "active" : ""
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
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

    </>
  );
}
