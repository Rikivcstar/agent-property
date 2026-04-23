import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Filosofi", href: "/about" },
  { label: "Koleksi", href: "/properties" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: (scrolled || location.pathname !== "/") ? "rgba(17, 16, 15, 0.95)" : "transparent",
          backdropFilter: (scrolled || location.pathname !== "/") ? "blur(20px)" : "none",
          borderBottom: (scrolled || location.pathname !== "/") ? "1px solid rgba(212, 175, 55, 0.15)" : "1px solid transparent",
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span
              className="font-medium text-2xl tracking-widest text-[#ebe7e0] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Bobs<span className="text-gold italic">Properties</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                  location.pathname === link.href ? "text-gold" : "text-[#a8a39c] hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+6288221975726"
              className="flex items-center gap-2 text-xs font-semibold text-[#ebe7e0] hover:text-gold transition-colors tracking-wider"
            >
              <Phone size={14} className="text-gold" />
              0882 2197 5726
            </a>
            <Link
              to="/properties"
              className="px-6 py-2.5 bg-gold-gradient text-[#11100f] text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105"
            >
              Konsultasi
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-gold hover:text-[#ebe7e0] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-30 md:hidden p-6"
            style={{
              background: "#11100f",
              borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
            }}
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-center text-xs tracking-[0.2em] font-semibold uppercase transition-all ${
                    location.pathname === link.href ? "text-gold" : "text-[#ebe7e0] hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="w-full h-px bg-[#D4AF37]/20 my-2" />
              <Link
                to="/properties"
                onClick={() => setMobileOpen(false)}
                className="w-full py-4 text-center bg-gold-gradient text-[#11100f] text-xs font-bold uppercase tracking-widest"
              >
                Konsultasi Sekarang
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
