// =============================================
// QT SSW ACADEMY — Header Component
// Design: Industrial Precision x Japanese Craft
// Palette: Navy #0B1929 | Accent #E8621A | Gold #D4A843
// =============================================

import React from 'react';
import type { Language } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, onToggleLang }) => {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #0B1929 0%, #112236 60%, #1E3A5F 100%)',
        borderBottom: '2px solid #E8621A',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo / Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Geometric mark */}
            <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <polygon points="22,2 42,12 42,32 22,42 2,32 2,12" fill="#E8621A" opacity="0.15" stroke="#E8621A" strokeWidth="1.5"/>
                <polygon points="22,8 36,16 36,28 22,36 8,28 8,16" fill="none" stroke="#D4A843" strokeWidth="1"/>
                <text x="22" y="27" textAnchor="middle" fill="#F0EDE8" fontSize="13" fontFamily="Rajdhani, sans-serif" fontWeight="700">QT</text>
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#F0EDE8',
                lineHeight: 1.1,
              }}>
                QT DRIVE INNOVATIONS<sup style={{ fontSize: 10, color: '#E8621A' }}>®</sup>
              </div>
              <div style={{
                fontFamily: 'Noto Sans JP, sans-serif',
                fontWeight: 400,
                fontSize: 11,
                color: '#8A9BB0',
                letterSpacing: '0.12em',
                lineHeight: 1.2,
              }}>
                × TECH READS<sup style={{ fontSize: 8 }}>®</sup>-NECH
                &nbsp;|&nbsp;
                {lang === 'ja' ? 'SSW技能者育成アカデミー' : 'SSW Skills Academy'}
              </div>
            </div>
          </div>

          {/* Right: Lang toggle + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* SSW badge */}
            <div style={{
              display: 'flex',
              background: 'rgba(212,168,67,0.12)',
              border: '1px solid rgba(212,168,67,0.4)',
              borderRadius: 4,
              padding: '3px 10px',
              fontSize: 11,
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#D4A843',
            }}
              className="ssw-badge"
            >
              特定技能1号
            </div>

            {/* Language toggle */}
            <button
              onClick={onToggleLang}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 6,
                padding: '6px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                color: '#F0EDE8',
                fontFamily: 'Noto Sans JP, sans-serif',
                fontSize: 13,
                fontWeight: 500,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(232,98,26,0.2)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E8621A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
              }}
              aria-label={lang === 'ja' ? 'Switch to English' : '日本語に切り替え'}
            >
              <span style={{ fontSize: 16 }}>{lang === 'ja' ? '🇯🇵' : '🇬🇧'}</span>
              <span>{lang === 'ja' ? 'JA / EN' : 'EN / JA'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accent line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #E8621A 0%, #D4A843 50%, transparent 100%)' }} />
    </header>
  );
};

export default Header;
