import { useEffect, useState } from "react";
import RollingIntro from "@/components/RollingIntro";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = stored !== "light";
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-nav-wrap")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 },
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    const heroEl = document.querySelector(".hero-immediate");
    heroEl?.classList.add("visible");

    return () => observer.disconnect();
  }, [showIntro]);

  const handleIntroComplete = () => setShowIntro(false);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <div className="bg-background min-h-screen overflow-x-hidden transition-colors duration-300">
      {showIntro && <RollingIntro onComplete={handleIntroComplete} />}

      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="content-wrap mobile-nav-wrap">
          <a href="#" className="site-logo">
            vikram<span>.</span>
          </a>

          <div className="nav-right">
            <nav className="desktop-links" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="theme-pill" onClick={toggleTheme} aria-label="Toggle theme">
              <span>{isDark ? "☀️" : "🌙"}</span>
              <span className="theme-label">{isDark ? "Light" : "Dark"}</span>
            </button>

            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

          <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Projects />
        <Experience />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
