import { useState } from "react";
import { motion } from "framer-motion";
import { properties, propertyTypes } from "../../data/properties";
import PropertyCard from "./PropertyCard";
import { Diamond } from "lucide-react";

export default function PropertySection({ onInquire }) {
  const [activeType, setActiveType] = useState("Semua");

  const filtered = activeType === "Semua"
    ? properties
    : properties.filter((p) => p.type === activeType);

  return (
    <section id="properties" className="py-32" style={{ background: "#0a0908" }}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Diamond size={14} className="text-[#D4AF37]" />
            <span className="text-gold uppercase tracking-widest text-xs font-semibold">
              Koleksi Mahakarya
            </span>
            <Diamond size={14} className="text-[#D4AF37]" />
          </div>
          <h2 className="font-medium text-4xl lg:text-5xl text-[#ebe7e0] mb-6 font-serif">
            Properti <span className="text-gold-gradient italic">Eksklusif</span> Kami
          </h2>
          <p className="text-[#a8a39c] text-lg max-w-2xl mx-auto font-light">
            Eksplorasi mahakarya hunian dan investasi properti yang merepresentasikan gaya hidup Anda.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-16 border-b border-[#D4AF37]/20 pb-4"
        >
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className="px-2 py-2 text-sm tracking-wide font-medium relative transition-colors duration-300 uppercase"
              style={{
                color: activeType === type ? "#D4AF37" : "#a8a39c"
              }}
            >
              {type}
              {activeType === type && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12"
        >
          {filtered.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              onInquire={onInquire}
              index={i}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-24 text-[#a8a39c] font-light">
            Kami sedang mengkurasi properti untuk kategori ini.
          </div>
        )}
      </div>
    </section>
  );
}
