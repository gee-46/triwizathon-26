import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Project, PROJECTS } from '../../data/projects';
import { BookEntrance } from './BookEntrance';
import { Flipbook } from './Flipbook';
import { ArchiveControls } from './ArchiveControls';

interface EnchantedArchiveProps {
  onExploreProject: (slug: string) => void;
}

export const EnchantedArchive: React.FC<EnchantedArchiveProps> = ({
  onExploreProject
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');

  // Deck of unvisited indices to ensure every project is visited without immediate repeats
  const unvisitedRef = useRef<number[]>([]);
  // Navigation history stack for PREVIOUS PAGE
  const historyRef = useRef<number[]>([]);
  const isFlippingRef = useRef(false);
  const flipTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Initialize and shuffle unvisited deck
  const refillAndShuffleDeck = useCallback((excludeIndex?: number): number[] => {
    const indices = PROJECTS.map((_, idx) => idx).filter(
      (idx) => idx !== excludeIndex
    );
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // If excludeIndex was omitted, add it in randomly
    if (excludeIndex === undefined) {
      const all = PROJECTS.map((_, idx) => idx);
      for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
      }
      return all;
    }
    return indices;
  }, []);

  // Pick next random project following unvisited cycle
  const getNextProjectIndex = useCallback((): number => {
    if (unvisitedRef.current.length === 0) {
      unvisitedRef.current = refillAndShuffleDeck(currentIndex);
    }
    const nextIdx = unvisitedRef.current.shift()!;
    return nextIdx;
  }, [currentIndex, refillAndShuffleDeck]);

  // Clean up animation timers on unmount
  useEffect(() => {
    return () => {
      flipTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Execute the cinematic rapid page-flipping sequence
  const executeFlipAnimation = useCallback(
    (targetIndex: number, direction: 'forward' | 'backward') => {
      if (isFlippingRef.current) return;
      isFlippingRef.current = true;
      setIsFlipping(true);
      setFlipDirection(direction);

      // Clear any prior pending timers
      flipTimersRef.current.forEach(clearTimeout);
      flipTimersRef.current = [];

      // Check for prefers-reduced-motion
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReduced) {
        // Instant/short transition for reduced motion
        const timer = setTimeout(() => {
          setCurrentIndex(targetIndex);
          setPreviewProject(null);
          setIsFlipping(false);
          isFlippingRef.current = false;
        }, 300);
        flipTimersRef.current.push(timer);
        return;
      }

      // Generate 5-6 intermediate preview project flashes during the rapid flip
      const intermediateIndices: number[] = [];
      const candidateIndices = PROJECTS.map((_, i) => i).filter(
        (i) => i !== currentIndex && i !== targetIndex
      );

      for (let i = 0; i < 5; i++) {
        const randomCandidate =
          candidateIndices[Math.floor(Math.random() * candidateIndices.length)] ??
          (i % PROJECTS.length);
        intermediateIndices.push(randomCandidate);
      }
      intermediateIndices.push(targetIndex);

      // Accelerating then decelerating timeline steps (total ~2.4 seconds)
      const timings = [200, 450, 750, 1150, 1650, 2200];

      timings.forEach((delay, idx) => {
        const timer = setTimeout(() => {
          const previewIdx = intermediateIndices[idx];
          if (previewIdx !== undefined) {
            setPreviewProject(PROJECTS[previewIdx]);
          }

          // On final step, land and settle
          if (idx === timings.length - 1) {
            setCurrentIndex(targetIndex);
            setPreviewProject(null);
            setIsFlipping(false);
            isFlippingRef.current = false;
          }
        }, delay);
        flipTimersRef.current.push(timer);
      });
    },
    [currentIndex]
  );

  // OPEN THE ARCHIVE action
  const handleOpenArchive = () => {
    if (isOpen) return;

    // Pick first random project
    const initialDeck = refillAndShuffleDeck();
    const firstIndex = initialDeck.shift()!;
    unvisitedRef.current = initialDeck;
    historyRef.current = [];

    setIsOpen(true);
    setCurrentIndex(firstIndex);

    // Run opening flip sequence
    executeFlipAnimation(firstIndex, 'forward');
  };

  // TURN THE PAGE action
  const handleNextPage = () => {
    if (isFlippingRef.current) return;
    historyRef.current.push(currentIndex);
    const nextIndex = getNextProjectIndex();
    executeFlipAnimation(nextIndex, 'forward');
  };

  // PREVIOUS PAGE action
  const handlePrevPage = () => {
    if (isFlippingRef.current || historyRef.current.length === 0) return;
    const prevIndex = historyRef.current.pop()!;
    // Push current back to front of unvisited deck
    unvisitedRef.current.unshift(currentIndex);
    executeFlipAnimation(prevIndex, 'backward');
  };

  // CLOSE SPELLBOOK action
  const handleCloseBook = () => {
    if (isFlippingRef.current) return;
    setIsOpen(false);
  };

  // Keyboard Navigation: ArrowLeft for Prev, ArrowRight for Next, Escape to Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        handleCloseBook();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  return (
    <section
      id="pensieve-archive"
      aria-label="The Pensieve - Enchanted Archive of Builds"
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-abyss)',
        backgroundImage:
          'radial-gradient(circle at 50% 20%, rgba(4, 25, 15, 0.8) 0%, rgba(2, 7, 4, 0.98) 70%)',
        position: 'relative',
        padding: '5rem 1.5rem 7rem',
        borderTop: '1px solid rgba(197, 160, 89, 0.2)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
        overflow: 'hidden'
      }}
    >
      {/* Ancient Archive Library Shelves Subtle Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(18, 76, 50, 0.2) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 5
        }}
      >
        {/* Closed Book Entrance Screen */}
        <BookEntrance onOpenArchive={handleOpenArchive} isOpen={isOpen} />

        {/* Open Book Spread & Rapid Flipping Stage */}
        {isOpen && (
          <div style={{ marginTop: '1.5rem' }}>
            <Flipbook
              projects={PROJECTS}
              currentIndex={currentIndex}
              isOpen={isOpen}
              isFlipping={isFlipping}
              onExplore={onExploreProject}
              previewProject={previewProject}
              flipDirection={flipDirection}
            />

            {/* Navigation Controls */}
            <ArchiveControls
              currentIndex={currentIndex}
              totalProjects={PROJECTS.length}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              onCloseBook={handleCloseBook}
              isFlipping={isFlipping}
              canGoBack={historyRef.current.length > 0}
            />
          </div>
        )}
      </div>
    </section>
  );
};
