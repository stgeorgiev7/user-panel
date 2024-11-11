import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export default function ModalWrapper(props: {
  isOpen: boolean;
  children: ReactNode;
}) {
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.75,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      transition: {
        duration: 0.3,
      },
    },
  };

  const childrenVariants = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "0vh",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {props.isOpen && (
        <motion.div
          className={`${
            props.isOpen ? "visible" : "hidden"
          } overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-2 flex justify-center items-center w-full md:inset-0 h-100% max-h-full bg-indigo-100/5 backdrop-blur-sm`}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            variants={childrenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {props.children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
