import React from 'react';
import Link from 'next/link';

interface ScoreBoxProps {
  score: number;
  position: string;
  size: string;
}

const ScoreBox: React.FC<ScoreBoxProps> = ({ score, position, size }) => (
  <div
    className={`absolute flex items-center justify-center bg-white/10 rounded-lg font-bold text-white ${position} ${size}`}
  >
    <span className="text-4xl lg:text-5xl">{score}</span>
  </div>
);

const MetascoreBreakdown: React.FC = () => {
  const scoresData = [
    { score: 99, position: 'top-8 right-1/2 translate-x-1/2 lg:right-[45%]', size: 'w-24 h-24' },
    { score: 95, position: 'top-1/3 left-1/2 -translate-x-3/4 lg:left-[40%]', size: 'w-28 h-28' },
    { score: 88, position: 'top-1/2 right-[30%] -translate-y-1/2 rotate-[-12deg]', size: 'w-24 h-24' },
    { score: 89, position: 'bottom-1/4 right-1/2 lg:right-[45%]', size: 'w-20 h-20' },
    { score: 82, position: 'bottom-8 right-8 lg:right-16', size: 'w-32 h-32' },
    { score: 91, position: 'bottom-8 left-8 lg:left-16', size: 'w-28 h-28' },
    { score: 57, position: 'top-16 left-1/2 -translate-x-full lg:left-32 -rotate-12', size: 'w-20 h-20' },
    { score: 48, position: 'top-1/3 left-8 lg:left-16', size: 'w-24 h-24' },
    { score: 72, position: 'bottom-1/3 left-1/3 rotate-12', size: 'w-16 h-16' },
    { score: 23, position: 'top-8 left-8', size: 'w-16 h-16' },
    { score: 12, position: 'top-1/2 left-8 -translate-y-1/2', size: 'w-20 h-20' },
    { score: 8, position: 'bottom-1/2 right-12 -translate-y-1/2', size: 'w-20 h-20' },
  ];

  return (
    <section className="relative my-8 overflow-hidden bg-gradient-to-r from-score-green via-score-orange to-score-red rounded-lg">
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {scoresData.map((item, index) => (
          <ScoreBox key={index} score={item.score} position={item.position} size={item.size} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              The Gold Standard in Critical Analysis
            </h2>
          </div>

          <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-foreground mb-3">
              The Metascore Breakdown
            </h3>
            <div className="w-full h-1.5 flex rounded-full overflow-hidden mb-4">
              <div className="w-2/3 bg-score-green"></div>
              <div className="w-1/4 bg-score-orange"></div>
              <div className="flex-grow bg-score-red"></div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground mb-6">
              <li>We collect reviews from the world's top critics.</li>
              <li>Each review is scored based on its overall quality.</li>
              <li>The summarized weighted average captures the essence of critical opinion.</li>
            </ul>
            <Link
              href="/about-us"
              className="block w-full bg-foreground text-white text-center py-3 px-4 rounded-md font-semibold hover:bg-gray-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetascoreBreakdown;