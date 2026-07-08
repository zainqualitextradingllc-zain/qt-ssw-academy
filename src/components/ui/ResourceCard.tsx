import React from 'react';
import type { Language } from '../../types';
import StatusBadge, { type BadgeStatus } from './StatusBadge';
import ProgressBar from './ProgressBar';

interface ResourceCardProps {
  icon: string;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  status: BadgeStatus;
  ctaJa: string;
  ctaEn: string;
  lang: Language;
  progress?: number;
  onClick?: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  icon, titleJa, titleEn, descJa, descEn, status, ctaJa, ctaEn, lang, progress, onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      background: '#112236',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      height: '100%',
    }}
    onMouseEnter={e => {
      if (!onClick) return;
      e.currentTarget.style.borderColor = 'rgba(232,98,26,0.45)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 32, lineHeight: 1 }}>{icon}</span>
      <StatusBadge status={status} lang={lang} />
    </div>

    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', marginBottom: 4, lineHeight: 1.3 }}>
        {lang === 'ja' ? titleJa : titleEn}
      </div>
      <div style={{ fontSize: 12, color: '#8A9BB0', marginBottom: 8 }}>
        {lang === 'ja' ? titleEn : titleJa}
      </div>
      <div style={{ fontSize: 13, color: '#8A9BB0', lineHeight: 1.55 }}>
        {lang === 'ja' ? descJa : descEn}
      </div>
    </div>

    {progress !== undefined && (
      <ProgressBar
        value={progress}
        label={lang === 'ja' ? '進捗状況' : 'Progress'}
      />
    )}

    <div style={{
      marginTop: 'auto',
      fontSize: 13,
      fontWeight: 600,
      color: '#E8621A',
      fontFamily: 'Rajdhani, sans-serif',
      letterSpacing: '0.04em',
    }}>
      {lang === 'ja' ? ctaJa : ctaEn} →
    </div>
  </div>
);

export default ResourceCard;