import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';
import { countFingers, fingersToPercent, pinchRatio, pinchToPercent, smooth } from './gestureMath';
import { card } from '../../pages/ui';

type Mode = 'pinch' | 'fingers';
type Status = 'idle' | 'loading' | 'running' | 'error';

const WASM = `${import.meta.env.BASE_URL}wasm`;
const MODEL = `${import.meta.env.BASE_URL}models/hand_landmarker.task`;

export const GestureVolumeDemo: React.FC = () => {
  const video = useRef<HTMLVideoElement>(null);
  const raf = useRef(0);
  const stream = useRef<MediaStream | null>(null);
  const landmarker = useRef<HandLandmarker | null>(null);
  const smoothed = useRef<number | null>(null);
  const audio = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('pinch');
  const modeRef = useRef<Mode>(mode);
  const [tone, setTone] = useState(false);
  const [volume, setVolume] = useState(0);
  const [hand, setHand] = useState(false);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    landmarker.current?.close();
    landmarker.current = null;
    audio.current?.ctx.close();
    audio.current = null;
    smoothed.current = null;
    setTone(false);
    setHand(false);
    setStatus('idle');
  }, []);
  useEffect(() => stop, [stop]);

  useEffect(() => {
    if (audio.current) audio.current.gain.gain.value = (volume / 100) * 0.2;
  }, [volume, tone]);

  const start = async () => {
    setStatus('loading');
    setError('');
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error('Camera access is not available in this browser.');
      const fileset = await FilesetResolver.forVisionTasks(WASM);
      landmarker.current = await HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL },
        runningMode: 'VIDEO',
        numHands: 1
      });
      stream.current = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      const v = video.current!;
      v.srcObject = stream.current;
      await v.play();
      setStatus('running');

      let last = -1;
      const loop = () => {
        if (!landmarker.current) return;
        if (v.currentTime !== last) {
          last = v.currentTime;
          const lm = landmarker.current.detectForVideo(v, performance.now()).landmarks[0];
          setHand(!!lm);
          if (lm) {
            const raw =
              modeRef.current === 'pinch'
                ? pinchToPercent(pinchRatio(lm)) / 100
                : fingersToPercent(countFingers(lm)) / 100;
            smoothed.current = smooth(smoothed.current, raw);
            setVolume(Math.round(smoothed.current * 100));
          }
        }
        raf.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (e) {
      stop();
      setError(e instanceof Error ? e.message : 'Could not start the camera or model.');
      setStatus('error');
    }
  };

  const toggleTone = () => {
    if (tone) {
      audio.current?.ctx.close();
      audio.current = null;
      setTone(false);
      return;
    }
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    gain.gain.value = (volume / 100) * 0.2;
    osc.frequency.value = 440;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    audio.current = { ctx, gain };
    setTone(true);
  };

  const btn: React.CSSProperties = {
    padding: '0.55rem 1.2rem',
    borderRadius: 9999,
    border: '1px solid var(--gold-border-bright)',
    background: 'rgba(3,11,7,0.8)',
    color: 'var(--gold-bright)',
    fontFamily: 'var(--font-display)',
    fontSize: '0.75rem',
    letterSpacing: '0.14em',
    cursor: 'pointer'
  };

  return (
    <div style={card}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '1rem', alignItems: 'center' }}>
        {status === 'running' ? (
          <button type="button" style={btn} onClick={stop}>
            STOP CAMERA
          </button>
        ) : (
          <button type="button" style={btn} onClick={start} disabled={status === 'loading'}>
            {status === 'loading' ? 'LOADING MODEL…' : 'START CAMERA'}
          </button>
        )}
        <label style={{ color: 'var(--text-silver)', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>
          Mode{' '}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            style={{ background: '#000', color: 'var(--text-parchment)', border: '1px solid var(--gold-border-subtle)', borderRadius: 6, padding: '0.3rem' }}
          >
            <option value="pinch">Pinch (thumb + index)</option>
            <option value="fingers">Finger count (0-5)</option>
          </select>
        </label>
        <button type="button" style={btn} onClick={toggleTone} disabled={status !== 'running' && !tone}>
          {tone ? 'TONE OFF' : 'TONE ON'}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" style={{ color: '#e8a0a0', fontFamily: 'var(--font-sans)', fontSize: '0.88rem' }}>
          {error}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', alignItems: 'center' }}>
        <video ref={video} muted playsInline style={{ width: '100%', borderRadius: 10, background: '#000', transform: 'scaleX(-1)', minHeight: 180 }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--gold-bright)' }}>{volume}%</div>
          <div
            role="progressbar"
            aria-valuenow={volume}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Gesture volume"
            style={{ height: 14, borderRadius: 9999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}
          >
            <div style={{ width: `${volume}%`, height: '100%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-bright))', transition: 'width 0.08s linear' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
            {status === 'running'
              ? hand
                ? 'Hand detected.'
                : 'Show one hand to the camera.'
              : 'Video stays in your browser; nothing is uploaded.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GestureVolumeDemo;
