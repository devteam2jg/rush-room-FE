import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function FinalTimeRush() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => setCount(count - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  return (
    <motion.div
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        fontSize: '5rem',
        color: '#FF5722',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {count > 0 ? (
        <motion.span
          key={count}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {count}
        </motion.span>
      ) : (
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎉 종료 🎉
        </motion.span>
      )}
    </motion.div>
  );
}

export default FinalTimeRush;
