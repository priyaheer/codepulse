import { motion } from 'framer-motion';

/**
 * A stylized line that starts jagged/erratic (unhealthy code) and settles
 * into a calm, even rhythm (healthy code) — the CodePulse visual motif.
 */
export function PulseLine({ className, width = 480, height = 120 }) {
  const path =
    'M0,60 L20,60 L34,20 L46,95 L58,60 L90,60 L104,40 L118,72 L132,60 ' +
    'L200,60 C 230,60 240,50 260,55 C 280,60 290,52 310,56 ' +
    'C 340,58 360,58 400,58 C 430,58 450,58 480,58';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d={path}
        stroke="var(--cp-pulse)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
    </svg>
  );
}
