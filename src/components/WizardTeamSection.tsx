import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Palette, Lock, Github, Linkedin, Wand2, Flame } from 'lucide-react';

interface Wizard {
  name: string;
  title: string;
  house: string;
  houseColor: string;
  affinity: string;
  wand: string;
  spell: string;
  quote: string;
  skills: string[];
  icon: React.ReactNode;
}

const WIZARDS: Wizard[] = [
  {
    name: "GAUTAM N CHIPKAR",
    title: "CHIEF ARCHITECT & FULL-STACK ALCHEMIST",
    house: "SLYTHERIN",
    houseColor: "#2ecc71",
    affinity: "Distributed Systems & Engine Concurrency",
    wand: "12½” Elder Wood · Dragon Heartstring Core",
    spell: "Architecto Maxima",
    quote: "Turning complex systemic chaos into crystalline, unstoppable digital architecture.",
    skills: ["Next.js", "Python", "Docker", "PostgreSQL", "System Design"],
    icon: <Terminal size={22} />
  },
  {
    name: "FATHIMA RAMNA",
    title: "AI & NEURAL SORCERESS",
    house: "RAVENCLAW",
    houseColor: "#3498db",
    affinity: "Deep Learning & Predictive Arcana",
    wand: "11¾” Ebony · Phoenix Feather Core",
    spell: "Revelio Cognitio",
    quote: "Extracting profound strategic foresight from raw data through neural incantations.",
    skills: ["PyTorch", "NLP", "Computer Vision", "LLMs", "Scikit-Learn"],
    icon: <Cpu size={22} />
  },
  {
    name: "INTERFACE CONJURER",
    title: "CREATIVE TECHNOLOGIST & UI WIZARD",
    house: "GRYFFINDOR",
    houseColor: "#e74c3c",
    affinity: "Kinetic Micro-Animations & WebGL sorcery",
    wand: "11” Cherry Wood · Unicorn Hair Core",
    spell: "Lumos Interactiva",
    quote: "Crafting interfaces so fluid and immersive that the screen ceases to exist.",
    skills: ["Three.js", "Framer Motion", "Tailwind/CSS", "TypeScript", "Shader Art"],
    icon: <Palette size={22} />
  },
  {
    name: "CYBER WARDEN",
    title: "SECURITY WARD MASTER & DEVOPS ALCHEMIST",
    house: "HUFFLEPUFF",
    houseColor: "#f1c40f",
    affinity: "Cryptographic Wards & Zero-Trust Defense",
    wand: "13” Black Walnut · Thestral Tail Hair Core",
    spell: "Protego Diabolica",
    quote: "Forging impenetrable defenses where zero vulnerabilities can take root.",
    skills: ["Kubernetes", "Rust", "Zero Trust", "Cloudflare", "Penetration Testing"],
    icon: <Lock size={22} />
  }
];

export const WizardTeamSection: React.FC = () => {
  const [activeWizard, setActiveWizard] = useState<number | null>(null);

  return (
    <section
      id="wizards-section"
      aria-label="The Four Wizards of Horcrux"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--bg-abyss)',
        padding: '7rem 1.5rem 8rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 15%, rgba(14, 58, 38, 0.28), transparent 70%), radial-gradient(ellipse 80% 60% at 50% 90%, rgba(6, 26, 17, 0.4), transparent 75%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.35rem 1rem',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid var(--gold-border-subtle)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold-mid)',
              marginBottom: '1.2rem'
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--gold-bright)' }} />
            <span>THE COVEN OF INNOVATORS</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              color: 'var(--text-parchment)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
              marginBottom: '1rem'
            }}
          >
            MEET THE FOUR WIZARDS
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              fontStyle: 'italic',
              color: 'var(--text-silver)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            United under the banner of Triwizathon 2026, four disciplines collide to forge magic beyond ordinary comprehension.
          </p>
        </div>

        {/* ═══ FOUR WIZARDS CARDS GRID ═══ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.85rem'
          }}
        >
          {WIZARDS.map((wiz, idx) => {
            const isHovered = activeWizard === idx;

            return (
              <motion.article
                key={wiz.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                onMouseEnter={() => setActiveWizard(idx)}
                onMouseLeave={() => setActiveWizard(null)}
                className="interactive-hover"
                style={{
                  position: 'relative',
                  background: isHovered ? 'var(--card-glass-hover)' : 'var(--card-glass)',
                  border: isHovered
                    ? '1px solid var(--gold-border-bright)'
                    : '1px solid var(--gold-border-subtle)',
                  borderRadius: '16px',
                  padding: '2.2rem 1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isHovered
                    ? '0 16px 45px rgba(0, 0, 0, 0.85), 0 0 28px rgba(212, 175, 55, 0.25)'
                    : '0 10px 30px rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.3, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)'
                }}
              >
                {/* House & Order Accent Badge */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.4rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid var(--gold-border-subtle)',
                        color: 'var(--gold-bright)'
                      }}
                    >
                      {wiz.icon}
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        color: 'var(--gold-mid)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        background: 'rgba(5, 18, 12, 0.8)',
                        border: '1px solid rgba(197, 160, 89, 0.2)'
                      }}
                    >
                      HORCRUX #{idx + 1}
                    </span>
                  </div>

                  {/* Wizard Name & Role */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: 'var(--gold-light)',
                      marginBottom: '0.45rem',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {wiz.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-silver)',
                      marginBottom: '1.2rem',
                      lineHeight: 1.4
                    }}
                  >
                    {wiz.title}
                  </p>

                  {/* Wand & Signature Spell */}
                  <div
                    style={{
                      padding: '0.9rem',
                      background: 'rgba(2, 8, 5, 0.6)',
                      borderRadius: '10px',
                      border: '1px solid rgba(197, 160, 89, 0.14)',
                      marginBottom: '1.3rem',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: 'var(--gold-mid)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        marginBottom: '0.3rem'
                      }}
                    >
                      <Wand2 size={13} />
                      <span>WAND SPECS</span>
                    </div>
                    <div style={{ color: 'var(--text-parchment)', fontSize: '0.8rem' }}>
                      {wiz.wand}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: 'var(--gold-bright)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        marginTop: '0.6rem',
                        marginBottom: '0.2rem'
                      }}
                    >
                      <Flame size={13} />
                      <span>SIGNATURE SPELL</span>
                    </div>
                    <div style={{ color: 'var(--gold-light)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                      "{wiz.spell}"
                    </div>
                  </div>

                  {/* Philosophy Quote */}
                  <blockquote
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.98rem',
                      fontStyle: 'italic',
                      lineHeight: 1.55,
                      color: 'var(--text-silver)',
                      marginBottom: '1.4rem'
                    }}
                  >
                    “{wiz.quote}”
                  </blockquote>
                </div>

                {/* Spellcraft / Skills Tags */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      marginBottom: '1.25rem'
                    }}
                  >
                    {wiz.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 500,
                          padding: '0.22rem 0.6rem',
                          borderRadius: '6px',
                          background: 'rgba(212, 175, 55, 0.08)',
                          color: 'var(--gold-mid)',
                          border: '1px solid rgba(197, 160, 89, 0.18)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Archival Links */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '0.65rem',
                      paddingTop: '0.9rem',
                      borderTop: '1px solid rgba(197, 160, 89, 0.15)'
                    }}
                  >
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${wiz.name}'s GitHub`}
                      className="interactive-hover"
                      style={{
                        color: 'var(--text-silver)',
                        transition: 'color 0.2s ease',
                        padding: '0.3rem'
                      }}
                    >
                      <Github size={17} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${wiz.name}'s LinkedIn`}
                      className="interactive-hover"
                      style={{
                        color: 'var(--text-silver)',
                        transition: 'color 0.2s ease',
                        padding: '0.3rem'
                      }}
                    >
                      <Linkedin size={17} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
