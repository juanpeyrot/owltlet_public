import React from 'react';
import { motion } from 'framer-motion';

export const FormError = ({ message }: { message: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mt-2"
    >
      <p className="text-sm">{message}</p>
    </motion.div>
  );
};

