"use client";
import { useState, useEffect, useRef } from "react";
import {
  Anchor, Ship, Package, Warehouse, Truck, Globe, Layers,
  ShieldCheck, ArrowRight, Mail, X, CheckCircle,
  Award, Leaf, MapPin, Star, ChevronRight, Clock, Zap,
  Box, Navigation, Route, FileCheck, Container, Phone, Users
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarineCanvas from "@/components/MarineCanvas";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────
const CORE_SERVICES = [
  {
    icon: <Ship size={22}/>,
    title: "Freight Forwarding / Sea Freight",
    desc: "FCL & LCL ocean freight across all major global trade lanes. Full-service forwarding from origin pickup to destination delivery.",
    badge: "Core Service",
    color: "blue"
  },
  {
    icon: <FileCheck size={22}/>,
    title: "Custom Clearance",
    desc: "Expert customs brokerage ensuring smooth, compliant, and fast clearance at all major Indian ports and ICD locations.",
    badge: "Regulatory",
    color: "cyan"
  },
  {
    icon: <Warehouse size={22}/>,
    title: "Warehousing & FTWZ",
    desc: "Bonded warehousing, FTWZ handling, and general storage with real-time inventory management across strategic hubs.",
    badge: "Storage",
    color: "blue"
  },
  {
    icon: <Package size={22}/>,
    title: "Packing, Fumigation & Palletization",
    desc: "ISPM-15 certified fumigation, export-grade wooden packing, and professional palletization ensuring cargo safety for global shipments.",
    badge: "Value-Added",
    color: "gold"
  },
  {
    icon: <Layers size={22}/>,
    title: "3PL Business",
    desc: "End-to-end third-party logistics solutions covering procurement, distribution, fulfillment, and reverse logistics management.",
    badge: "3PL",
    color: "cyan"
  },
  {
    icon: <Truck size={22}/>,
    title: "Surface Transport",
    desc: "Pan-India road freight network with GPS-tracked vehicles for container movement, FTL, and LTL cargo across all states.",
    badge: "Domestic",
    color: "blue"
  },
  {
    icon: <Anchor size={22}/>,
    title: "Port Handling",
    desc: "Dedicated port operations team managing stevedoring, stuffing/de-stuffing, and container repositioning at all major seaports.",
    badge: "Port Ops",
    color: "cyan"
  },
  {
    icon: <Globe size={22}/>,
    title: "Project Cargo & Logistics",
    desc: "Heavy lift, over-dimensional, and break-bulk cargo handling for infrastructure and industrial project shipments worldwide.",
    badge: "Heavy Cargo",
    color: "gold"
  },
  {
    icon: <Container size={22}/>,
    title: "LCL Consolidation",
    desc: "Regular groupage and consolidation services for smaller shipments, offering cost-effective ocean transit with reliable weekly departures.",
    badge: "Consolidation",
    color: "blue"
  },
];

const EXPERTISE = [
  { icon: <Container size={18}/>, text: "LCL Consolidation", desc: "Expert groupage consolidation for cost-effective ocean shipments" },
  { icon: <Truck size={18}/>, text: "First Mile Service", desc: "Reliable origin pickup and pre-carriage to port of loading" },
  { icon: <FileCheck size={18}/>, text: "Export Custom Clearance", desc: "End-to-end export documentation and regulatory compliance" },
  { icon: <Warehouse size={18}/>, text: "FTWZ / Bonded Warehousing", desc: "Free Trade Warehousing Zone handling and bonded storage" },
  { icon: <Route size={18}/>, text: "Door-to-Door Delivery", desc: "Complete origin-to-destination supply chain management" },
  { icon: <Navigation size={18}/>, text: "Cargo Tracking", desc: "Real-time visibility and status updates on your shipments" },
];

const ACHIEVEMENTS = [
  {
    icon: <Leaf size={26}/>,
    title: "Major Castor Oil Exporter",
    desc: "One of India's significant exporters of castor oil managing end-to-end supply chain from Gujarat farms to global buyers across 40+ countries.",
    stat: "40+ Countries",
    color: "green"
  },
  {
    icon: <Box size={26}/>,
    title: "Agri Products Specialist",
    desc: "Extensive expertise in bulk agri-commodity handling  seeds, spices, pulses, and processed foods with full phytosanitary compliance and documentation.",
    stat: "5000+ Shipments",
    color: "gold"
  },
  {
    icon: <Award size={26}/>,
    title: "20+ Years of Excellence",
    desc: "Two decades of trusted freight forwarding expertise  building deep carrier relationships and proven port-level execution across every major Indian port.",
    stat: "Est. 2004",
    color: "blue"
  },
];

const STATS = [
  { num: "20+", label: "Years of Experience" },
  { num: "5000+", label: "Shipments Handled" },
  { num: "40+", label: "Countries Served" },
  { num: "98%", label: "On-Time Delivery" },
];

const SERVICE_TYPES = [
  "Sea Freight (FCL/LCL)",
  "Air Freight",
  "Custom Clearance",
  "Warehousing / FTWZ",
  "Project Cargo",
  "3PL Services",
  "Surface Transport",
  "Door-to-Door",
  "LCL Consolidation",
  "Packing & Fumigation",
  "Port Handling",
  "Other",
];

// ─── SCROLL REVEAL HOOK ──────────────────────────────────
function useScrollReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const {
      y = 50, opacity = 0, duration = 0.8,
      stagger = 0, ease = "power3.out",
      delay = 0, childSelector = null
    } = options;

    const targets = childSelector
      ? el.querySelectorAll(childSelector)
      : [el];

    gsap.fromTo(
      targets,
      { y, opacity, scale: options.scale || 1 },
      {
        y: 0, opacity: 1, scale: 1, duration, stagger, ease, delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
}

// ─── COMPONENT ───────────────────────────────────────────
export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });

  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const expertiseRef = useRef(null);
  const achieveRef = useRef(null);
  const ctaBannerRef = useRef(null);
  const contactRef = useRef(null);

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: -70, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
      );
      gsap.fromTo(heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.14, ease: "power3.out", delay: 0.25 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (quoteOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [quoteOpen]);

  // Scroll-based animations
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Stats — count-up style pop in
      gsap.fromTo(
        statsRef.current?.querySelectorAll(".stat-card"),
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, stagger: 0.1, ease: "back.out(1.4)",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" }
        }
      );

      // Services section header
      gsap.fromTo(
        servicesRef.current?.querySelector(".sec-header"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 85%" }
        }
      );

      // Service cards — staggered slide up
      gsap.fromTo(
        servicesRef.current?.querySelectorAll(".svc-card"),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.65, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 80%" }
        }
      );

      // Expertise header
      gsap.fromTo(
        expertiseRef.current?.querySelector(".sec-header"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: expertiseRef.current, start: "top 85%" }
        }
      );

      // Expertise cards — alternating sides
      const expCards = expertiseRef.current?.querySelectorAll(".exp-card");
      expCards?.forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: expertiseRef.current, start: "top 80%" }
          }
        );
      });

      // Achievements header + cards
      gsap.fromTo(
        achieveRef.current?.querySelector(".sec-header"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: achieveRef.current, start: "top 85%" }
        }
      );
      gsap.fromTo(
        achieveRef.current?.querySelectorAll(".achieve-card"),
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, stagger: 0.15, ease: "back.out(1.2)",
          scrollTrigger: { trigger: achieveRef.current, start: "top 82%" }
        }
      );

      // CTA Banner — zoom-in
      gsap.fromTo(
        ctaBannerRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ctaBannerRef.current, start: "top 85%" }
        }
      );

      // Contact section
      gsap.fromTo(
        contactRef.current?.querySelector(".sec-header"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: contactRef.current, start: "top 85%" }
        }
      );
      gsap.fromTo(
        contactRef.current?.querySelectorAll(".contact-card"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: contactRef.current, start: "top 80%" }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  const handleQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("access_key", "790c417d-b007-4768-aeb3-31648b8c332c");
      formData.append("name", form.name);
      formData.append("company", form.company);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("service", form.service);
      formData.append("message", form.message);
      formData.append("subject", `New Quote Request from ${form.name} (${form.company})`);
      formData.append("from_name", "Seatrans Logistics Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to submit quote request. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "Failed to connect to server. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <>
      <MarineCanvas />

      {/* ── BG ── */}
      <div className="page-bg" aria-hidden="true">
        <div className="bg-orb bg-orb-1"/>
        <div className="bg-orb bg-orb-2"/>
        <div className="bg-orb bg-orb-3"/>
        <div className="bg-grid"/>
        <div className="bg-scan"/>
      </div>

      {/* ── HEADER ── */}
      <header ref={headerRef}>
        <div className="header-inner">
          <a className="logo" href="#">
            <img src="/logo/Seatrans%20Wallpaper%20Desktop2.png" alt="Seatrans Logo" className="logo-img" />
       
          </a>

          <nav className="hdr-nav" >
            <a href="#services" className="nav-link" style={{ textDecoration: "none" }}>Services</a>
            <a href="#expertise" className="nav-link" style={{ textDecoration: "none" }}>Expertise</a>
            <a href="#achievements" className="nav-link" style={{ textDecoration: "none" }}>Achievements</a>
            <a href="#contact" className="nav-link" style={{ textDecoration: "none" }}>Contact</a>
          </nav>

          <div className="hdr-actions">
            <div className="status-pill">
              <span className="dot"/>
              <span>Launching Soon</span>
            </div>
            <button className="btn-quote" onClick={() => setQuoteOpen(true)}>
              Request a Quote
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="content">

          {/* ── HERO ── */}
          <section className="hero" ref={heroRef}>
            <div className="badge">
              <Clock size={12}/> Website Under Progress
            </div>
            <div className="hero-exp-tag">
              <Award size={13}/> 20+ Years of Global Freight Expertise
            </div>
            <h1 className="hero-title">
              India's Trusted Partner for End-to-End Freight & Logistics
            </h1>
            <p className="hero-sub">
              Seatrans delivers complete supply chain solutions  sea freight, custom clearance, warehousing, 3PL, port handling, and project cargo. Our digital platform is launching soon.
            </p>
            <div className="hero-services-preview">
              {["Sea Freight", "Custom Clearance", "Warehousing", "3PL", "Port Handling"].map(s => (
                <span key={s} className="hero-service-chip">{s}</span>
              ))}
            </div>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setQuoteOpen(true)}>
                Request a Quote <ArrowRight size={16}/>
              </button>
              <a href="#services" className="btn-outline">
                Our Services <ChevronRight size={16}/>
              </a>
            </div>
          </section>

          {/* ── STATS ── */}
          <section ref={statsRef}>
            <div className="stats-bar">
              {STATS.map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CORE SERVICES ── */}
          <section id="services" ref={servicesRef}>
            <div className="sec-header">
              <div className="sec-tag"><Ship size={12}/> Core Business</div>
              <h2 className="sec-title">Our Services</h2>
              <p className="sec-sub">Comprehensive freight and logistics services built on two decades of industry experience across all major trade lanes.</p>
            </div>
            <div className="services-grid">
              {CORE_SERVICES.map((s) => (
                <div key={s.title} className={`svc-card svc-card--${s.color}`}>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-title">{s.title}</div>
                  <div className="svc-desc">{s.desc}</div>
                  <span className="svc-badge">{s.badge}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPERTISE ── */}
          <section id="expertise" ref={expertiseRef}>
            <div className="sec-header">
              <div className="sec-tag"><Zap size={12}/> Our Expertise</div>
              <h2 className="sec-title">What We Excel At</h2>
              <p className="sec-sub">Specialized capabilities that set Seatrans apart — backed by 20+ years of deep industry knowledge.</p>
            </div>
            <div className="expertise-grid-new">
              {EXPERTISE.map((e) => (
                <div key={e.text} className="exp-card">
                  <div className="exp-card-icon">{e.icon}</div>
                  <div className="exp-card-body">
                    <div className="exp-card-title">{e.text}</div>
                    <div className="exp-card-desc">{e.desc}</div>
                  </div>
                  <ArrowRight size={14} className="exp-card-arrow"/>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <section ref={ctaBannerRef}>
            <div className="cta-banner">
              <div className="cta-banner-glow"/>
              <div className="cta-banner-content">
                <div className="cta-banner-left">
                  <div className="cta-banner-tag"><Star size={12}/> Trusted Since 2004</div>
                  <h2 className="cta-banner-title">Ready to Ship Globally?</h2>
                  <p className="cta-banner-sub">Get a competitive freight quote from our expert team within 24 hours. We handle every lane, every commodity, every time.</p>
                </div>
                <div className="cta-banner-right">
                  <button className="btn-cta-main" onClick={() => setQuoteOpen(true)}>
                    Request a Quote <ArrowRight size={18}/>
                  </button>
                  <a href="#contact" className="btn-cta-sec">Talk to an Expert</a>
                </div>
              </div>
            </div>
          </section>

          {/* ── ACHIEVEMENTS ── */}
          <section id="achievements" ref={achieveRef}>
            <div className="sec-header">
              <div className="sec-tag"><Award size={12}/> Track Record</div>
              <h2 className="sec-title">Our Work & Achievements</h2>
              <p className="sec-sub">Milestones earned through two decades of dedicated service and deep trade expertise across India and beyond.</p>
            </div>
            <div className="achieve-row">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.title} className={`achieve-card achieve-card--${a.color}`}>
                  <div className="achieve-top">
                    <div className="achieve-icon-wrap">{a.icon}</div>
                    <span className="achieve-stat">{a.stat}</span>
                  </div>
                  <div className="achieve-title">{a.title}</div>
                  <div className="achieve-desc">{a.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CONTACT US ── */}
          <section id="contact" ref={contactRef}>
            <div className="sec-header">
              <div className="sec-tag"><Mail size={12}/> Get In Touch</div>
              <h2 className="sec-title">Contact Us</h2>
              <p className="sec-sub">Reach out to our logistics coordinators to discuss your shipping requirements.</p>
              <div className="contact-cta-wrap">
                <button className="btn-quote-contact" onClick={() => setQuoteOpen(true)}>
                  <span>Request a Quote</span>
                  <ArrowRight size={16}/>
                </button>
              </div>
            </div>
            
            <div className="contact-container">
              <div className="contact-card contact-card--ahmedabad contact-card--large" style={{ alignItems: "flex-start" }}>
                <div className="contact-icon"><MapPin size={20}/></div>
                <div className="contact-details">
                  <h4>Ahmedabad Office</h4>
                  <p style={{ lineHeight: "1.6", color: "var(--text-sec)" }}>
                    4th Floor, Office No. 419, North Plaza, Nr. 4D Square Mall, Visat-Gandhinagar Highway, Motera, Ahmedabad - 380005.
                  </p>
                  <a 
                    href="https://maps.google.com/?q=4th+Floor,+Office+No.+419,+North+Plaza,+Nr.+4D+Square+Mall,+Visat-Gandhinagar+Highway,+Motera,+Ahmedabad+-+380005"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "0.4rem", 
                      fontSize: "0.8rem", 
                      fontWeight: "700", 
                      marginTop: "0.8rem",
                      color: "var(--blue-dark)",
                      textDecoration: "none"
                    }}
                  >
                    <span>View on Google Maps</span> <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              <div className="contact-card contact-card--partners contact-card--large" style={{ alignItems: "flex-start" }}>
                <div className="contact-icon"><Users size={20}/></div>
                <div className="contact-details" style={{ width: "100%" }}>
                  <h4>Partner Contacts</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginTop: "0.4rem" }}>
                    <div style={{ borderBottom: "1px solid rgba(15,23,42,0.06)", paddingBottom: "0.5rem" }}>
                      <p style={{ fontWeight: "700", fontSize: "0.88rem", color: "var(--navy)" }}>Kandarp</p>
                      <p style={{ fontSize: "0.8rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.15rem" }}>
                        <a href="mailto:kandarp@seatransshipping.net">kandarp@seatransshipping.net</a>
                        <span style={{ color: "var(--text-muted)" }}>|</span>
                        <a href="tel:+919106202999">+91 91062 02999</a>
                      </p>
                    </div>
                    <div>
                      <p style={{ fontWeight: "700", fontSize: "0.88rem", color: "var(--navy)" }}>Lakshay </p>
                      <p style={{ fontSize: "0.8rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.15rem" }}>
                        <a href="mailto:lakshay@seatransshipping.net">lakshay@seatransshipping.net</a>
                        <span style={{ color: "var(--text-muted)" }}>|</span>
                        <a href="tel:+919898587515">+91 98985 87515</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-card contact-card--email contact-card--small" style={{ alignItems: "flex-start" }}>
                <div className="contact-icon"><Mail size={20}/></div>
                <div className="contact-details">
                  <h4>Email Address</h4>
                  <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.2rem" }}>Company Email</p>
                  <a href="mailto:Info@seatransshipping.net" style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--navy-mid)", display: "block", marginTop: "0.2rem" }}>
                    Info@seatransshipping.net
                  </a>
                </div>
              </div>
              <div className="contact-card contact-card--phone contact-card--small" style={{ alignItems: "flex-start" }}>
                <div className="contact-icon"><Phone size={20}/></div>
                <div className="contact-details">
                  <h4>Phone Number</h4>
                  <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.2rem" }}>General Hotline</p>
                  <a href="tel:+919898697515" style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--navy-mid)", display: "block", marginTop: "0.2rem" }}>
                    +91 98986 97515
                  </a>
                </div>
              </div>
              <div className="contact-card contact-card--hours-card contact-card--small" style={{ alignItems: "flex-start" }}>
                <div className="contact-icon"><Clock size={20}/></div>
                <div className="contact-details">
                  <h4>Business Hours</h4>
                  <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: "600", marginTop: "0.2rem" }}>Support Timing</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--navy-mid)", marginTop: "0.2rem" }}>
                    Monday - Saturday
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-sec)", marginTop: "0.1rem" }}>
                    09:30 AM - 06:30 PM (IST)
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-inner">
            <div className="footer-brand">
              <h4>SEATRANS LOGISTICS</h4>
              <p>Freight Forwarding · Custom Clearance · Warehousing · 3PL · Port Handling</p>
            </div>
            <div className="footer-locs">
              <div className="footer-loc"><MapPin size={13}/> Ahmedabad, India</div>
            
            </div>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Seatrans Logistics Pvt. Ltd. All rights reserved. · Website Under Development
          </div>
        </footer>
      </main>

      {/* ── QUOTE MODAL ── */}
      {quoteOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setQuoteOpen(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => { setQuoteOpen(false); setSubmitted(false); setSubmitError(""); }}>
              <X size={16}/>
            </button>

            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon"><CheckCircle size={28}/></div>
                <h3>Quote Request Received!</h3>
                <p>Our team will review your requirements and reach out within 24 business hours with a tailored freight quotation.</p>
                <button className="btn-primary" style={{marginTop:"0.5rem"}} onClick={() => { setQuoteOpen(false); setSubmitted(false); setSubmitError(""); }}>
                  Close <X size={15}/>
                </button>
              </div>
            ) : (
              <>
                <h2 className="modal-title">Request a Quote</h2>
                <p className="modal-sub">Fill in your shipment details and our freight experts will prepare a custom quote for you within 24 hours.</p>
                <form onSubmit={handleQuote}>
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Full Name *</label>
                      <input name="name" className="form-input" placeholder="John Smith" required
                        value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Company *</label>
                      <input name="company" className="form-input" placeholder="Your Company Ltd." required
                        value={form.company} onChange={(e) => setForm({...form, company: e.target.value})}/>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-input" placeholder="you@company.com" required
                        value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Phone</label>
                      <input name="phone" className="form-input" placeholder="+91 98XXX XXXXX"
                        value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})}/>
                    </div>
                    <div className="form-field full">
                      <label className="form-label">Service Required *</label>
                      <select name="service" className={`form-select ${form.service === "" ? "form-select-placeholder" : ""}`} required
                        value={form.service} onChange={(e) => setForm({...form, service: e.target.value})}>
                        <option value="">Select a service...</option>
                        {SERVICE_TYPES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="form-field full">
                      <label className="form-label">Shipment Details</label>
                      <textarea name="message" className="form-textarea" placeholder="Describe your cargo — origin, destination, weight, volume, commodity type..."
                        value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}/>
                    </div>
                  </div>
                  {submitError && (
                    <div style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.75rem", marginBottom: "0.25rem", fontWeight: "600", textAlign: "center" }}>
                      {submitError}
                    </div>
                  )}
                  <button type="submit" className="btn-submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Quote Request"} <ArrowRight size={16}/>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
