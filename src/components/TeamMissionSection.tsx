import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Code2, Globe } from 'lucide-react';

export const TeamMissionSection: React.FC = () => {
  const pillars = [
    {
      icon: <Award size={26} />,
      title: "TRIWIZATHON GLORY",
      desc: "Competing at Sanjay Ghodawat University Kolhapur with an unyielding ethos: build fearlessly, execute flawlessly."
    },
    {
      icon: <Zap size={26} />,
      title: "SYNERGISTIC MAGIC",
      desc: "Four wizards each mastering their craft. When backend, machine learning, security, and UI weave together, magic happens."
    },
    {
      icon: <Code2 size={26} />,
      title: "ZERO ORDINARY CODE",
      desc: "Every line of code is held to production caliber. Elegant architecture, sub-millisecond latencies, and cinematic craft."
    },
    {
      icon: <Globe size={26} />,
      title: "IMPACT AT SCALE",
      desc: "Solving real-world technological challenges with enchanted intelligence and human-centered design."
    }
  ];

  return (
    <section
      id="team-mission"
      aria-label="HORCRUX Mission & Arsenal"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--bg-emerald-deep)',
        padding: '6rem 1.5rem 7rem',
        borderTop: '1px solid rgba(197, 160, 89, 0.15)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.15)'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--gold-mid)',
              display: 'inline-block',
              marginBottom: '0.8rem'
            }}
          >
            ✦ THE COVENANT ✦
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--gold-light)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)'
            }}
          >
            OUR SACRED CHARTER
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.6rem'
          }}
        >
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: 'rgba(3, 11, 7, 0.6)',
                border: '1px solid var(--gold-border-subtle)',
                borderRadius: '14px',
                padding: '2rem 1.6rem',
                backdropFilter: 'blur(10px)',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div
                style={{
                  color: 'var(--gold-bright)',
                  marginBottom: '1.1rem'
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--text-parchment)',
                  marginBottom: '0.65rem'
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  lineHeight: 1.6,
                  color: 'var(--text-silver)'
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
