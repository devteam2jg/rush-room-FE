import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { FiMousePointer } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

function TiltCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const nav = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const { width } = rect;
    const { height } = rect;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    setTimeout(() => {
      nav('/overview');
    }, 1500);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
          backgroundImage: 'url(images/home.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="absolute grid bg-white shadow-lg inset-4 place-content-center rounded-xl"
      >
        {/* <FiMousePointer
          style={{
            transform: 'translateZ(75px)',
          }}
          className="mx-auto text-4xl"
        /> */}
        <p
          style={{
            transform: 'translateZ(50px)',
            color: 'black',
          }}
          className="text-2xl font-bold text-center"
        >
          경매 살펴보기
        </p>
      </div>
    </motion.div>
  );
}

function Example() {
  return (
    <div
      className="grid w-full px-4 py-12 place-content-center text-slate-900"
      style={{
        background: 'linear-gradient(to bottom right, #282828, #222222)',
      }}
    >
      <TiltCard />
    </div>
  );
}

export default Example;
