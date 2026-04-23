import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, ChevronRight, CreditCard, Landmark, QrCode } from "lucide-react";
import { useState, useEffect } from "react";

export default function MidtransMock({ isOpen, onClose, onPaymentSuccess, amount, propertyName }) {
  const [step, setStep] = useState("methods"); // methods, processing, success
  const [selectedMethod, setSelectedMethod] = useState(null);

  const methods = [
    { id: "va", name: "Virtual Account", icon: Landmark, desc: "BCA, Mandiri, BNI, BRI" },
    { id: "qris", name: "QRIS", icon: QrCode, desc: "Gopay, OVO, Dana, LinkAja" },
    { id: "cc", name: "Kartu Kredit", icon: CreditCard, desc: "Visa, Mastercard, JCB" },
  ];

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      onPaymentSuccess();
    }, 2500);
  };

  useEffect(() => {
    if (!isOpen) {
      setStep("methods");
      setSelectedMethod(null);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Snap Modal Mock */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-[400px] rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="bg-[#11100f] p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold rounded flex items-center justify-center">
                    <ShieldCheck size={20} className="text-[#11100f]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-tighter opacity-70 leading-none">BobsProperties</p>
                    <p className="text-sm font-bold">Secure Checkout</p>
                  </div>
                </div>
                <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                  <X size={20} />
                </button>
              </div>

              {/* Amount Summary */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Total Pembayaran</p>
                  <p className="text-xl font-bold text-gray-800">Rp {amount.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-[10px] uppercase font-bold">Order ID</p>
                  <p className="text-[10px] font-mono text-gray-500">BP-{Math.floor(Math.random() * 1000000)}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 min-h-[350px] flex flex-col">
                {step === "methods" && (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-gray-700 mb-4">Pilih Metode Pembayaran</p>
                    {methods.map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMethod(m.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                            selectedMethod === m.id ? "border-gold bg-gold/5 outline outline-1 outline-gold" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedMethod === m.id ? "bg-gold text-white" : "bg-gray-100 text-gray-500"}`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-bold text-gray-800">{m.name}</p>
                            <p className="text-[10px] text-gray-500">{m.desc}</p>
                          </div>
                          <ChevronRight size={16} className="text-gray-300" />
                        </button>
                      );
                    })}
                    
                    <div className="mt-8 pt-6">
                      <button
                        onClick={handlePay}
                        disabled={!selectedMethod}
                        className="w-full py-4 bg-[#11100f] text-white rounded-lg font-bold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Bayar Sekarang
                      </button>
                    </div>
                  </div>
                )}

                {step === "processing" && (
                  <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="font-bold text-gray-800 text-lg mb-2">Memproses Pembayaran</p>
                    <p className="text-gray-500 text-sm">Mohon tidak menutup halaman ini...</p>
                  </div>
                )}
              </div>

              {/* Secure Footer */}
              <div className="p-4 bg-gray-50 flex items-center justify-center gap-2 opacity-60">
                <ShieldCheck size={14} className="text-green-600" />
                <p className="text-[10px] text-gray-500 font-medium">Verified by Midtrans Secure Gateway</p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
