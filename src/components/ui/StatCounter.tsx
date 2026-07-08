import React from 'react';
import type { Language } from '../../types';

interface StatCounterProps {
  value: string | number;
  labelJa: string;
  labelEn: string;
  subJa?: string;
  subEn?: string;
  lang: Language;
  accent?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  value, labelJa, labelEn, subJa, subEn, lang, accent = '#E8621A',
}) => (
  <div style={{
    background: '#112236',
    border: '1px solid rgba(255,255,255,0.08)',
    borderTop: `3px solid ${accent}`,
    borderRadius: 8,
    padding: '20px 22px',
    textAlign: 'center',
  }}>
    <div style={{
      fontSize: 36,
      fontWeight: 700,
      color: accent,
      fontFamily: 'Rajdhani, sans-serif',
      lineHeight: 1,
      marginBottom: 6,
    }}>
      {value}
    </div>
    <div style={{ fontSize: 12, fontWeight: 600, color: '#F0EDE8', marginBottom: 2 }}>
      {lang === 'ja' ? labelJa : labelEn}
    </div>
    {(subJa || subEn) && (
      <div style={{ fontSize: 11, color: '#8A9BB0' }}>
        {lang === 'ja' ? subJa : subEn}
      </div>
    )}
  </div>
);

export default StatCounter;