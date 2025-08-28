import { motion } from "framer-motion";

const Section = ({ id, children }) => {
  return (
    <motion.section
      id={id}
      className="min-h-screen flex items-center justify-center px-8"
      initial={{ opacity: 0, y: 50 }}              // mulai transparan + agak ke bawah
      whileInView={{ opacity: 1, y: 0 }}           // saat kelihatan, fade-in + naik
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}       // animasi hanya sekali, saat 20% section kelihatan
    >
      {children}
    </motion.section>
  );
};

export default Section;
