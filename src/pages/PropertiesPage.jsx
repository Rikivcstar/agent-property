import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PropertySection from "../components/properties/PropertySection";
import WhatsAppModal from "../components/inquiry/WhatsAppModal";
import { useWhatsAppInquiry } from "../hooks/useWhatsAppInquiry";
import { motion } from "framer-motion";

export default function PropertiesPage() {
  const { isModalOpen, selectedProperty, openInquiry, closeInquiry, submitInquiry } =
    useWhatsAppInquiry();

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
              Koleksi <span className="text-gold-gradient italic">Properti</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#a8a39c] text-lg max-w-2xl mx-auto font-light"
            >
              Daftar lengkap hunian dan aset investasi eksklusif yang dikurasi oleh BobsProperties.
            </motion.p>
          </div>
        </section>

        <PropertySection onInquire={openInquiry} />
      </main>
      <Footer />

      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={closeInquiry}
        property={selectedProperty}
        onSubmit={submitInquiry}
      />
    </>
  );
}
