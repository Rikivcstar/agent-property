import { useState, useCallback } from "react";
import { buildWAMessage } from "../utils/waMessage";

export const useWhatsAppInquiry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const openInquiry = useCallback((property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProperty(null), 300);
  }, []);

  const submitInquiry = useCallback(
    ({ userName, phone, message }) => {
      if (!selectedProperty) return;

      const waUrl = buildWAMessage({
        userName,
        phone,
        message,
        propertyName: selectedProperty.name,
        price: selectedProperty.price,
        url: window.location.href,
      });

      window.open(waUrl, "_blank", "noopener,noreferrer");
      closeInquiry();
    },
    [selectedProperty, closeInquiry]
  );

  return { isModalOpen, selectedProperty, openInquiry, closeInquiry, submitInquiry };
};
