// =============================================
// QT SSW ACADEMY — JLPT N4 Flashcard Component
// Automotive vocabulary training
// TECH READS®-NECH Training Program
// =============================================

import React, { useState } from 'react';
import { FLASHCARDS } from '../data/flashcards';
import type { Language } from '../types';

interface FlashCardsProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

const CATEGORY_COLORS: Record<string, string> = {
  noun: '#2D5A8E',
  verb: '#E8621A',
  adjective: '#2E7D52',
  technical: '#D4A843',
};

const CATEGORY_LABELS: Record<string, { ja: string; en: string }> = {
  noun: { ja: '名詞', en: 'Noun' },
  verb: { ja: '動詞', en: 'Verb' },
  adjective: { ja: '形容詞', en: 'Adj.' },
  technical: { ja: '専門語', en: 'Technical' },
};

const FlashCards: React.FC<FlashCardsProps> = ({ lang, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(f => f.category === filter);

  const card = filtered[currentIndex];
  const progress = Math.round((known.size / FLASHCARDS.length) * 100);

  const goNext = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i + 1) % filtered.length), 150);
  };

  const goPrev = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length), 150);
  };

  const markKnown = () => {
    setKnown(prev => new Set([...prev, card.id]));
    setUnknown(prev => { const s = new Set(prev); s.delete(card.id); return s; });
    goNext();
  };

  const markUnknown = () => {
    setUnknown(prev => new Set([...prev, card.id]));
    setKnown(prev => { const s = new Set(prev); s.delete(card.id); return s; });
    goNext();
  };

  const resetAll = () => {
    setKnown(new Set());
    setUnknown(new Set());
    setCurrentIndex(0);
    setFlipped(false);
  };

  const categories = ['all', 'noun', 'verb', 'adjective', 'technical'];

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 4 }}>
            TECH READS®-NECH — JLPT N4
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE8' }}>
            {t('語彙フラッシュカード', 'Vocabulary Flashcards')}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#8A9BB0', marginBottom: 4 }}>{t('習得済み', 'Mastered')}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#2E7D52', fontFamily: 'Rajdhani, sans-serif' }}>
            {known.size} / {FLASHCARDS.length}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #E8621A, #D4A843)',
          borderRadius: 2,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setCurrentIndex(0); setFlipped(false); }}
            style={{
              padding: '5px 14px',
              borderRadius: 4,
              border: filter === cat ? '1px solid #E8621A' : '1px solid rgba(255,255,255,0.12)',
              background: filter === cat ? 'rgba(232,98,26,0.15)' : 'transparent',
              color: filter === cat ? '#E8621A' : '#8A9BB0',
              fontSize: 12,
              fontFamily: 'Noto Sans JP, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: filter === cat ? 600 : 400,
            }}
          >
            {cat === 'all'
              ? t('すべて', 'All')
              : lang === 'ja'
                ? CATEGORY_LABELS[cat].ja
                : CATEGORY_LABELS[cat].en}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div
          onClick={() => setFlipped(f => !f)}
          style={{
            width: '100%',
            maxWidth: 560,
            minHeight: 320,
            background: flipped ? '#1E3A5F' : '#112236',
            border: `2px solid ${flipped ? '#E8621A' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 12,
            padding: '40px 36px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            userSelect: 'none',
          }}
        >
          {/* Card number */}
          <div style={{
            position: 'absolute',
            top: 16,
            left: 20,
            fontSize: 11,
            color: '#8A9BB0',
            fontFamily: 'Rajdhani, sans-serif',
          }}>
            {currentIndex + 1} / {filtered.length}
          </div>

          {/* Category badge */}
          <div style={{
            position: 'absolute',
            top: 16,
            right: 20,
            padding: '3px 10px',
            borderRadius: 3,
            background: `${CATEGORY_COLORS[card.category]}22`,
            border: `1px solid ${CATEGORY_COLORS[card.category]}55`,
            fontSize: 11,
            color: CATEGORY_COLORS[card.category],
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.08em',
          }}>
            {lang === 'ja' ? CATEGORY_LABELS[card.category].ja : CATEGORY_LABELS[card.category].en}
          </div>

          {/* Status indicator */}
          {(known.has(card.id) || unknown.has(card.id)) && (
            <div style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8, height: 8,
              borderRadius: '50%',
              background: known.has(card.id) ? '#2E7D52' : '#C0392B',
            }} />
          )}

          {!flipped ? (
            /* Front */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 64,
                fontWeight: 900,
                color: '#F0EDE8',
                fontFamily: 'Noto Sans JP, sans-serif',
                lineHeight: 1.1,
                marginBottom: 12,
              }}>
                {card.kanji}
              </div>
              <div style={{ fontSize: 18, color: '#8A9BB0', marginBottom: 20 }}>
                {card.reading}
              </div>
              <div style={{
                fontSize: 12,
                color: '#8A9BB0',
                border: '1px dashed rgba(255,255,255,0.15)',
                borderRadius: 4,
                padding: '6px 14px',
              }}>
                {t('クリックして意味を見る', 'Click to reveal meaning')}
              </div>
            </div>
          ) : (
            /* Back */
            <div style={{ textAlign: 'center', width: '100%' }}>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#F0EDE8',
                marginBottom: 8,
              }}>
                {card.meaning}
              </div>
              <div style={{
                fontSize: 14,
                color: '#8A9BB0',
                marginBottom: 20,
                fontStyle: 'italic',
              }}>
                {card.kanji}（{card.reading}）
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                borderLeft: '3px solid #E8621A',
                borderRadius: '0 6px 6px 0',
                padding: '12px 16px',
                textAlign: 'left',
                marginBottom: 8,
              }}>
                <div style={{ fontSize: 13, color: '#F0EDE8', marginBottom: 4 }}>
                  {card.exampleJa}
                </div>
                <div style={{ fontSize: 12, color: '#8A9BB0' }}>
                  {card.exampleEn}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button onClick={goPrev} style={btnStyle('secondary')}>
          {t('前へ', 'Prev')}
        </button>
        <button onClick={markUnknown} style={btnStyle('danger')}>
          {t('もう一度', 'Again')}
        </button>
        <button onClick={markKnown} style={btnStyle('success')}>
          {t('わかった', 'Got it')}
        </button>
        <button onClick={goNext} style={btnStyle('secondary')}>
          {t('次へ', 'Next')}
        </button>
      </div>

      {/* Reset */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={resetAll} style={{
          background: 'transparent',
          border: 'none',
          color: '#8A9BB0',
          fontSize: 12,
          cursor: 'pointer',
          textDecoration: 'underline',
          fontFamily: 'Noto Sans JP, sans-serif',
        }}>
          {t('進捗をリセット', 'Reset progress')}
        </button>
      </div>

      {/* Vocab list */}
      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#D4A843', letterSpacing: '0.1em', marginBottom: 16 }}>
          {t('語彙リスト（全20語）', 'VOCABULARY LIST (20 words)')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
          {FLASHCARDS.map(fc => (
            <div key={fc.id} style={{
              background: '#112236',
              border: `1px solid ${known.has(fc.id) ? 'rgba(46,125,82,0.4)' : unknown.has(fc.id) ? 'rgba(192,57,43,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 6,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: known.has(fc.id) ? '#2E7D52' : unknown.has(fc.id) ? '#C0392B' : 'rgba(255,255,255,0.2)',
              }} />
              <div>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8', marginRight: 8 }}>{fc.kanji}</span>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>{fc.reading}</span>
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 12, color: '#8A9BB0' }}>
                {fc.meaning}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const btnStyle = (variant: 'secondary' | 'danger' | 'success'): React.CSSProperties => {
  const colors = {
    secondary: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', color: '#F0EDE8' },
    danger: { bg: 'rgba(192,57,43,0.15)', border: 'rgba(192,57,43,0.4)', color: '#e74c3c' },
    success: { bg: 'rgba(46,125,82,0.15)', border: 'rgba(46,125,82,0.4)', color: '#2ecc71' },
  };
  const c = colors[variant];
  return {
    padding: '10px 24px',
    background: c.bg,
    border: `1px solid ${c.border}`,
    borderRadius: 6,
    color: c.color,
    fontSize: 14,
    fontFamily: 'Noto Sans JP, sans-serif',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    minWidth: 100,
  };
};

export default FlashCards;
