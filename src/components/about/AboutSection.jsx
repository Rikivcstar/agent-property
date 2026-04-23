import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Diamond, Award, Users, Crosshair } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Prestise & Kualitas",
    desc: "Menghadirkan properti dengan standar kualitas internasional, meredefinisi kemewahan gaya hidup Anda.",
  },
  {
    icon: Crosshair,
    title: "Akurasi Kurasi",
    desc: "Setiap properti melalui tahap verifikasi ketat untuk memastikan nilai estetik dan kelayakan investasi.",
  },
  {
    icon: Users,
    title: "Layanan White-Glove",
    desc: "Dedikasi pelayanan personal 24/7 yang menjamin kenyamanan privasi dari awal hingga serah terima.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ background: "#11100f" }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.25, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <Diamond size={14} className="text-[#D4AF37]" />
              <span className="text-gold uppercase tracking-widest text-xs font-semibold">
                Filosofi BobsProperties
              </span>
            </div>

            <h2 className="font-medium text-4xl lg:text-5xl text-white mb-8 leading-tight">
              Standar Baru <br />
              Dalam <span className="text-gold-gradient italic">Kemewahan</span>
            </h2>

            <p className="text-[#a8a39c] text-lg leading-relaxed mb-6 font-light">
              BobsProperties didirikan dengan satu tujuan: memfasilitasi individu-individu sukses 
              untuk menemukan hunian yang merepresentasikan pencapaian hidup mereka.
            </p>

            <p className="text-[#a8a39c] leading-relaxed mb-10 font-light">
              Kami percaya bahwa properti premium bukan sekadar aset fisik, melainkan ruang dimana 
              karya dan legasi tercipta. Oleh karena itu, kami menerapkan pendekatan *"White-Glove Service"*
              untuk memastikan setiap transisi properti berjalan sempurna, eksklusif, dan tanpa cela.
            </p>

            <div className="pt-8 border-t border-[#D4AF37]/20">
              <img 
                src="https://images.unsplash.com/photo-1542406775-87bd1f912c7d?w=200&q=80" 
                alt="Signature CEO" 
                className="h-12 opacity-80 mix-blend-screen grayscale" 
              />
              <p className="text-[#ebe7e0] text-sm mt-3 uppercase tracking-widest font-semibold">Robert H., Chief Executive</p>
            </div>
          </motion.div>

          {/* Right: Values Cards */}
          <div className="relative">
            <motion.div style={{ y }} className="space-y-6 relative z-10">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 1, 0.25, 1] }}
                    className="glass-panel glass-panel-hover p-8 flex gap-6"
                  >
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 bg-[#D4AF37]/10" 
                         style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#ebe7e0] font-serif mb-2 tracking-wide">
                        {v.title}
                      </h3>
                      <p className="text-[#a8a39c] text-sm leading-relaxed font-light">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Soft decorative background box */}
            <div className="absolute top-10 -right-10 w-[80%] h-[90%] border border-[#D4AF37]/20 z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
