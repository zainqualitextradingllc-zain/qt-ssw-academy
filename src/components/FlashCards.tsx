// =============================================
// Module 3: JLPT N4 Flashcard Game
// Card-flip vocabulary/kanji training
// TECH READS®-NECH Training Program
// =============================================

import React, { useState } from 'react';
import { FLASHCARDS } from '../data/flashcards';
import type { Language } from '../types';
import SectionHeader from './ui/SectionHeader';
import ProgressBar from './ui/ProgressBar';
import StatCounter from './ui/StatCounter';
import StatusBadge from './ui/StatusBadge';

interface FlashCardsProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

type GameState = 'intro' | 'playing' | 'summary';

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
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>('all');
  const [sessionReviewed, setSessionReviewed] = useState(0);

  const totalCards = FLASHCARDS.length;
  const filtered = filter === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(f => f.category === filter);

  const card = filtered[currentIndex];
  const masteredPct = Math.round((known.size / totalCards) * 100);
  const reviewedCount = known.size + unknown.size;
  const sessionScore = reviewedCount > 0
    ? Math.round((known.size / reviewedCount) * 100)
    : 0;

  const goNext = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i + 1) % filtered.length), 200);
  };

  const goPrev = () => {
    setFlipped(false);
    setTimeout(() => setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length), 200);
  };

  const markAndAdvance = (isKnown: boolean) => {
    const apply = () => {
      if (isKnown) {
        setKnown(prev => new Set([...prev, card.id]));
        setUnknown(prev => { const s = new Set(prev); s.delete(card.id); return s; });
      } else {
        setUnknown(prev => new Set([...prev, card.id]));
        setKnown(prev => { const s = new Set(prev); s.delete(card.id); return s; });
      }
      setSessionReviewed(n => n + 1);
      goNext();
    };

    if (!flipped) {
      setFlipped(true);
      setTimeout(apply, 450);
    } else {
      apply();
    }
  };

  const markKnown = () => markAndAdvance(true);
  const markUnknown = () => markAndAdvance(false);

  const resetAll = () => {
    setKnown(new Set());
    setUnknown(new Set());
    setCurrentIndex(0);
    setFlipped(false);
    setSessionReviewed(0);
    setGameState('intro');
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentIndex(0);
    setFlipped(false);
    setSessionReviewed(0);
  };

  const categories = ['all', 'noun', 'verb', 'adjective', 'technical'];

  if (!card && gameState === 'playing') {
    return null;
  }

  /* ── INTRO ── */
  if (gameState === 'intro') {
    return (
      <div style={{ padding: '32px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #112236 0%, #1E3A5F 100%)',
          border: '1px solid rgba(232,98,26,0.3)',
          borderRadius: 12,
          padding: '28px 32px',
          marginBottom: 28,
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A' }}>
              TECH READS®-NECH — JLPT N4
            </span>
            <StatusBadge status="new" lang={lang} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE8', margin: '0 0 8px' }}>
            {t('JLPT N4 フラッシュカードゲーム', 'JLPT N4 Flashcard Game')}
          </h1>
          <p style={{ fontSize: 14, color: '#8A9BB0', margin: 0 }}>
            {t(
              '自動車整備に特化したN4語彙をカードめくりで暗記しよう',
              'Memorize automotive-focused N4 vocabulary with interactive flashcards',
            )}
          </p>
        </div>

        <div style={{
          background: '#112236',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '28px',
          marginBottom: 28,
        }}>
          <SectionHeader titleEn="Your Progress" titleJa="学習進捗" lang={lang} />
          <div style={{ marginBottom: 20 }}>
            <ProgressBar value={masteredPct} label={t('習得率', 'Mastery Rate')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
            <StatCounter value={known.size} labelJa="習得済み" labelEn="Mastered" lang={lang} accent="#2E7D52" />
            <StatCounter value={unknown.size} labelJa="要復習" labelEn="Review" lang={lang} accent="#C0392B" />
            <StatCounter value={totalCards} labelJa="総語彙数" labelEn="Total Cards" lang={lang} accent="#2D5A8E" />
            <StatCounter value={`${masteredPct}%`} labelJa="スコア" labelEn="Score" lang={lang} accent="#E8621A" />
          </div>
        </div>

        <button
          onClick={startGame}
          style={{
            background: 'linear-gradient(135deg, #E8621A 0%, #C4521A 100%)',
            border: 'none',
            borderRadius: 8,
            padding: '14px 40px',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'Noto Sans JP, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(232,98,26,0.35)',
          }}
        >
          {t('ゲーム開始', 'Play Game')} →
        </button>
      </div>
    );
  }

  /* ── SUMMARY ── */
  if (gameState === 'summary') {
    return (
      <div style={{ padding: '32px 0' }}>
        <SectionHeader titleEn="Session Complete" titleJa="セッション完了" lang={lang} />

        <div style={{
          background: '#112236',
          border: '2px solid #2E7D52',
          borderRadius: 12,
          padding: '36px 32px',
          textAlign: 'center',
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#2E7D52', fontFamily: 'Rajdhani, sans-serif' }}>
            {sessionScore}%
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE8', marginBottom: 8 }}>
            {t('セッションスコア', 'Session Score')}
          </div>
          <div style={{ fontSize: 14, color: '#8A9BB0' }}>
            {known.size} / {totalCards} {t('語彙を習得', 'words mastered')}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 28 }}>
          <StatCounter value={sessionReviewed} labelJa="今回の復習" labelEn="Reviewed" lang={lang} accent="#D4A843" />
          <StatCounter value={known.size} labelJa="習得済み" labelEn="Mastered" lang={lang} accent="#2E7D52" />
          <StatCounter value={unknown.size} labelJa="要復習" labelEn="Again" lang={lang} accent="#C0392B" />
          <StatCounter value={`${masteredPct}%`} labelJa="総合習得率" labelEn="Overall" lang={lang} accent="#E8621A" />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={startGame} style={btnStyle('primary')}>
            {t('もう一度プレイ', 'Play Again')} →
          </button>
          <button onClick={resetAll} style={btnStyle('secondary')}>
            {t('進捗をリセット', 'Reset Progress')}
          </button>
        </div>
      </div>
    );
  }

  /* ── PLAYING ── */
  return (
    <div style={{ padding: '32px 0' }}>
      {/* Live score header */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '18px 22px',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8' }}>
              {t('フラッシュカード', 'Flashcards')}
            </span>
            <StatusBadge status="new" lang={lang} />
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8A9BB0' }}>
            <span>{t('習得', 'Mastered')}: <strong style={{ color: '#4CAF7A' }}>{known.size}</strong></span>
            <span>{t('スコア', 'Score')}: <strong style={{ color: '#E8621A' }}>{sessionScore}%</strong></span>
          </div>
        </div>
        <ProgressBar
          value={masteredPct}
          label={t('総合習得率', 'Overall Mastery')}
        />
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setCurrentIndex(0); setFlipped(false); }}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: filter === cat ? '1px solid #E8621A' : '1px solid rgba(255,255,255,0.12)',
              background: filter === cat ? 'rgba(232,98,26,0.15)' : 'transparent',
              color: filter === cat ? '#E8621A' : '#8A9BB0',
              fontSize: 12,
              fontFamily: 'Noto Sans JP, sans-serif',
              cursor: 'pointer',
              fontWeight: filter === cat ? 600 : 400,
            }}
          >
            {cat === 'all'
              ? t('すべて', 'All')
              : lang === 'ja' ? CATEGORY_LABELS[cat].ja : CATEGORY_LABELS[cat].en}
          </button>
        ))}
      </div>

      {/* 3D flip card */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
        <div className="flashcard-scene" onClick={() => setFlipped(f => !f)} style={{ cursor: 'pointer' }}>
          <div className={`flashcard-inner${flipped ? ' is-flipped' : ''}`}>
            {/* Front — kanji + reading */}
            <div className="flashcard-face flashcard-front">
              <CardMeta
                index={currentIndex}
                total={filtered.length}
                category={card.category}
                lang={lang}
                known={known.has(card.id)}
                unknown={unknown.has(card.id)}
              />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 72, fontWeight: 900, color: '#F0EDE8', fontFamily: 'Noto Sans JP, sans-serif', lineHeight: 1.1, marginBottom: 14 }}>
                  {card.kanji}
                </div>
                <div style={{ fontSize: 22, color: '#D4A843', marginBottom: 24, letterSpacing: '0.08em' }}>
                  {card.reading}
                </div>
                <div style={{ fontSize: 12, color: '#8A9BB0', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: 6, padding: '8px 16px' }}>
                  {t('タップして意味を見る', 'Tap to reveal meaning')} ↻
                </div>
              </div>
            </div>

            {/* Back — meaning + example */}
            <div className="flashcard-face flashcard-back">
              <CardMeta
                index={currentIndex}
                total={filtered.length}
                category={card.category}
                lang={lang}
                known={known.has(card.id)}
                unknown={unknown.has(card.id)}
              />
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#F0EDE8', marginBottom: 10 }}>
                  {card.meaning}
                </div>
                <div style={{ fontSize: 16, color: '#D4A843', marginBottom: 24 }}>
                  {card.kanji}（{card.reading}）
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderLeft: '3px solid #E8621A',
                  borderRadius: '0 8px 8px 0',
                  padding: '14px 18px',
                  textAlign: 'left',
                  width: '100%',
                }}>
                  <div style={{ fontSize: 14, color: '#F0EDE8', marginBottom: 6, lineHeight: 1.6 }}>
                    {card.exampleJa}
                  </div>
                  <div style={{ fontSize: 13, color: '#8A9BB0', lineHeight: 1.5 }}>
                    {card.exampleEn}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={goPrev} style={btnStyle('secondary')}>{t('前へ', 'Prev')}</button>
        <button onClick={markUnknown} style={btnStyle('danger')}>{t('もう一度', 'Again')}</button>
        <button onClick={markKnown} style={btnStyle('success')}>{t('わかった', 'Got it')}</button>
        <button onClick={goNext} style={btnStyle('secondary')}>{t('次へ', 'Next')}</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <button
          onClick={() => setGameState('summary')}
          style={{ ...btnStyle('secondary'), fontSize: 12, padding: '8px 20px' }}
        >
          {t('セッション結果を見る', 'View Session Results')}
        </button>
      </div>

      {/* Vocabulary list grid */}
      <div>
        <SectionHeader
          titleEn={`Vocabulary List (${totalCards} words)`}
          titleJa={`語彙リスト（全${totalCards}語）`}
          lang={lang}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
          {FLASHCARDS.map(fc => (
            <div key={fc.id} style={{
              background: '#112236',
              border: `1px solid ${known.has(fc.id) ? 'rgba(46,125,82,0.4)' : unknown.has(fc.id) ? 'rgba(192,57,43,0.35)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 8,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                background: known.has(fc.id) ? '#2E7D52' : unknown.has(fc.id) ? '#C0392B' : 'rgba(255,255,255,0.2)',
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', marginRight: 8 }}>{fc.kanji}</span>
                <span style={{ fontSize: 12, color: '#8A9BB0' }}>{fc.reading}</span>
              </div>
              <div style={{ fontSize: 12, color: '#8A9BB0', flexShrink: 0 }}>
                {fc.meaning}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardMetaProps {
  index: number;
  total: number;
  category: string;
  lang: Language;
  known: boolean;
  unknown: boolean;
}

const CardMeta: React.FC<CardMetaProps> = ({ index, total, category, lang, known, unknown }) => (
  <>
    <div style={{ position: 'absolute', top: 16, left: 20, fontSize: 11, color: '#8A9BB0', fontFamily: 'Rajdhani, sans-serif' }}>
      {index + 1} / {total}
    </div>
    <div style={{
      position: 'absolute', top: 16, right: 20,
      padding: '3px 10px', borderRadius: 4,
      background: `${CATEGORY_COLORS[category]}22`,
      border: `1px solid ${CATEGORY_COLORS[category]}55`,
      fontSize: 11, color: CATEGORY_COLORS[category],
      fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
    }}>
      {lang === 'ja' ? CATEGORY_LABELS[category].ja : CATEGORY_LABELS[category].en}
    </div>
    {(known || unknown) && (
      <div style={{
        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
        fontSize: 10, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif',
        color: known ? '#4CAF7A' : '#E07070',
      }}>
        {known ? '✓' : '✗'}
      </div>
    )}
  </>
);

const btnStyle = (variant: 'primary' | 'secondary' | 'danger' | 'success'): React.CSSProperties => {
  const colors = {
    primary: { bg: 'linear-gradient(135deg, #E8621A 0%, #C4521A 100%)', border: 'transparent', color: '#fff' },
    secondary: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.15)', color: '#F0EDE8' },
    danger: { bg: 'rgba(192,57,43,0.15)', border: 'rgba(192,57,43,0.4)', color: '#E07070' },
    success: { bg: 'rgba(46,125,82,0.15)', border: 'rgba(46,125,82,0.4)', color: '#4CAF7A' },
  };
  const c = colors[variant];
  return {
    padding: '10px 24px',
    background: c.bg,
    border: `1px solid ${c.border}`,
    borderRadius: 8,
    color: c.color,
    fontSize: 14,
    fontFamily: 'Noto Sans JP, sans-serif',
    fontWeight: 600,
    cursor: 'pointer',
    minWidth: 100,
  };
};

export default FlashCards;