import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "@/public/svgs/icons";
import Backdrop from "@/components/Backdrop";
import styles from "./Modal.module.scss";

export default function Modal({ display, close, children, title }) {
  useEffect(() => {
    if (display) {
      document.querySelector("html").style.overflow = "hidden";
    }
    if (!display) {
      document.querySelector("html").style.removeProperty("overflow");
    }
  }, [display]);

  return (
    <AnimatePresence>
      {display && (
        <>
          <Backdrop close={close} />
          <motion.div
            key={display}
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1 }}
            exit={{
              scale: 0.4,
              opacity: 0,
              transition: { type: "tween", duration: 0.2 },
            }}
            className={styles.container}
          >
            <div className={styles.header}>
              <h1>{title}</h1>
              <Close onClick={close} />
            </div>
            <div className={styles.body}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
