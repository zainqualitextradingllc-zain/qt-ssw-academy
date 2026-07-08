// =============================================
// Module 2: Mock Exam / Quiz Page
// SSW-1 Automotive Maintenance exam prep
// QT Drive Innovations® × TECH READS®-NECH
// =============================================

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { COURSES } from '../data/courses';
import type { Language } from '../types';
import SectionHeader from './ui/SectionHeader';
import ProgressBar from './ui/ProgressBar';
import StatCounter from './ui/StatCounter';
import StatusBadge from './ui/StatusBadge';

interface QuizProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

type QuizState = 'intro' | 'question' | 'result';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const PASS_THRESHOLD = 70;

const Quiz: React.FC<QuizProps> = ({ lang, t }) => {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);

  const question = QUIZ_QUESTIONS[currentQ];
  const totalQ = QUIZ_QUESTIONS.length;
  const correctCount = scores.filter(Boolean).length;
  const incorrectCount = scores.length - correctCount;
  const pct = scores.length > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const progressPct = Math.round((scores.length / totalQ) * 100);
  const passed = pct >= PASS_THRESHOLD;

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

  const getResultGrade = () => {
    if (pct >= 90) return { ja: '優秀', en: 'Excellent', color: '#D4A843', status: 'completed' as const };
    if (pct >= PASS_THRESHOLD) return { ja: '合格', en: 'Pass', color: '#2E7D52', status: 'completed' as const };
    if (pct >= 50) return { ja: '要復習', en: 'Review Needed', color: '#E8621A', status: 'in-progress' as const };
    return { ja: '要再学習', en: 'Re-study Required', color: '#C0392B', status: 'available' as const };
  };

  const getCourseName = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return courseId;
    return lang === 'ja' ? course.titleJa : course.titleEn;
  };

  const getOptionStyle = (idx: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      borderRadius: 10,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 12,
      fontSize: 14,
      fontFamily: 'Noto Sans JP, sans-serif',
      transition: 'all 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    };

    if (!answered) {
      return {
        ...base,
        background: selected === idx ? 'rgba(232,98,26,0.12)' : '#112236',
        border: selected === idx ? '1px solid #E8621A' : '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        color: '#F0EDE8',
      };
    }
    if (idx === question.correctIndex) {
      return {
        ...base,
        background: 'rgba(46,125,82,0.18)',
        border: '1px solid rgba(46,125,82,0.6)',
        cursor: 'default',
        color: '#4CAF7A',
      };
    }
    if (idx === selected && idx !== question.correctIndex) {
      return {
        ...base,
        background: 'rgba(192,57,43,0.15)',
        border: '1px solid rgba(192,57,43,0.5)',
        cursor: 'default',
        color: '#E07070',
      };
    }
    return {
      ...base,
      background: '#0D1A28',
      border: '1px solid rgba(255,255,255,0.05)',
      cursor: 'default',
      color: '#8A9BB0',
      opacity: 0.55,
    };
  };

  /* ── INTRO ── */
  if (state === 'intro') {
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
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 10 }}>
            TECH READS®-NECH — SSW-1 EXAM PREP
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE8', margin: '0 0 8px' }}>
            {t('特定技能模擬試験', 'SSW Mock Examination')}
          </h1>
          <p style={{ fontSize: 14, color: '#8A9BB0', margin: 0 }}>
            {t(
              '自動車整備技能登録試験の模擬試験 — 全コースから出題',
              'Automotive maintenance skill registration mock exam — all courses covered',
            )}
          </p>
        </div>

        <div style={{
          background: '#112236',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '28px',
          marginBottom: 28,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}>
          <SectionHeader titleEn="Exam Overview" titleJa="試験概要" lang={lang} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 20 }}>
            <StatCounter value={totalQ} labelJa="問題数" labelEn="Questions" lang={lang} accent="#2D5A8E" />
            <StatCounter value={`${PASS_THRESHOLD}%`} labelJa="合格ライン" labelEn="Pass Score" lang={lang} accent="#2E7D52" />
            <StatCounter value={t('なし', 'None')} labelJa="制限時間" labelEn="Time Limit" lang={lang} accent="#D4A843" />
            <StatCounter value={COURSES.length} labelJa="対象コース" labelEn="Courses" lang={lang} accent="#E8621A" />
          </div>
          <p style={{ fontSize: 12, color: '#8A9BB0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, margin: 0, lineHeight: 1.6 }}>
            {t(
              '※ 各問回答後に解説が表示されます。実際の試験問題とは異なる場合があります。',
              '※ Explanations appear after each answer. Questions may differ from the actual exam.',
            )}
          </p>
        </div>

        <button
          onClick={() => setState('question')}
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
          {t('模擬試験を開始する', 'Start Mock Exam')} →
        </button>
      </div>
    );
  }

  /* ── RESULT ── */
  if (state === 'result') {
    const grade = getResultGrade();
    return (
      <div style={{ padding: '32px 0' }}>
        <SectionHeader titleEn="Exam Results" titleJa="試験結果" lang={lang} />

        <div style={{
          background: '#112236',
          border: `2px solid ${grade.color}`,
          borderRadius: 12,
          padding: '36px 32px',
          textAlign: 'center',
          marginBottom: 28,
          boxShadow: `0 8px 32px ${grade.color}22`,
        }}>
          <StatusBadge status={passed ? 'completed' : 'in-progress'} lang={lang} />
          <div style={{ fontSize: 72, fontWeight: 900, color: grade.color, fontFamily: 'Rajdhani, sans-serif', lineHeight: 1, margin: '16px 0 8px' }}>
            {pct}%
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: grade.color, marginBottom: 8 }}>
            {lang === 'ja' ? grade.ja : grade.en}
          </div>
          <div style={{ fontSize: 14, color: '#8A9BB0' }}>
            {correctCount} / {totalQ} {t('問正解', 'correct answers')}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
          <StatCounter value={correctCount} labelJa="正解数" labelEn="Correct" lang={lang} accent="#2E7D52" />
          <StatCounter value={incorrectCount} labelJa="不正解数" labelEn="Incorrect" lang={lang} accent="#C0392B" />
          <StatCounter value={`${pct}%`} labelJa="正答率" labelEn="Accuracy" lang={lang} accent="#E8621A" />
          <StatCounter value={passed ? t('合格', 'Pass') : t('不合格', 'Fail')} labelJa="判定" labelEn="Verdict" lang={lang} accent={passed ? '#2E7D52' : '#C0392B'} />
        </div>

        {/* Per-question breakdown */}
        <div style={{ marginBottom: 28 }}>
          <SectionHeader titleEn="Question Breakdown" titleJa="問題別結果" lang={lang} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {scores.map((correct, i) => {
              const q = QUIZ_QUESTIONS[i];
              return (
                <div key={q.id} style={{
                  background: '#112236',
                  border: `1px solid ${correct ? 'rgba(46,125,82,0.4)' : 'rgba(192,57,43,0.35)'}`,
                  borderLeft: `4px solid ${correct ? '#2E7D52' : '#C0392B'}`,
                  borderRadius: 8,
                  padding: '14px 18px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontFamily: 'Rajdhani, sans-serif', color: '#8A9BB0', letterSpacing: '0.1em' }}>
                      Q{i + 1}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: correct ? '#4CAF7A' : '#E07070',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}>
                      {correct ? t('正解', 'CORRECT') : t('不正解', 'WRONG')}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: '#F0EDE8', lineHeight: 1.45, marginBottom: 6 }}>
                    {lang === 'ja' ? q.questionJa : q.questionEn}
                  </div>
                  <div style={{ fontSize: 11, color: '#8A9BB0' }}>
                    {getCourseName(q.courseId)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleRestart}
          style={{
            background: 'linear-gradient(135deg, #E8621A 0%, #C4521A 100%)',
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
          {t('もう一度挑戦', 'Try Again')} →
        </button>
      </div>
    );
  }

  /* ── QUESTION ── */
  const liveScore = scores.length > 0
    ? Math.round((correctCount / scores.length) * 100)
    : 0;

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Live progress header */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '18px 22px',
        marginBottom: 24,
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8' }}>
            {t('問題', 'Question')} {currentQ + 1} / {totalQ}
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#8A9BB0' }}>
            <span>{t('正解', 'Correct')}: <strong style={{ color: '#4CAF7A' }}>{correctCount}</strong></span>
            <span>{t('正答率', 'Score')}: <strong style={{ color: '#E8621A' }}>{liveScore}%</strong></span>
          </div>
        </div>
        <ProgressBar
          value={progressPct}
          label={t('試験進捗', 'Exam Progress')}
          showPercent
        />
      </div>

      {/* Question card */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.1)',
        borderLeft: '4px solid #E8621A',
        borderRadius: '0 12px 12px 0',
        padding: '24px 28px',
        marginBottom: 24,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: '#E8621A', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.12em' }}>
            Q{currentQ + 1}
          </span>
          <span style={{ fontSize: 11, color: '#8A9BB0' }}>
            {getCourseName(question.courseId)}
          </span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#F0EDE8', lineHeight: 1.65 }}>
          {lang === 'ja' ? question.questionJa : question.questionEn}
        </div>
        {lang === 'ja' && (
          <div style={{ fontSize: 12, color: '#8A9BB0', marginTop: 8, fontStyle: 'italic' }}>
            {question.questionEn}
          </div>
        )}
        {lang === 'en' && (
          <div style={{ fontSize: 12, color: '#8A9BB0', marginTop: 8, fontStyle: 'italic' }}>
            {question.questionJa}
          </div>
        )}
      </div>

      {/* Answer options */}
      <div style={{ marginBottom: 20 }}>
        {question.options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(idx)}
            style={getOptionStyle(idx)}
            onMouseEnter={e => {
              if (!answered) e.currentTarget.style.borderColor = '#E8621A';
            }}
            onMouseLeave={e => {
              if (!answered && selected !== idx) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
              fontFamily: 'Rajdhani, sans-serif',
              color: 'inherit',
            }}>
              {OPTION_LABELS[idx]}
            </div>
            <span style={{ lineHeight: 1.5 }}>
              {lang === 'ja' ? opt.ja : opt.en}
            </span>
          </div>
        ))}
      </div>

      {/* Explanation card */}
      {answered && (
        <div style={{
          background: selected === question.correctIndex
            ? 'rgba(46,125,82,0.1)'
            : 'rgba(232,98,26,0.08)',
          border: `1px solid ${selected === question.correctIndex ? 'rgba(46,125,82,0.4)' : 'rgba(232,98,26,0.3)'}`,
          borderRadius: 10,
          padding: '18px 22px',
          marginBottom: 24,
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            fontSize: 12,
            fontWeight: 700,
            color: selected === question.correctIndex ? '#4CAF7A' : '#E8621A',
            marginBottom: 8,
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.08em',
          }}>
            {selected === question.correctIndex
              ? `✓ ${t('正解', 'CORRECT')}`
              : `✗ ${t('不正解', 'INCORRECT')}`}
          </div>
          <div style={{ fontSize: 13, color: '#F0EDE8', lineHeight: 1.65 }}>
            {lang === 'ja' ? question.explanationJa : question.explanationEn}
          </div>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          style={{
            background: 'linear-gradient(135deg, #E8621A 0%, #C4521A 100%)',
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
            ? t('結果を見る', 'See Results')
            : t('次の問題', 'Next Question')} →
        </button>
      )}
    </div>
  );
};

export default Quiz;