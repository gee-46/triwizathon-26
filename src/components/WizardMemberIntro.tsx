import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { WizardMemberData } from '../data/teamMembers';
import { BlurText } from './animations/BlurText';
import { ScrollReveal } from './animations/ScrollReveal';
import { Trophy, Award, Shield, Wand2, Mail, Github, Linkedin, Globe, Sparkles } from 'lucide-react';

interface WizardMemberIntroProps {
  member: WizardMemberData;
}

export const WizardMemberIntro: React.FC<WizardMemberIntroProps> = ({ member }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const [videoError, setVideoError] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Trigger entrance particle burst once when entering view
  useEffect(() => {
    if (isInView) {
      setShowSparkles(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      }
      const timer = setTimeout(() => setShowSparkles(false), 2400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const isLeft = member.entryDirection === 'left';
  const houseColor = member.houseColor || '#c0392b';
  const accentColor = member.accentColor || '#d4af37';

  return (
    <section
      ref={containerRef}
      id={`wizard-${member.id}`}
      aria-label={`${member.name} Character Introduction`}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--bg-abyss)',
        padding: '7rem 1.5rem 8rem',
        overflow: 'hidden',
        borderTop: '1px solid rgba(197, 160, 89, 0.16)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.16)'
      }}
    >
      {/* ═══ AMBIENT ATMOSPHERIC BACKGROUND ═══ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isLeft
            ? `radial-gradient(ellipse 65% 55% at 25% 45%, ${houseColor}26 0%, rgba(10, 35, 24, 0.25) 50%, transparent 75%)`
            : `radial-gradient(ellipse 65% 55% at 75% 45%, ${houseColor}26 0%, rgba(10, 35, 24, 0.25) 50%, transparent 75%)`,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}
      >
        {/* ═══ 1. CHARACTER VISUAL (LEFT FOR GAUTAM, RIGHT FOR AMRA) ═══ */}
        <div
          style={{
            order: isLeft ? 1 : 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Subtle House Backlight Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '85%',
              height: '85%',
              background: `radial-gradient(circle, ${houseColor}40 0%, ${accentColor}25 45%, transparent 72%)`,
              filter: 'blur(35px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Golden Entrance Sparkles (tasteful, leaves face & wand clear) */}
          {showSparkles && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 3
              }}
              aria-hidden="true"
            >
              {[...Array(14)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${15 + i * 5.5}%`,
                    left: `${(i % 2 === 0 ? 5 : 85) + ((i * 3) % 10)}%`,
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#ffd978',
                    boxShadow: '0 0 10px #d4af37, 0 0 18px #ffd978',
                    animation: `sparkle-fade 1.8s ease-out forwards ${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          )}

          {/* ═══ CHARACTER VIDEO CONTAINER WITH ENTRANCE ANIMATION ═══ */}
          <motion.div
            initial={{
              x: isLeft ? -90 : 90,
              opacity: 0,
              scale: 0.94
            }}
            animate={
              isInView
                ? { x: 0, opacity: 1, scale: 1 }
                : { x: isLeft ? -90 : 90, opacity: 0, scale: 0.94 }
            }
            transition={{
              duration: 1.15,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: `0 20px 60px rgba(0, 0, 0, 0.85), 0 0 35px ${houseColor}33`
            }}
          >
            {/* Transparent WebM / Video Element - Always Muted, No Audio Button */}
            {!videoError ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                poster={member.posterSrc}
                onError={() => setVideoError(true)}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '620px',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9))'
                }}
              >
                {member.videoWebm && (
                  <source src={member.videoWebm} type="video/webm" />
                )}
                <source src={member.videoSrc} type="video/mp4" />
                {/* Fallback image */}
                <img
                  src={member.posterSrc}
                  alt={`${member.name} in Hogwarts wizard robes`}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </video>
            ) : (
              <img
                src={member.posterSrc}
                alt={`${member.name} in Hogwarts wizard robes`}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '620px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            )}
          </motion.div>

          {/* Wand Specs Badge Under Character */}
          {member.wandSpecs && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginTop: '1.2rem',
                padding: '0.4rem 1.1rem',
                borderRadius: '9999px',
                background: 'rgba(6, 20, 14, 0.82)',
                border: '1px solid var(--gold-border-subtle)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.74rem',
                letterSpacing: '0.16em',
                color: 'var(--gold-mid)',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <Wand2 size={13} style={{ color: 'var(--gold-bright)' }} />
              <span>{member.wandSpecs}</span>
            </div>
          )}
        </div>

        {/* ═══ 2. ACHIEVEMENT TEXT (RIGHT FOR GAUTAM, LEFT FOR AMRA) ═══ */}
        <div
          style={{
            order: isLeft ? 2 : 1,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left'
          }}
        >
          {/* Eyebrow: HORCRUX / WIZARD FILE */}
          <ScrollReveal delay={0.1} yOffset={16}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.35rem 0.95rem',
                borderRadius: '9999px',
                background: `${houseColor}26`,
                border: `1px solid ${accentColor}55`,
                fontFamily: 'var(--font-display)',
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.24em',
                color: 'var(--gold-bright)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                boxShadow: `0 2px 10px ${houseColor}20`
              }}
            >
              <Shield size={13} style={{ color: 'var(--gold-bright)' }} />
              <span>{member.fileNumber}</span>
            </div>
          </ScrollReveal>

          {/* Name: AMRA K. QURESHI / GAUTAM N CHIPKAR (Using BlurText) */}
          <div style={{ marginBottom: '0.45rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-parchment)',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(212, 175, 55, 0.25)',
                lineHeight: 1.1
              }}
            >
              <BlurText text={member.name} delay={65} animateBy="words" />
            </h2>
          </div>

          {/* Role & House Badge */}
          <ScrollReveal delay={0.25} yOffset={14}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.92rem, 1.7vw, 1.2rem)',
                fontWeight: 800,
                letterSpacing: '0.18em',
                color: 'var(--gold-light)',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.65rem'
              }}
            >
              <span>{member.role}</span>
              <span style={{ color: 'var(--gold-bright)' }}>✦</span>
              <span
                style={{
                  fontSize: '0.74rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  background: `${houseColor}2b`,
                  border: `1px solid ${houseColor}66`,
                  color: accentColor,
                  fontWeight: 700,
                  letterSpacing: '0.14em'
                }}
              >
                {member.houseTag || member.house}
              </span>
            </div>
          </ScrollReveal>

          {/* Short Introduction */}
          <ScrollReveal delay={0.35} yOffset={18}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.15rem, 2vw, 1.38rem)',
                fontStyle: 'italic',
                color: 'var(--text-silver)',
                lineHeight: 1.6,
                marginBottom: '2.2rem',
                maxWidth: '680px'
              }}
            >
              “{member.shortBio}”
            </p>
          </ScrollReveal>

          {/* ═══ TECHNICAL ACHIEVEMENTS & MAGICAL INVENTIONS ═══ */}
          <ScrollReveal delay={0.45} yOffset={20}>
            <div style={{ marginBottom: '2.2rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  color: 'var(--gold-mid)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                <Trophy size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>{member.technicalGroupTitle || 'TECHNICAL FEATS & RECORD'}</span>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                {member.technicalAchievements.map((ach, idx) => {
                  const parts = ach.split(' — ');
                  return (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.92rem',
                        lineHeight: 1.55,
                        color: 'var(--text-parchment)'
                      }}
                    >
                      <span
                        style={{
                          color: accentColor,
                          fontSize: '0.88rem',
                          marginTop: '0.15rem',
                          flexShrink: 0
                        }}
                      >
                        ⚡
                      </span>
                      <span>
                        {parts.length > 1 ? (
                          <>
                            <strong style={{ color: 'var(--gold-light)', fontWeight: 700 }}>
                              {parts[0]}
                            </strong>
                            {' — '}
                            <span style={{ color: 'var(--text-parchment)' }}>{parts.slice(1).join(' — ')}</span>
                          </>
                        ) : (
                          ach
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>

          {/* ═══ BEYOND THE CODE ═══ */}
          <ScrollReveal delay={0.55} yOffset={20}>
            <div style={{ marginBottom: '2.2rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  color: 'var(--gold-mid)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                <Award size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>BEYOND THE CODE</span>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {member.beyondCodeAchievements.map((ach, idx) => {
                  const parts = ach.split(' — ');
                  return (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.92rem',
                        lineHeight: 1.55,
                        color: 'var(--text-silver)'
                      }}
                    >
                      <span
                        style={{
                          color: accentColor,
                          fontSize: '0.8rem',
                          marginTop: '0.15rem',
                          flexShrink: 0
                        }}
                      >
                        ✦
                      </span>
                      <span>
                        {parts.length > 1 ? (
                          <>
                            <strong style={{ color: 'var(--text-parchment)', fontWeight: 700 }}>
                              {parts[0]}
                            </strong>
                            {' — '}
                            <span style={{ color: 'var(--text-silver)' }}>{parts.slice(1).join(' — ')}</span>
                          </>
                        ) : (
                          ach
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>

          {/* ═══ SIGNATURE SPELL (IF PRESENT) ═══ */}
          {member.signatureSpell && (
            <ScrollReveal delay={0.6} yOffset={16}>
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '10px',
                  background: 'rgba(6, 20, 14, 0.85)',
                  border: `1px solid ${accentColor}40`,
                  boxShadow: `0 4px 18px rgba(0, 0, 0, 0.5), 0 0 15px ${houseColor}20`,
                  marginBottom: '1.4rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Sparkles size={14} style={{ color: 'var(--gold-bright)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      color: 'var(--gold-mid)',
                      textTransform: 'uppercase'
                    }}
                  >
                    ✧ SIGNATURE SPELL:
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      fontStyle: 'italic',
                      color: 'var(--gold-bright)',
                      fontWeight: 600
                    }}
                  >
                    {member.signatureSpell}
                  </span>
                </div>
                {member.signatureSpellSubtitle && (
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.88rem',
                      fontStyle: 'italic',
                      color: accentColor,
                      paddingLeft: '1.6rem',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {member.signatureSpellSubtitle}
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* ═══ CLOSING LINE QUOTE BOX ═══ */}
          <ScrollReveal delay={0.65} yOffset={18}>
            <div
              style={{
                padding: '1.25rem 1.65rem',
                borderRadius: '12px',
                background: `${houseColor}20`,
                border: '1px solid var(--gold-border-bright)',
                boxShadow: `0 6px 20px rgba(0, 0, 0, 0.6), inset 0 0 15px ${houseColor}18`,
                marginBottom: member.socialLinks ? '1.8rem' : '0'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.12rem, 2.1vw, 1.4rem)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: 'var(--gold-light)',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                  lineHeight: 1.55
                }}
              >
                {member.closingLine}
              </div>
            </div>
          </ScrollReveal>

          {/* ═══ HOUSE CODE / MOTTO (IF PRESENT) ═══ */}
          {member.houseMotto && (
            <ScrollReveal delay={0.7} yOffset={16}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 1.2rem',
                  borderRadius: '10px',
                  background: `${houseColor}18`,
                  border: `1px solid ${houseColor}50`,
                  boxShadow: `0 4px 15px rgba(0, 0, 0, 0.4), inset 0 0 12px ${houseColor}15`,
                  marginTop: '1.2rem',
                  marginBottom: member.socialLinks ? '1.8rem' : '0'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    color: 'var(--gold-mid)',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {member.houseMotto.includes(':') ? member.houseMotto.split(':')[0] : 'HOUSE CODE'}:
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                    fontStyle: 'italic',
                    color: 'var(--text-parchment)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {member.houseMotto.includes(':') ? member.houseMotto.split(':')[1] : member.houseMotto}
                </span>
              </div>
            </ScrollReveal>
          )}

          {/* ═══ FIND ME BEYOND HOGWARTS (SOCIAL/CONTACT LINKS) ═══ */}
          {member.socialLinks && (
            <ScrollReveal delay={0.72} yOffset={16}>
              <div
                style={{
                  marginTop: '0.5rem',
                  paddingTop: '1.2rem',
                  borderTop: '1px solid rgba(197, 160, 89, 0.2)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.22em',
                    color: 'var(--gold-mid)',
                    textTransform: 'uppercase',
                    marginBottom: '0.85rem'
                  }}
                >
                  FIND ME BEYOND HOGWARTS
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  {member.socialLinks.email && (
                    <a
                      href={`mailto:${member.socialLinks.email}`}
                      className="interactive-hover"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.95rem',
                        borderRadius: '9999px',
                        background: 'rgba(5, 16, 11, 0.78)',
                        border: '1px solid var(--gold-border-subtle)',
                        color: 'var(--text-parchment)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-bright)';
                        e.currentTarget.style.color = 'var(--gold-bright)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-border-subtle)';
                        e.currentTarget.style.color = 'var(--text-parchment)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Mail size={14} style={{ color: 'var(--gold-bright)' }} />
                      <span>{member.socialLinks.email}</span>
                    </a>
                  )}

                  {member.socialLinks.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-hover"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.95rem',
                        borderRadius: '9999px',
                        background: 'rgba(5, 16, 11, 0.78)',
                        border: '1px solid var(--gold-border-subtle)',
                        color: 'var(--text-parchment)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-bright)';
                        e.currentTarget.style.color = 'var(--gold-bright)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-border-subtle)';
                        e.currentTarget.style.color = 'var(--text-parchment)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Github size={14} style={{ color: 'var(--gold-bright)' }} />
                      <span>{member.socialLinks.github.replace('https://', '')}</span>
                    </a>
                  )}

                  {member.socialLinks.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-hover"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.95rem',
                        borderRadius: '9999px',
                        background: 'rgba(5, 16, 11, 0.78)',
                        border: '1px solid var(--gold-border-subtle)',
                        color: 'var(--text-parchment)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-bright)';
                        e.currentTarget.style.color = 'var(--gold-bright)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-border-subtle)';
                        e.currentTarget.style.color = 'var(--text-parchment)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Linkedin size={14} style={{ color: 'var(--gold-bright)' }} />
                      <span>{member.socialLinks.linkedin.replace('https://', '')}</span>
                    </a>
                  )}

                  {member.socialLinks.portfolio && (
                    <a
                      href={member.socialLinks.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive-hover"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 0.95rem',
                        borderRadius: '9999px',
                        background: 'rgba(5, 16, 11, 0.78)',
                        border: '1px solid var(--gold-border-subtle)',
                        color: 'var(--text-parchment)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-bright)';
                        e.currentTarget.style.color = 'var(--gold-bright)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-border-subtle)';
                        e.currentTarget.style.color = 'var(--text-parchment)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Globe size={14} style={{ color: 'var(--gold-bright)' }} />
                      <span>{member.socialLinks.portfolio.replace('https://', '').replace(/\/$/, '')}</span>
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default WizardMemberIntro;
