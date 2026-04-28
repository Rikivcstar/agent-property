import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, Send, MapPin, Building } from "lucide-react";
import { buildWAMessage } from "../../utils/waMessage";

export default function WhatsAppModal({ isOpen, onClose, property }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Generate WA URL and open in new tab
    const url = buildWAMessage({
      userName: data.name,
      phone: data.phone,
      message: data.message || "Tolong berikan informasi lebih lanjut.",
      propertyName: property?.name,
      price: property?.price,
      url: window.location.href
    });
    window.open(url, "_blank");
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-[#0a0908]/85 backdrop-blur-md transition-opacity"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-50 w-full max-w-lg transform overflow-hidden bg-[#11100f] border border-[#D4AF37]/30 text-left shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#11100f] shadow-gold/5">
                  {/* Header */}
                  <div className="relative p-8 pb-6 border-b border-[#D4AF37]/20">
                    <button
                      onClick={onClose}
                      className="absolute top-6 right-6 text-[#a8a39c] hover:text-gold transition-colors"
                    >
                      <X size={20} strokeWidth={1.5} />
                    </button>
                    <h3 className="text-2xl font-serif text-[#ebe7e0] font-medium pr-10 mb-2">
                      Permintaan <span className="text-gold italic">Informasi</span>
                    </h3>
                    <p className="text-[#a8a39c] text-sm font-light">
                      Penasihat properti kami akan segera menghubungi Anda.
                    </p>
                  </div>

                  {/* Property Info Snippet */}
                  {property && (
                    <div className="px-8 py-5 bg-[#181614] border-b border-[#D4AF37]/10 flex items-center gap-4">
                      <div className="w-16 h-16 shrink-0 overflow-hidden border border-[#D4AF37]/20">
                        <img src={property.image} alt={property.name} className="w-full h-full object-cover grayscale opacity-80" />
                      </div>
                      <div>
                        <div className="text-[#ebe7e0] font-medium font-serif">{property.name}</div>
                        <div className="text-gold text-sm font-light mb-1">{property.price}</div>
                        <div className="flex items-center gap-1 text-[#a8a39c] text-xs">
                          <MapPin size={10} /> {property.location}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="p-8 pt-6">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">
                          Nama Lengkap *
                        </label>
                        <input
                          {...register("name", { required: "Nama diperlukan" })}
                          type="text"
                          className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] placeholder-[#a8a39c]/50 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                          placeholder="Masukkan nama Anda"
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1 font-light">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">
                          Nomor WhatsApp *
                        </label>
                        <input
                          {...register("phone", {
                            required: "Nomor WhatsApp diperlukan",
                            pattern: {
                              value: /^[0-9+\-\s]+$/,
                              message: "Format nomor tidak valid",
                            },
                          })}
                          type="tel"
                          className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] placeholder-[#a8a39c]/50 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                          placeholder="Contoh: 081234567890"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1 font-light">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest text-[#a8a39c] mb-2 font-semibold">
                          Pesan Khusus (Opsional)
                        </label>
                        <textarea
                          {...register("message")}
                          rows={3}
                          className="w-full bg-[#1A1816] border-b border-[#D4AF37]/40 px-4 py-3 text-[#ebe7e0] placeholder-[#a8a39c]/50 focus:outline-none focus:border-gold transition-colors font-light text-sm resize-none"
                          placeholder="Pertanyaan tambahan..."
                        />
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#D4AF37]/10 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 text-xs text-[#a8a39c] uppercase tracking-widest font-semibold hover:text-[#ebe7e0] transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-2.5 bg-gold-gradient text-[#11100f] text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-70"
                      >
                        Kirim Pesan
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
