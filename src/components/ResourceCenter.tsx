// =============================================
// Module 4: Resource / Download Center
// Grid layout with badges, internal + external links
// =============================================

import React, { useState } from 'react';
import { RESOURCE_SECTIONS, ALL_DOWNLOAD_RESOURCES } from '../data/downloadResources';
import type { Language, TabId } from '../types';
import SectionHeader from './ui/SectionHeader';
import ResourceCard from './ui/ResourceCard';
import StatCounter from './ui/StatCounter';

interface ResourceCenterProps {
  lang: Language;
  t: (ja: string, en: string) => string;
  onNavigate?: (tab: TabId) => void;
}

const ResourceCenter: React.FC<ResourceCenterProps> = ({ lang, t, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('all');

  const internalCount = ALL_DOWNLOAD_RESOURCES.filter(r => r.linkType === 'internal').length;
  const externalCount = ALL_DOWNLOAD_RESOURCES.filter(r => r.linkType === 'external').length;
  const pdfCount = ALL_DOWNLOAD_RESOURCES.filter(r => r.status === 'pdf').length;

  const visibleSections = activeSection === 'all'
    ? RESOURCE_SECTIONS
    : RESOURCE_SECTIONS.filter(s => s.id === activeSection);

  const handleResourceClick = (linkType: 'external' | 'internal', url?: string, tab?: TabId) => {
    if (linkType === 'external' && url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (linkType === 'internal' && tab) {
      onNavigate?.(tab);
    }
  };

  const sectionFilters = [
    { id: 'all', ja: 'すべて', en: 'All' },
    { id: 'in-app', ja: 'アプリ内', en: 'In-App' },
    { id: 'official', ja: '公式情報', en: 'Official' },
    { id: 'downloads', ja: 'PDF資料', en: 'Downloads' },
  ];

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #112236 0%, #1E3A5F 100%)',
        border: '1px solid rgba(232,98,26,0.3)',
        borderRadius: 12,
        padding: '28px 32px',
        marginBottom: 28,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 10 }}>
          TECH READS®-NECH — RESOURCE CENTER
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE8', margin: '0 0 8px' }}>
          {t('ダウンロード可能な資料', 'Downloadable Resources')}
        </h1>
        <p style={{ fontSize: 14, color: '#8A9BB0', margin: 0 }}>
          {t(
            '学習ツール・公式情報・PDF資料へのリンク集',
            'Links to learning tools, official information, and PDF materials',
          )}
        </p>
      </div>

      {/* Stats overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 14,
        marginBottom: 28,
      }}>
        <StatCounter value={ALL_DOWNLOAD_RESOURCES.length} labelJa="総リソース" labelEn="Total Resources" lang={lang} accent="#2D5A8E" />
        <StatCounter value={internalCount} labelJa="アプリ内" labelEn="In-App" lang={lang} accent="#E8621A" />
        <StatCounter value={externalCount} labelJa="外部リンク" labelEn="External" lang={lang} accent="#D4A843" />
        <StatCounter value={pdfCount} labelJa="PDF資料" labelEn="PDF Files" lang={lang} accent="#C0392B" />
      </div>

      {/* Section filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {sectionFilters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveSection(f.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: activeSection === f.id ? '1px solid #E8621A' : '1px solid rgba(255,255,255,0.12)',
              background: activeSection === f.id ? 'rgba(232,98,26,0.15)' : 'transparent',
              color: activeSection === f.id ? '#E8621A' : '#8A9BB0',
              fontSize: 13,
              fontFamily: 'Noto Sans JP, sans-serif',
              cursor: 'pointer',
              fontWeight: activeSection === f.id ? 600 : 400,
            }}
          >
            {lang === 'ja' ? f.ja : f.en}
          </button>
        ))}
      </div>

      {/* Resource sections */}
      {visibleSections.map(section => (
        <div key={section.id} style={{ marginBottom: 40 }}>
          <SectionHeader
            titleEn={section.titleEn}
            titleJa={section.titleJa}
            lang={lang}
            subtitle={section.subtitleJa && section.subtitleEn
              ? (lang === 'ja' ? section.subtitleJa : section.subtitleEn)
              : undefined}
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {section.items.map(item => (
              <ResourceCard
                key={item.id}
                icon={item.icon}
                titleJa={item.titleJa}
                titleEn={item.titleEn}
                descJa={item.descJa}
                descEn={item.descEn}
                status={item.status}
                ctaJa={item.ctaJa}
                ctaEn={item.ctaEn}
                lang={lang}
                onClick={() => handleResourceClick(item.linkType, item.url, item.tab)}
              />
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 8,
        padding: '16px 20px',
        fontSize: 12,
        color: '#8A9BB0',
        lineHeight: 1.6,
      }}>
        {t(
          '※ 外部リンクは公式機関のサイトに移動します。PDFは新しいタブで開きます。',
          '※ External links open official organization websites. PDFs open in a new tab.',
        )}
      </div>
    </div>
  );
};

export default ResourceCenter;