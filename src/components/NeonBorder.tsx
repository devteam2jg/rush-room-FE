import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function NeonBorder({ children }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!divRef.current) return;

    const { width, height, top, left } = divRef.current.getBoundingClientRect();

    setDimensions({ width, height, top, left });
  }, []);

  return (
    <div ref={divRef} className="container">
      <motion.svg
        className="svg-border"
        width={dimensions.width + 100}
        height={dimensions.height + 100}
        viewBox={`0 0 ${dimensions.width + 100} ${dimensions.height + 100}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="neon"
            filterUnits="userSpaceOnUse"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            {/* Filter definitions from the original code */}
          </filter>
        </defs>

        <svg className="neon" x={50} y={50}>
          <motion.path
            d={`M 0 0 h ${dimensions.width} v ${dimensions.height} h -${dimensions.width} v -${dimensions.height}`}
            stroke="lime"
            strokeWidth="3"
            animate={{
              pathLength: [0, 0.75],
              pathOffset: [0, 0.2],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop',
            }}
          />
        </svg>

        {children}
      </motion.svg>
    </div>
  );
}

export default NeonBorder;
