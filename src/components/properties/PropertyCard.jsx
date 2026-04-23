import { motion } from "framer-motion";
import { useTilt } from "../../hooks/useTilt";
import { MapPin, BedDouble, Bath, SquareActivity, ArrowRight, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ property, onInquire, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 5, scale: 1.02 });
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.25, 1] }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col bg-[#1A1816] cursor-pointer"
      style={{
        border: "1px solid rgba(212, 175, 55, 0.15)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Type Tag */}
        <span
          className="absolute top-4 left-4 px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold bg-[#11100f]/80 text-[#ebe7e0] backdrop-blur-sm border border-[#D4AF37]/30"
        >
          {property.type}
        </span>
        
        {/* Badge */}
        {property.badge && (
          <span
            className="absolute top-4 right-4 px-3 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-[#11100f] bg-gold"
          >
            {property.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="font-serif text-2xl text-gold mb-1">{property.price}</p>
          <h3 className="text-[#ebe7e0] font-light text-lg mb-2 line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-2 text-[#a8a39c] text-sm">
            <MapPin size={14} className="text-gold/70" />
            <span className="truncate font-light">{property.location}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-5 text-sm text-[#a8a39c] mb-6 pt-4 border-t border-[#D4AF37]/10 font-light">
          {property.beds > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} className="text-gold/70" />
              {property.beds} 
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} className="text-gold/70" />
              {property.baths} 
            </span>
          )}
          {property.area > 0 && (
            <span className="flex items-center gap-1.5">
              <SquareActivity size={14} className="text-gold/70" />
              {property.area} m²
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-3">
          <motion.button
            onClick={() => onInquire(property)}
            className="w-full flex items-center justify-between py-3 border border-[#D4AF37]/40 px-4 text-xs font-medium text-[#a8a39c] hover:border-gold hover:text-gold transition-colors duration-300 uppercase tracking-widest"
          >
            Tanya via WA
            <ArrowRight size={14} />
          </motion.button>
          
          <motion.button
            onClick={() => navigate(`/booking/${property.id}`)}
            className="w-full flex items-center justify-between py-3 bg-gold-gradient px-4 text-xs font-bold text-[#11100f] hover:brightness-110 transition-all duration-300 uppercase tracking-widest"
          >
            Amankan Unit (Booking)
            <CreditCard size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
