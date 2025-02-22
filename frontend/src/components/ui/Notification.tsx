"use client";
import { motion } from "framer-motion";

type NotificationProps = {
  message: string;
  onClose: () => void;
};

export function Notification({ message, onClose }: NotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-xl font-bold">
          &times;
        </button>
      </div>
    </motion.div>
  );
}
