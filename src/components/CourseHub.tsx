// =============================================
// Module 1: SSW Type 1 / Course Hub Landing Page
// Matches qualitex-trading.com Learning Hub layout
// =============================================

import React from 'react';
import { useCourseStats } from '../hooks/useCourseStats';
import type { Course, Language, TabId } from '../types';
import type { BadgeStatus } from './ui/StatusBadge';
import SectionHeader from './ui/SectionHeader';
import StatCounter from './ui/StatCounter';
import ProgressBar from './ui/ProgressBar';
import QuickActionCard from './ui/QuickActionCard';
import StatusBadge from './ui/StatusBadge';

interface CourseHubProps {
  lang: Language;
  t: (ja: string, en: string) => string;
  onNavigate?: (tab: TabId) => void;
}

const QUICK_ACTIONS: { icon: string; titleJa: string; titleEn: string; tab: TabId }[] = [
  { icon: '🎯', titleJa: '学習ダッシュボード', titleEn: 'SSW Type 1 Dashboard', tab: 'dashboard' },
  { icon: '🎴', titleJa: 'N4 フラッシュカード', titleEn: 'JLPT N4 Flashcards', tab: 'flashcards' },
  { icon: '📝', titleJa: '模擬試験', titleEn: 'SSW Mock Exam', tab: 'quiz' },
  { icon: '📋', titleJa: '資料・ダウンロード', titleEn: 'Resources & Downloads', tab: 'resources' },
];

const courseStatus = (progress: number): BadgeStatus => {
  if (progress === 100) return 'completed';
  if (progress > 0) return 'in-progress';
  return 'available';
};

interface SectionCardProps {
  course: Course;
  index: number;
  lang: Language;
  t: (ja: string, en: string) => string;
  onStartQuiz?: () => void;
}

const SECTION_COLORS = ['#2D5A8E', '#2E7D52', '#D4A843', '#E8621A', '#8A9BB0', '#C4521A'];
const SECTION_ICONS = ['📘', '📗', '📕', '📙', '📔', '📓'];

const SectionCard: React.FC<SectionCardProps> = ({ course, index, lang, t, onStartQuiz }) => {
  const status = courseStatus(course.progress);
  const accent = SECTION_COLORS[index % SECTION_COLORS.length];

  return (
    <div style={{
      background: '#112236',
      border: '1px solid rgba(255,255,255,0.08)',
      borderLeft: `4px solid ${accent}`,
      borderRadius: 10,
      padding: '24px 26px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 36, lineHeight: 1 }}>{SECTION_ICONS[index] ?? course.icon}</span>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.12em', color: accent, marginBottom: 4 }}>
              {t(`セクション ${index + 1}`, `Section ${index + 1}`)}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE8', lineHeight: 1.25 }}>
              {lang === 'ja' ? course.titleJa : course.titleEn}
            </div>
            <div style={{ fontSize: 12, color: '#8A9BB0', marginTop: 4 }}>
              {lang === 'ja' ? course.titleEn : course.titleJa}
            </div>
          </div>
        </div>
        <StatusBadge status={status} lang={lang} />
      </div>

      <p style={{ fontSize: 13, color: '#8A9BB0', lineHeight: 1.6, margin: 0 }}>
        {lang === 'ja' ? course.descJa : course.descEn}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 8,
        padding: '14px 16px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', fontFamily: 'Rajdhani, sans-serif' }}>
            {course.totalLessons}
          </div>
          <div style={{ fontSize: 10, color: '#8A9BB0', marginTop: 2 }}>
            {t('レッスン数', 'Lessons')}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', fontFamily: 'Rajdhani, sans-serif' }}>
            {course.difficulty}
          </div>
          <div style={{ fontSize: 10, color: '#8A9BB0', marginTop: 2 }}>
            {t('難易度', 'Difficulty')}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2E7D52', fontFamily: 'Rajdhani, sans-serif' }}>
            {course.completedLessons}
          </div>
          <div style={{ fontSize: 10, color: '#8A9BB0', marginTop: 2 }}>
            {t('完了', 'Completed')}
          </div>
        </div>
      </div>

      <ProgressBar
        value={course.progress}
        label={t('進捗状況', 'Progress')}
      />

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={onStartQuiz}
          style={{
            flex: 1,
            minWidth: 140,
            padding: '10px 18px',
            background: 'linear-gradient(135deg, #E8621A 0%, #C4521A 100%)',
            border: 'none',
            borderRadius: 6,
            color: '#F0EDE8',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Noto Sans JP, sans-serif',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          {t('クイズ開始', 'Start Quiz')} →
        </button>
        <button
          style={{
            flex: 1,
            minWidth: 140,
            padding: '10px 18px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 6,
            color: '#8A9BB0',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'default',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          {t('トピック一覧', 'Topic List')}
        </button>
      </div>
    </div>
  );
};

const CourseHub: React.FC<CourseHubProps> = ({ lang, t, onNavigate }) => {
  const stats = useCourseStats();

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
        <div style={{
          display: 'inline-block',
          background: 'rgba(212,168,67,0.15)',
          border: '1px solid rgba(212,168,67,0.4)',
          borderRadius: 4,
          padding: '4px 12px',
          fontSize: 11,
          fontWeight: 700,
          color: '#D4A843',
          letterSpacing: '0.1em',
          marginBottom: 14,
          fontFamily: 'Rajdhani, sans-serif',
        }}>
          {t('国家資格対策コース', 'National Certification Prep')}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F0EDE8', margin: '0 0 8px', lineHeight: 1.2 }}>
          {t('三級ガソリン及びシャシ整備士', 'SSW Type 1 Automotive Maintenance')}
        </h1>
        <p style={{ fontSize: 15, color: '#8A9BB0', margin: 0 }}>
          {t(
            'インタラクティブ学習プラットフォーム — 全コースで合格を目指そう',
            'Interactive learning platform — aim for certification across all courses',
          )}
        </p>
      </div>

      {/* Stats bar — all values from courses.ts via useCourseStats */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: '28px',
        marginBottom: 28,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}>
        <SectionHeader
          titleEn="Learning Progress"
          titleJa="学習進捗状況"
          lang={lang}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#E8621A',
            fontFamily: 'Rajdhani, sans-serif',
            lineHeight: 1,
          }}>
            {stats.overallProgress}%
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 12, color: '#8A9BB0', marginBottom: 8 }}>
              {t('総合進捗', 'Overall Progress')}
            </div>
            <ProgressBar value={stats.overallProgress} showPercent={false} height={14} />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 14,
        }}>
          <StatCounter
            value={`${stats.modulesInProgress + stats.modulesCompleted}/${stats.modulesTotal}`}
            labelJa="モジュール"
            labelEn="Modules"
            subJa={`${stats.modulesCompleted} ${t('修了', 'completed')}`}
            subEn={`${stats.modulesCompleted} completed`}
            lang={lang}
            accent="#D4A843"
          />
          <StatCounter
            value={`${stats.hoursCompleted}/${stats.hoursTotal}`}
            labelJa="レッスン"
            labelEn="Lessons"
            subJa={t('完了 / 総数', 'done / total')}
            subEn="done / total"
            lang={lang}
            accent="#2D5A8E"
          />
          <StatCounter
            value={stats.certificates}
            labelJa="証明書"
            labelEn="Certificates"
            subJa={t('100%修了コース', '100% completed courses')}
            subEn="100% completed courses"
            lang={lang}
            accent="#2E7D52"
          />
          <StatCounter
            value={`${stats.overallProgress}%`}
            labelJa="クイズスコア"
            labelEn="Quiz Score"
            subJa={t('総合進捗に基づく', 'based on overall progress')}
            subEn="based on overall progress"
            lang={lang}
            accent="#E8621A"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader titleEn="Quick Actions" titleJa="クイックアクション" lang={lang} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
        className="quick-actions-grid"
        >
          {QUICK_ACTIONS.map(action => (
            <QuickActionCard
              key={action.tab}
              icon={action.icon}
              titleJa={action.titleJa}
              titleEn={action.titleEn}
              lang={lang}
              onClick={() => onNavigate?.(action.tab)}
            />
          ))}
        </div>
      </div>

      {/* Course sections from courses.ts */}
      <div>
        <SectionHeader
          titleEn="Learning Modules"
          titleJa="学習モジュール"
          lang={lang}
          subtitle={t(
            `${stats.modulesTotal}コース · 平均進捗 ${stats.overallProgress}%`,
            `${stats.modulesTotal} courses · ${stats.overallProgress}% avg. progress`,
          )}
        />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {stats.courses.map((course, index) => (
            <SectionCard
              key={course.id}
              course={course}
              index={index}
              lang={lang}
              t={t}
              onStartQuiz={() => onNavigate?.('quiz')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseHub;