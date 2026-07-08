import React from 'react';
import type { Language } from '../../types';

interface QuickActionCardProps {
  icon: string;
  titleJa: string;
  titleEn: string;
  lang: Language;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, titleJa, titleEn, lang, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'linear-gradient(135deg, #112236 0%, #1a2f4a 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      padding: '16px 20px',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s',
      color: '#F0EDE8',
      width: '100%',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#E8621A';
      e.currentTarget.style.background = 'linear-gradient(135deg, #1a2f4a 0%, #1E3A5F 100%)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
      e.currentTarget.style.background = 'linear-gradient(135deg, #112236 0%, #1a2f4a 100%)';
    }}
  >
    <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
      {lang === 'ja' ? titleJa : titleEn}
    </div>
    <div style={{ fontSize: 11, color: '#8A9BB0', marginTop: 4 }}>
      {lang === 'ja' ? titleEn : titleJa}
    </div>
  </button>
);

export default QuickActionCard;