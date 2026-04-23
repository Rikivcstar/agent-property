import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/hero/HeroSection";
import AboutSection from "../components/about/AboutSection";
import PropertySection from "../components/properties/PropertySection";
import StatsSection from "../components/stats/StatsSection";
import TestimonialSection from "../components/testimonials/TestimonialSection";
import WhatsAppModal from "../components/inquiry/WhatsAppModal";
import { useWhatsAppInquiry } from "../hooks/useWhatsAppInquiry";

export default function HomePage() {
  const { isModalOpen, selectedProperty, openInquiry, closeInquiry, submitInquiry } =
    useWhatsAppInquiry();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <PropertySection onInquire={openInquiry} />
        <TestimonialSection />
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
