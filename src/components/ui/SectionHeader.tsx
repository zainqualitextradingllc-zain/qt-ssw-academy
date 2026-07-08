import React from 'react';
import type { Language } from '../../types';

interface SectionHeaderProps {
  titleEn: string;
  titleJa: string;
  lang: Language;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ titleEn, titleJa, lang, subtitle }) => (
  <div style={{ marginBottom: 20 }}>
    <h2 style={{
      fontSize: 20,
      fontWeight: 700,
      color: '#F0EDE8',
      margin: 0,
      lineHeight: 1.3,
    }}>
      {lang === 'ja' ? titleJa : titleEn}
      <span style={{ fontSize: 14, fontWeight: 400, color: '#8A9BB0', marginLeft: 12 }}>
        {lang === 'ja' ? titleEn : titleJa}
      </span>
    </h2>
    {subtitle && (
      <p style={{ fontSize: 13, color: '#8A9BB0', margin: '6px 0 0' }}>{subtitle}</p>
    )}
  </div>
);

export default SectionHeader;