import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InlineFeedback = ({ type = "success", message, isVisible, onClose, autoClose = 3000 }) => {
  useEffect(() => {
    if (isVisible && autoClose && type === "success") {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, onClose, type]);

  if (!isVisible) return null;

  const config = {
    success: {
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    error: {
      icon: AlertCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    info: {
      icon: Info,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
  };

  const { icon: Icon, color, bg, border } = config[type] || config.info;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-3 p-4 mt-4 text-[10px] tracking-[0.1em] uppercase font-bold rounded-none border backdrop-blur-md shadow-2xl ${bg} ${border} ${color}`}
      >
        <Icon size={14} className="shrink-0" />
        <span className="flex-1">{message}</span>
        {onClose && (
            <button onClick={onClose} className="hover:opacity-50 transition-opacity p-1">
                <X size={12} />
            </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default InlineFeedback;
