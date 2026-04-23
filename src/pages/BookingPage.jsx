import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { properties } from "../data/properties";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { buildWAMessage } from "../utils/waMessage";
import { MapPin, Building2, CreditCard, ChevronLeft, ShieldCheck } from "lucide-react";
import { useMidtrans } from "../hooks/useMidtrans";
import { useState } from "react";

export default function BookingPage() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));
  const { pay } = useMidtrans();
  const [bookingFee] = useState(10000000); // Rp 10.000.000 Fixed for demo
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSnap, setShowSnap] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#11100f] text-white">
        Properti tidak ditemukan. <Link to="/properties" className="text-gold ml-2 underline">Kembali</Link>
      </div>
    );
  }

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    try {
      // 1. Create Transaction on Backend
      const response = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: `BOOK-${Date.now()}`,
          amount: bookingFee,
          propertyName: property.name,
          customerDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.wa,
            address: data.address
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (result.token) {
        setIsProcessing(false);
        // 2. Open Midtrans Snap Pop-up
        pay(result.token, {
          onSuccess: (res) => {
            console.log("Payment Success:", res);
            handlePaymentSuccess();
          },
          onPending: (res) => {
            console.log("Payment Pending:", res);
            alert("Pembayaran tertunda. Silakan selesaikan pembayaran Anda.");
          },
          onError: (res) => {
            console.error("Payment Error:", res);
            alert("Terjadi kesalahan pada pembayaran.");
          },
          onClose: () => {
            console.log("User closed the popup");
          }
        });
      } else {
        throw new Error(result.message || "Gagal mendapatkan token transaksi");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Error: ${error.message}. (Pastikan Backend API sudah berjalan)`);
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWAConfirmation = () => {
    const waUrl = buildWAMessage({
      userName: property?.name, // Using property name as a placeholder or passing data
      phone: "CUSTOMER", // In real case we'd pass the actual data
      message: `SAYA TELAH MEMBAYAR BOOKING FEE UNTUK ${property.name}. Mohon segera diverifikasi.`,
      propertyName: property.name,
      price: property.price,
      url: window.location.href
    });
    window.open(waUrl, "_blank");
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-40 pb-20 bg-[#11100f]">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/20"
            >
              <ShieldCheck size={48} className="text-[#11100f]" />
            </motion.div>
            <h1 className="text-4xl font-serif text-[#ebe7e0] mb-4">Pembayaran Berhasil!</h1>
            <p className="text-[#a8a39c] mb-10 leading-relaxed">
              Selamat! Unit <strong>{property.name}</strong> telah berhasil diamankan untuk Anda. 
              Penasihat properti kami akan segera menghubungi Anda dalam waktu 1x24 jam untuk proses administrasi selanjutnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleWAConfirmation}
                className="px-8 py-3 bg-green-600 text-white text-sm font-semibold uppercase tracking-widest hover:bg-green-700 transition-all flex items-center justify-center gap-2"
              >
                Konfirmasi via WhatsApp
              </button>
              <Link to="/" className="px-8 py-3 border border-[#D4AF37] text-gold text-sm font-semibold uppercase tracking-widest hover:bg-gold/5 transition-all">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-[#0a0908]">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <Link to="/properties" className="inline-flex items-center gap-2 text-[#a8a39c] hover:text-gold transition-colors mb-10 text-sm uppercase tracking-widest">
            <ChevronLeft size={16} /> Kembali ke Properti
          </Link>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <div className="mb-12">
                <h1 className="text-4xl font-serif text-[#ebe7e0] mb-4">Pengamanan <span className="text-gold-gradient italic">Unit</span></h1>
                <p className="text-[#a8a39c] font-light">Lengkapi data Anda secara lengkap sesuai identitas resmi untuk proses reservasi unit properti.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Group */}
                <div className="glass-panel p-8 space-y-6">
                  <h3 className="text-xl font-serif text-gold flex items-center gap-3 border-b border-[#D4AF37]/20 pb-4 mb-6">
                    <Building2 size={20} /> Identitas Diri
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">Nama Lengkap (Sesuai KTP) *</label>
                      <input 
                        {...register("fullName", { required: "Nama lengkap wajib diisi" })}
                        className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] focus:outline-none focus:border-gold transition-colors"
                        placeholder="Contoh: Robert H. Wijaya"
                      />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">Nomor KTP (NIK) *</label>
                      <input 
                        {...register("nik", { required: "NIK wajib diisi", pattern: { value: /^[0-9]+$/, message: "NIK harus berupa angka" } })}
                        className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] focus:outline-none focus:border-gold transition-colors"
                        placeholder="16 Digit NIK"
                      />
                      {errors.nik && <p className="text-red-400 text-xs mt-1">{errors.nik.message}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">Email Aktif *</label>
                      <input 
                        {...register("email", { required: "Email wajib diisi", pattern: { value: /^\S+@\S+$/i, message: "Format email tidak valid" } })}
                        className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] focus:outline-none focus:border-gold transition-colors"
                        placeholder="email@anda.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">Nomor WhatsApp *</label>
                      <input 
                        {...register("wa", { required: "Nomor WA wajib diisi" })}
                        className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] focus:outline-none focus:border-gold transition-colors"
                        placeholder="0812xxxx"
                      />
                      {errors.wa && <p className="text-red-400 text-xs mt-1">{errors.wa.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">Alamat Lengkap *</label>
                    <textarea 
                      {...register("address", { required: "Alamat wajib diisi" })}
                      rows={3}
                      className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Alamat sesuai KTP atau domisili"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="flex flex-col gap-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" required className="mt-1 accent-gold" />
                    <span className="text-[#a8a39c] text-sm font-light leading-relaxed group-hover:text-[#ebe7e0] transition-colors">
                      Saya setuju bahwa Booking Fee sebesar Rp 10.000.000 bersifat mengikat untuk pengamanan unit selama 7 hari kalender dan akan dikurangkan dari harga jual final. Syarat dan ketentuan berlaku bagi pembatalan transaksi.
                    </span>
                  </label>

                  <button 
                    disabled={isProcessing}
                    type="submit"
                    className="flex items-center justify-center gap-4 w-full py-5 bg-gold-gradient text-[#11100f] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-70"
                  >
                    {isProcessing ? "Memproses..." : (
                      <>
                        <CreditCard size={20} />
                        Bayar Booking Fee
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                <div className="glass-panel p-8 border-gold">
                  <h3 className="text-xl font-serif text-[#ebe7e0] mb-6 flex items-center gap-3">
                    Ringkasan <span className="text-gold italic">Properti</span>
                  </h3>
                  
                  <div className="flex gap-6 mb-8">
                    <div className="w-24 h-24 overflow-hidden border border-[#D4AF37]/20 flex-shrink-0">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                      <p className="text-gold uppercase tracking-tighter text-[10px] font-bold mb-1">{property.type}</p>
                      <h4 className="text-[#ebe7e0] font-serif text-lg mb-2">{property.name}</h4>
                      <div className="flex items-center gap-2 text-[#a8a39c] text-xs">
                        <MapPin size={12} className="text-gold/50" />
                        {property.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#D4AF37]/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[#a8a39c] font-light">Harga Properti</span>
                      <span className="text-[#ebe7e0] font-medium">{property.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-gold">
                      <span className="font-light">Booking Fee (DP)</span>
                      <span className="font-bold text-xl font-serif">Rp 10.000.000</span>
                    </div>
                  </div>

                  <div className="mt-10 p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-start gap-4">
                    <ShieldCheck size={20} className="text-gold flex-shrink-0" />
                    <p className="text-[11px] text-[#a8a39c] leading-relaxed italic">
                      Dana yang Anda bayarkan dikelola secara aman melalui sistem escrow Payment Gateway resmi kami.
                    </p>
                  </div>
                </div>

                <div className="text-center p-6 border border-[#a8a39c]/10">
                  <p className="text-[#a8a39c] text-[10px] uppercase tracking-widest mb-2 font-bold italic">Terdaftar & Diawasi oleh</p>
                  <div className="flex justify-center gap-8 opacity-40 grayscale flex-wrap">
                    <span className="text-[#ebe7e0] font-serif text-xs px-2 py-1 border border-[#ebe7e0]/20">AREBI</span>
                    <span className="text-[#ebe7e0] font-serif text-xs px-2 py-1 border border-[#ebe7e0]/20">SIU-P4</span>
                    <span className="text-[#ebe7e0] font-serif text-xs px-2 py-1 border border-[#ebe7e0]/20">BI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
