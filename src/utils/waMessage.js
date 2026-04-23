const AGENT_WA = "6288221975726";

export const buildWAMessage = ({ userName, phone, message, propertyName, price, url }) => {
  const lines = [
    `Halo Admin BobsProperties, saya *${userName}* (${phone}).`,
    ``,
    `Saya tertarik dengan properti ini:`,
    `*${propertyName}* - *${price}*`,
    ``,
    `Lihat di: ${url}`,
    ``,
    `Pesan saya: ${message}`,
  ];

  const text = lines.join("\n");
  return `https://wa.me/${AGENT_WA}?text=${encodeURIComponent(text)}`;
};
