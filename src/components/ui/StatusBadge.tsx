import React from 'react';

export type BadgeStatus =
  | 'available'
  | 'new'
  | 'beta'
  | 'official'
  | 'pdf'
  | 'completed'
  | 'in-progress';

const BADGE_STYLES: Record<BadgeStatus, { bg: string; border: string; color: string; labelJa: string; labelEn: string }> = {
  available: { bg: 'rgba(46,125,82,0.15)', border: 'rgba(46,125,82,0.5)', color: '#4CAF7A', labelJa: '利用可能', labelEn: 'Available' },
  new: { bg: 'rgba(232,98,26,0.2)', border: 'rgba(232,98,26,0.6)', color: '#FF8C42', labelJa: 'NEW!', labelEn: 'NEW!' },
  beta: { bg: 'rgba(45,90,142,0.2)', border: 'rgba(45,90,142,0.5)', color: '#6BA3E0', labelJa: 'ベータ版', labelEn: 'Beta' },
  official: { bg: 'rgba(212,168,67,0.15)', border: 'rgba(212,168,67,0.5)', color: '#D4A843', labelJa: '公式', labelEn: 'Official' },
  pdf: { bg: 'rgba(192,57,43,0.15)', border: 'rgba(192,57,43,0.4)', color: '#E07070', labelJa: 'PDF', labelEn: 'PDF' },
  completed: { bg: 'rgba(46,125,82,0.2)', border: 'rgba(46,125,82,0.6)', color: '#4CAF7A', labelJa: '完了', labelEn: 'Completed' },
  'in-progress': { bg: 'rgba(212,168,67,0.15)', border: 'rgba(212,168,67,0.5)', color: '#D4A843', labelJa: '進行中', labelEn: 'In Progress' },
};

interface StatusBadgeProps {
  status: BadgeStatus;
  lang: 'ja' | 'en';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, lang }) => {
  const s = BADGE_STYLES[status];
  return (
    <span style={{
      display: 'inline-block',
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: 4,
      padding: '2px 8px',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      color: s.color,
      fontFamily: 'Rajdhani, sans-serif',
      whiteSpace: 'nowrap',
    }}>
      {lang === 'ja' ? s.labelJa : s.labelEn}
    </span>
  );
};

export default StatusBadge;