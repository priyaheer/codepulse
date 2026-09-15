import { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

function scoreColor(score) {
  if (score >= 80) return 'var(--cp-resolved)';
  if (score >= 60) return 'var(--cp-medium)';
  return 'var(--cp-critical)';
}

export function HealthGauge({ score = 0, size = 168, label = 'Project health' }) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimated(score));
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const data = [{ value: animated, fill: scoreColor(score) }];

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <RadialBarChart
        width={size}
        height={size}
        cx="50%"
        cy="50%"
        innerRadius="78%"
        outerRadius="100%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          background={{ fill: 'var(--cp-surface-hover)' }}
          dataKey="value"
          cornerRadius={20}
          isAnimationActive
          animationDuration={900}
        />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[34px] font-semibold leading-none text-text-primary tabular-nums">{Math.round(animated)}</span>
        <span className="mt-1 text-[11.5px] text-text-secondary">/ 100</span>
      </div>
    </div>
  );
}
