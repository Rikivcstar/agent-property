import { Building2, Phone, Mail, MapPin, Camera, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-24 pb-10" style={{ background: "#0a0908" }}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-[#D4AF37]/20 pb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <span
                className="font-medium text-2xl tracking-widest text-[#ebe7e0] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Bobs<span className="text-gold italic">Properties</span>
              </span>
            </Link>
            <p className="text-[#a8a39c] font-light leading-relaxed mb-8 flex-grow">
              Puncak dari keanggunan dan kemewahan. Kurasi hunian prestisius 
              yang mencerminkan kelas dan status Anda.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Camera, href: "#" },
                { icon: MessageCircle, href: "#" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/30 text-gold hover:bg-gold hover:text-[#11100f] transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#ebe7e0] font-serif text-lg tracking-wider mb-6">Eksplorasi</h4>
            <ul className="space-y-4">
              {[
                { label: "Beranda", path: "/" },
                { label: "Filosofi", path: "/about" },
                { label: "Koleksi", path: "/properties" }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} 
                     className="text-[#a8a39c] hover:text-gold text-sm transition-colors uppercase tracking-widest">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[#ebe7e0] font-serif text-lg tracking-wider mb-6">Penasihat Pribadi</h4>
            <ul className="space-y-5">
              <li>
                <a href="#" className="group flex items-start gap-4">
                  <MapPin size={18} className="text-gold mt-1" />
                  <span className="text-[#a8a39c] group-hover:text-[#ebe7e0] transition-colors leading-relaxed font-light font-sm">
                    Sudirman Central Business District (SCBD)<br />
                    Jakarta Selatan, 12190
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+6288221975726" className="group flex items-center gap-4">
                  <Phone size={18} className="text-gold" />
                  <span className="text-[#a8a39c] group-hover:text-[#ebe7e0] transition-colors font-light font-sm">
                    +62 882 2197 5726
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@bobsproperties.com" className="group flex items-center gap-4">
                  <Mail size={18} className="text-gold" />
                  <span className="text-[#a8a39c] group-hover:text-[#ebe7e0] transition-colors font-light font-sm">
                    contact@bobsproperties.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#a8a39c] text-xs font-light tracking-wide uppercase">
          <p>© {new Date().getFullYear()} BobsProperties. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-gold transition-colors">Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
