// =============================================
// QT SSW ACADEMY — Quiz Engine Component
// SSW-1 Automotive Maintenance exam prep
// QT Drive Innovations® × TECH READS®-NECH
// =============================================

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import type { Language } from '../types';

interface QuizProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

type QuizState = 'intro' | 'question' | 'result';

const Quiz: React.FC<QuizProps> = ({ lang, t }) => {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);

  const question = QUIZ_QUESTIONS[currentQ];
  const totalQ = QUIZ_QUESTIONS.length;
  const correctCount = scores.filter(Boolean).length;
  const pct = Math.round((correctCount / totalQ) * 100);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setScores(prev => [...prev, idx === question.correctIndex]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQ) {
      setState('result');
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScores([]);
  };

  const getOptionStyle = (idx: number): React.CSSProperties => {
    if (!answered) {
      return {
        background: selected === idx ? 'rgba(232,98,26,0.1)' : '#112236',
        border: selected === idx ? '1px solid #E8621A' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: '14px 18px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        color: '#F0EDE8',
        fontSize: 14,
        fontFamily: 'Noto Sans JP, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
      };
    }
    if (idx === question.correctIndex) {
      return {
        background: 'rgba(46,125,82,0.2)',
        border: '1px solid rgba(46,125,82,0.6)',
        borderRadius: 8,
        padding: '14px 18px',
        cursor: 'default',
        color: '#2ecc71',
        fontSize: 14,
        fontFamily: 'Noto Sans JP, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
      };
    }
    if (idx === selected && idx !== question.correctIndex) {
      return {
        background: 'rgba(192,57,43,0.15)',
        border: '1px solid rgba(192,57,43,0.5)',
        borderRadius: 8,
        padding: '14px 18px',
        cursor: 'default',
        color: '#e74c3c',
        fontSize: 14,
        fontFamily: 'Noto Sans JP, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
      };
    }
    return {
      background: '#112236',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 8,
      padding: '14px 18px',
      cursor: 'default',
      color: '#8A9BB0',
      fontSize: 14,
      fontFamily: 'Noto Sans JP, sans-serif',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10,
      opacity: 0.6,
    };
  };

  const getResultGrade = () => {
    if (pct >= 90) return { ja: '優秀', en: 'Excellent', color: '#D4A843' };
    if (pct >= 70) return { ja: '合格', en: 'Pass', color: '#2E7D52' };
    if (pct >= 50) return { ja: '要復習', en: 'Review needed', color: '#E8621A' };
    return { ja: '要再学習', en: 'Re-study required', color: '#C0392B' };
  };

  if (state === 'intro') {
    return (
      <div style={{ padding: '32px 0' }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 8 }}>
          TECH READS®-NECH — SSW-1 EXAM PREP
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', marginBottom: 8 }}>
          {t('自動車整備 クイズ', 'Automotive Maintenance Quiz')}
        </div>
        <div style={{ fontSize: 14, color: '#8A9BB0', marginBottom: 36 }}>
          {t(
            '特定技能1号（自動車整備）試験対策。全10問、各問1点。',
            'SSW-1 Automotive Maintenance exam prep. 10 questions, 1 point each.'
          )}
        </div>

        <div style={{
          background: '#112236',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '28px',
          maxWidth: 520,
          marginBottom: 32,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { ja: '問題数', en: 'Questions', val: '10' },
              { ja: '制限時間', en: 'Time limit', val: t('なし', 'None') },
              { ja: '合格ライン', en: 'Pass score', val: '70%' },
              { ja: '範囲', en: 'Scope', val: t('全コース', 'All courses') },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#8A9BB0', marginBottom: 4 }}>
                  {lang === 'ja' ? item.ja : item.en}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE8', fontFamily: 'Rajdhani, sans-serif' }}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: '#8A9BB0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
            {t(
              '※ このクイズはTECH READS®-NECHのSSW-1試験対策プログラムの一部です。実際の試験問題とは異なる場合があります。',
              '※ This quiz is part of the TECH READS®-NECH SSW-1 exam preparation program. Questions may differ from the actual exam.'
            )}
          </div>
        </div>

        <button
          onClick={() => setState('question')}
          style={{
            background: '#E8621A',
            border: 'none',
            borderRadius: 8,
            padding: '14px 40px',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'Noto Sans JP, sans-serif',
            cursor: 'pointer',
            letterSpacing: '0.05em',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#C4521A')}
          onMouseLeave={e => (e.currentTarget.style.background = '#E8621A')}
        >
          {t('クイズを開始する', 'Start Quiz')}
        </button>
      </div>
    );
  }

  if (state === 'result') {
    const grade = getResultGrade();
    return (
      <div style={{ padding: '32px 0' }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 8 }}>
          QUIZ COMPLETE
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', marginBottom: 28 }}>
          {t('結果', 'Results')}
        </div>

        <div style={{
          background: '#112236',
          border: `2px solid ${grade.color}`,
          borderRadius: 12,
          padding: '36px',
          maxWidth: 480,
          textAlign: 'center',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: grade.color, fontFamily: 'Rajdhani, sans-serif', lineHeight: 1 }}>
            {pct}%
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: grade.color, marginBottom: 8 }}>
            {lang === 'ja' ? grade.ja : grade.en}
          </div>
          <div style={{ fontSize: 14, color: '#8A9BB0', marginBottom: 24 }}>
            {correctCount} / {totalQ} {t('問正解', 'correct')}
          </div>

          {/* Per-question breakdown */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
            {scores.map((correct, i) => (
              <div key={i} style={{
                width: 32, height: 32,
                borderRadius: 4,
                background: correct ? 'rgba(46,125,82,0.3)' : 'rgba(192,57,43,0.3)',
                border: `1px solid ${correct ? 'rgba(46,125,82,0.6)' : 'rgba(192,57,43,0.5)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: correct ? '#2ecc71' : '#e74c3c',
                fontFamily: 'Rajdhani, sans-serif',
              }}>
                Q{i + 1}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={handleRestart}
            style={{
              background: '#E8621A',
              border: 'none',
              borderRadius: 8,
              padding: '12px 28px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Noto Sans JP, sans-serif',
              cursor: 'pointer',
            }}
          >
            {t('もう一度挑戦', 'Try again')}
          </button>
        </div>
      </div>
    );
  }

  // Question state
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: '#8A9BB0' }}>
          {t('問題', 'Question')} {currentQ + 1} / {totalQ}
        </div>
        <div style={{ fontSize: 12, color: '#8A9BB0' }}>
          {t('正解', 'Correct')}: {scores.filter(Boolean).length}
        </div>
      </div>
      <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 28, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((currentQ) / totalQ) * 100}%`,
          background: '#E8621A',
          borderRadius: 2,
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Question */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: '4px solid #E8621A',
        borderRadius: '0 8px 8px 0',
        padding: '20px 24px',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 11, color: '#E8621A', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', marginBottom: 8 }}>
          Q{currentQ + 1}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', lineHeight: 1.6 }}>
          {lang === 'ja' ? question.questionJa : question.questionEn}
        </div>
      </div>

      {/* Options */}
      <div style={{ marginBottom: 20 }}>
        {question.options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(idx)}
            style={getOptionStyle(idx)}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 4,
              background: answered && idx === question.correctIndex
                ? 'rgba(46,125,82,0.3)'
                : answered && idx === selected && idx !== question.correctIndex
                  ? 'rgba(192,57,43,0.3)'
                  : 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, flexShrink: 0,
              fontFamily: 'Rajdhani, sans-serif',
              color: 'inherit',
            }}>
              {optionLabels[idx]}
            </div>
            <span>{lang === 'ja' ? opt.ja : opt.en}</span>
          </div>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div style={{
          background: selected === question.correctIndex
            ? 'rgba(46,125,82,0.1)'
            : 'rgba(232,98,26,0.08)',
          border: `1px solid ${selected === question.correctIndex ? 'rgba(46,125,82,0.4)' : 'rgba(232,98,26,0.3)'}`,
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 12,
            fontWeight: 700,
            color: selected === question.correctIndex ? '#2ecc71' : '#E8621A',
            marginBottom: 6,
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.08em',
          }}>
            {selected === question.correctIndex
              ? t('正解', 'CORRECT')
              : t('不正解', 'INCORRECT')}
          </div>
          <div style={{ fontSize: 13, color: '#F0EDE8', lineHeight: 1.6 }}>
            {lang === 'ja' ? question.explanationJa : question.explanationEn}
          </div>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          style={{
            background: '#E8621A',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'Noto Sans JP, sans-serif',
            cursor: 'pointer',
          }}
        >
          {currentQ + 1 >= totalQ
            ? t('結果を見る', 'See results')
            : t('次の問題', 'Next question')}
        </button>
      )}
    </div>
  );
};

export default Quiz;
