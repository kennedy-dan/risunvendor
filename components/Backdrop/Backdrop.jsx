import { motion } from "framer-motion";

export default function Backdrop({ close }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={close}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "100%",
        height: "150vh",
        backgroundColor: "rgb(0 0 0 / 75%)",
        // backdropFilter: "blur(3px)",
        zIndex: 1100,
      }}
    />
  );
}
