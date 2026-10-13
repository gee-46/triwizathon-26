import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blurStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 24,
  blurStrength = 8,
  className = '',
  style = {}
}) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blurStrength}px)`
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1]
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
