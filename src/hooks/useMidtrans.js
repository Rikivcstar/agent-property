import { useEffect, useState } from "react";

export const useMidtrans = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Midtrans Snap Script
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "YOUR_CLIENT_KEY_HERE"; 

    let script = document.querySelector(`script[src="${midtransScriptUrl}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = midtransScriptUrl;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  const pay = (token, { onSuccess, onPending, onError, onClose }) => {
    if (window.snap) {
      window.snap.pay(token, {
        onSuccess: (result) => onSuccess?.(result),
        onPending: (result) => onPending?.(result),
        onError: (result) => onError?.(result),
        onClose: () => onClose?.(),
      });
    } else {
      console.error("Midtrans Snap is not loaded yet");
    }
  };

  return { isLoaded, pay };
};
