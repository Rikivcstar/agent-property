import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 15, suffix: "+", label: "Tahun Dedikasi", delay: 0 },
  { value: 1.2, suffix: "T+", label: "Kapitalisasi Transaksi", delay: 0.1 },
  { value: 98, suffix: "%", label: "Tingkat Kepuasan", delay: 0.2 },
  { value: 45, suffix: "+", label: "Penghargaan", delay: 0.3 },
];

function Counter({ from = 0, to, duration = 2, inView }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(from + (to - from) * easeOutQuart);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);

  return <span>{to % 1 === 0 ? Math.floor(count) : count.toFixed(1)}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 border-y border-[#D4AF37]/10" style={{ background: "#0a0908" }}>
      <div className="container mx-auto px-6 lg:px-12 relative overflow-hidden">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: stat.delay }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl text-gold font-serif mb-4 font-medium flex items-center justify-center">
                <Counter from={0} to={stat.value} inView={isInView} />
                <span className="text-2xl lg:text-4xl">{stat.suffix}</span>
              </div>
              <p className="text-[#a8a39c] text-xs uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
