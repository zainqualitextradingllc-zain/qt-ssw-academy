import React from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercent?: boolean;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label, showPercent = true, height = 8 }) => {
  const color = value >= 70 ? '#2E7D52' : value >= 40 ? '#D4A843' : '#E8621A';

  return (
    <div>
      {(label || showPercent) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {label && <span style={{ fontSize: 11, color: '#8A9BB0' }}>{label}</span>}
          {showPercent && (
            <span style={{ fontSize: 11, fontWeight: 700, color }}>{value}%</span>
          )}
        </div>
      )}
      <div style={{
        height,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: height / 2,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: `linear-gradient(90deg, ${color} 0%, ${color}cc 100%)`,
          borderRadius: height / 2,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;