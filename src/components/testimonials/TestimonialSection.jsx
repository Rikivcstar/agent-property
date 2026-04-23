import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "CEO, Tech Group",
    rating: 5,
    text: "Pendekatan mereka terhadap privasi dan kurasi sangat luar biasa. Saya menemukan properti yang sempurna tanpa publisitas yang tidak diinginkan.",
    property: "Villa Grand Bali",
  },
  {
    name: "Siti Rahayu",
    role: "Kolektor Seni",
    rating: 5,
    text: "BobsProperties mengerti estetika. Mereka bukan sekadar menjual rumah, melainkan mencocokkan gaya hidup dan apresiasi seni saya.",
    property: "Penthouse Menteng",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-32" style={{ background: "#181614" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-6 block">
            Testimoni Eksklusif
          </span>
          <h2 className="font-medium text-4xl lg:text-5xl text-[#ebe7e0] font-serif mb-6">
            Dipercaya Oleh <span className="text-gold-gradient italic">Visioner</span>
          </h2>
          <div className="w-12 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 1, 0.25, 1] }}
              className="relative p-10 bg-[#11100f]"
              style={{
                border: "1px solid rgba(212, 175, 55, 0.15)",
              }}
            >
              <Quote size={40} className="absolute top-8 right-8 text-[#D4AF37] opacity-10" />

              <div className="flex gap-1.5 mb-8">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-[#a8a39c] leading-loose mb-10 font-light italic">"{t.text}"</p>

              <div className="pt-6 border-t border-[#D4AF37]/20 flex justify-between items-end">
                <div>
                  <p className="text-[#ebe7e0] font-serif text-lg tracking-wide mb-1">{t.name}</p>
                  <p className="text-[#D4AF37] text-xs uppercase tracking-widest">{t.role}</p>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-[#a8a39c] border border-[#D4AF37]/30 px-3 py-1">
                  {t.property}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
