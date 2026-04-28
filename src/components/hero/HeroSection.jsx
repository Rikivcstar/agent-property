import { motion } from "framer-motion";
import { Search, ArrowRight, Building2, MapPin } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.9, ease: [0.25, 1, 0.25, 1] },
  }),
};

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-0"
      style={{ 
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#11100f" 
      }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex items-center justify-center min-h-screen">
        {/* Center: Text Content */}
        <div className="max-w-4xl py-12 lg:py-0 relative z-20 text-center flex flex-col items-center">
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-3 px-1 mb-8 border-l-2 border-[#D4AF37] pl-4"
          >
            <span className="text-[#ebe7e0] uppercase tracking-widest text-xs font-semibold">
              Pionir Prop-Tech & Luxury Real Estate
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-medium text-5xl lg:text-8xl leading-tight mb-8"
            style={{ color: "#ffffff" }}
          >
            Menemukan <br />
            <span className="text-gold-gradient italic pr-2">Mahakarya</span> <br />
            Masa Depan
          </motion.h1>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-[#e5e7eb] text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl font-light"
          >
            Memadukan asisten teknologi cerdas dengan kurasi properti kelas dunia. 
            Kami meredefinisi pengalaman Anda dalam menemukan hunian premium dan aset investasi terbaik.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
          >
            <motion.button
              onClick={() => navigate("/properties")}
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-gold-gradient text-[#11100f] text-sm tracking-wide font-bold uppercase transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Eksplorasi Properti
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <Link
              to="/about"
              className="flex items-center justify-center gap-3 px-10 py-5 text-sm tracking-wide font-bold uppercase text-white transition-all backdrop-blur-md"
              style={{ border: "1px solid #D4AF37" }}
            >
              Tentang Kami
            </Link>
          </motion.div>

          {/* Minimalist Stats */}
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 mt-16 pt-8 border-t border-[#D4AF37]/30 w-full"
          >
            <div className="text-center">
              <p className="font-medium text-4xl text-gold pb-1 font-serif">15<span className="text-xl">+</span></p>
              <p className="text-[#a8a39c] text-xs uppercase tracking-wider">Tahun Kurasi</p>
            </div>
            <div className="w-px h-10 bg-[#D4AF37]/30 hidden sm:block" />
            <div className="text-center">
              <p className="font-medium text-4xl text-gold pb-1 font-serif">Rp1.2<span className="text-xl">T+</span></p>
              <p className="text-[#a8a39c] text-xs uppercase tracking-wider">Nilai Transaksi</p>
            </div>
            <div className="w-px h-10 bg-[#D4AF37]/30 hidden sm:block" />
            <div className="text-center">
              <p className="font-medium text-4xl text-gold pb-1 font-serif">1.2<span className="text-xl">k+</span></p>
              <p className="text-[#a8a39c] text-xs uppercase tracking-wider">Klien Elit</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
