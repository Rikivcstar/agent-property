import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AboutSection from "../components/about/AboutSection";
import StatsSection from "../components/stats/StatsSection";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-[#11100f] py-20 border-b border-[#D4AF37]/10">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-serif text-[#ebe7e0] mb-6"
            >
              Tentang <span className="text-gold-gradient italic">BobsProperties</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#a8a39c] text-lg max-w-2xl mx-auto font-light"
            >
              Dedikasi kami adalah menghadirkan standar baru dalam kemewahan real estate di Indonesia.
            </motion.p>
          </div>
        </section>

        <AboutSection />
        
        <section className="py-24 bg-[#0a0908]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80" 
                  alt="Office" 
                  className="w-full grayscale opacity-80 border border-[#D4AF37]/20"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-serif text-[#ebe7e0] mb-8">Visi & <span className="text-gold-gradient italic">Misi</span></h2>
                <p className="text-[#a8a39c] leading-loose mb-6 font-light text-lg">
                  Menjadi mitra terpercaya bagi individu sukses dalam mengelola portofolio properti mereka melalui kurasi yang presisi dan pelayanan yang nir-cela.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 mt-2 bg-gold flex-shrink-0" />
                    <p className="text-[#a8a39c] font-light">Kurasi ketat terhadap setiap unit properti untuk menjamin nilai investasi.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 mt-2 bg-gold flex-shrink-0" />
                    <p className="text-[#a8a39c] font-light">Menjaga kerahasiaan dan privasi klien di setiap tahapan transaksi.</p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-2 h-2 mt-2 bg-gold flex-shrink-0" />
                    <p className="text-[#a8a39c] font-light">Inovasi teknologi untuk kemudahan eksplorasi hunian masa depan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <StatsSection />
      </main>
      <Footer />
    </>
  );
}
