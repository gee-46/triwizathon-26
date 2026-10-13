import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  style?: React.CSSProperties;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  style = {}
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const yOffset = direction === 'top' ? -18 : 18;

  return (
    <span className={`blur-text-wrapper ${className}`} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.28em', ...style }}>
      {elements.map((el, i) => (
        <motion.span
          key={`${el}-${i}`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: yOffset }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.55,
            delay: (i * delay) / 1000,
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {el}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
