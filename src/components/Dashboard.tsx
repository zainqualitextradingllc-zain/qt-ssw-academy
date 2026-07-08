// =============================================
// QT SSW ACADEMY — Dashboard Component
// Inspired by qualitex-trading.com training hub layout
// =============================================

import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import { COURSES } from '../data/courses';
import { FEATURED_RESOURCES, QUICK_ACTIONS } from '../data/resources';
import type { Language } from '../types';
import type { BadgeStatus } from './ui/StatusBadge';
import SectionHeader from './ui/SectionHeader';
import StatCounter from './ui/StatCounter';
import ProgressBar from './ui/ProgressBar';
import QuickActionCard from './ui/QuickActionCard';
import ResourceCard from './ui/ResourceCard';

interface DashboardProps {
  lang: Language;
  t: (ja: string, en: string) => string;
  onNavigate?: (tab: 'dashboard' | 'flashcards' | 'quiz' | 'inspect' | 'certificate') => void;
}

const SKILL_COLORS = ['#E8621A', '#D4A843', '#2D5A8E', '#2E7D52', '#8A9BB0', '#C4521A'];

const courseStatus = (progress: number): BadgeStatus => {
  if (progress === 100) return 'completed';
  if (progress > 0) return 'in-progress';
  return 'available';
};

const Dashboard: React.FC<DashboardProps> = ({ lang, t, onNavigate }) => {
  const radarData = COURSES.map(c => ({
    subject: lang === 'ja' ? c.titleJa.replace('・', '\n') : c.titleEn.split(' ')[0],
    value: c.progress,
    fullMark: 100,
  }));

  const barData = COURSES.map((c, i) => ({
    name: lang === 'ja' ? c.titleJa : c.titleEn.split(' ').slice(0, 2).join(' '),
    progress: c.progress,
    color: SKILL_COLORS[i % SKILL_COLORS.length],
  }));

  const totalProgress = Math.round(COURSES.reduce((s, c) => s + c.progress, 0) / COURSES.length);
  const completedCourses = COURSES.filter(c => c.progress === 100).length;
  const totalLessons = COURSES.reduce((s, c) => s + c.completedLessons, 0);
  const totalModules = COURSES.length;
  const completedModules = COURSES.filter(c => c.progress >= 70).length;

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Hero — matches WP bilingual header pattern */}
      <div style={{
        background: 'linear-gradient(135deg, #112236 0%, #1E3A5F 100%)',
        border: '1px solid rgba(232,98,26,0.3)',
        borderLeft: '4px solid #E8621A',
        borderRadius: 8,
        padding: '24px 28px',
        marginBottom: 28,
      }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 8 }}>
          TECH READS®-NECH • QT DRIVE INNOVATIONS®
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE8', margin: '0 0 6px', lineHeight: 1.2 }}>
          {t('トレーニングプログラム資料', 'Training Program Resources')}
        </h1>
        <p style={{ fontSize: 14, color: '#8A9BB0', margin: 0 }}>
          {t('研修リソースセンター | SSW 1 / JLPT N4', 'Training Resource Center | SSW 1 / JLPT N4')}
        </p>
      </div>

      {/* Overall progress — WP "Overall Training Progress" block */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '24px 28px',
        marginBottom: 28,
      }}>
        <SectionHeader
          titleEn="Overall Training Progress"
          titleJa="全体の進捗状況"
          lang={lang}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#E8621A',
            fontFamily: 'Rajdhani, sans-serif',
            lineHeight: 1,
            minWidth: 100,
          }}>
            {totalProgress}%
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <ProgressBar value={totalProgress} showPercent={false} height={12} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          <StatCounter value={`${completedModules}/${totalModules}`} labelJa="モジュール" labelEn="Modules" lang={lang} accent="#D4A843" />
          <StatCounter value={totalLessons} labelJa="時間" labelEn="Hours" subJa="学習単位" subEn="study units" lang={lang} accent="#2D5A8E" />
          <StatCounter value={completedCourses} labelJa="証明書" labelEn="Certificates" subJa="修了コース" subEn="completed" lang={lang} accent="#2E7D52" />
          <StatCounter value={`${totalProgress}%`} labelJa="クイズスコア" labelEn="Quiz Score" subJa="総合進捗" subEn="overall" lang={lang} accent="#E8621A" />
        </div>
      </div>

      {/* Quick Actions — WP horizontal action cards */}
      <div style={{ marginBottom: 32 }}>
        <SectionHeader titleEn="Quick Actions" titleJa="クイックアクション" lang={lang} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {QUICK_ACTIONS.map(action => (
            <QuickActionCard
              key={action.id}
              icon={action.icon}
              titleJa={action.titleJa}
              titleEn={action.titleEn}
              lang={lang}
              onClick={() => action.tab && onNavigate?.(action.tab)}
            />
          ))}
        </div>
      </div>

      {/* Featured Resources — WP card grid with badges */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader titleEn="Featured Resources" titleJa="注目のリソース" lang={lang} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {FEATURED_RESOURCES.map(resource => (
            <ResourceCard
              key={resource.id}
              icon={resource.icon}
              titleJa={resource.titleJa}
              titleEn={resource.titleEn}
              descJa={resource.descJa}
              descEn={resource.descEn}
              status={resource.status}
              ctaJa={resource.ctaJa}
              ctaEn={resource.ctaEn}
              lang={lang}
              onClick={() => resource.tab && onNavigate?.(resource.tab)}
            />
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 36 }}>
        <div style={{ background: '#112236', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '24px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#D4A843', marginBottom: 16, letterSpacing: '0.08em' }}>
            {t('スキルレーダー', 'Skill Radar')}
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#8A9BB0', fontSize: 11, fontFamily: 'Noto Sans JP, sans-serif' }}
                />
                <Radar name="Progress" dataKey="value" stroke="#E8621A" fill="#E8621A" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: '#112236', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '24px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#D4A843', marginBottom: 16, letterSpacing: '0.08em' }}>
            {t('コース別進捗', 'Progress by Course')}
          </div>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 24 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#8A9BB0', fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#8A9BB0', fontSize: 10, fontFamily: 'Noto Sans JP, sans-serif' }} width={80} />
                <Tooltip
                  formatter={(v) => [`${v ?? 0}%`, t('進捗', 'Progress')]}
                  contentStyle={{ background: '#0B1929', border: '1px solid #E8621A', borderRadius: 4, fontSize: 12 }}
                  labelStyle={{ color: '#F0EDE8' }}
                />
                <Bar dataKey="progress" radius={[0, 3, 3, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Learning Modules — WP module card pattern */}
      <div>
        <SectionHeader titleEn="Learning Modules" titleJa="学習モジュール" lang={lang} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {COURSES.map(course => (
            <ResourceCard
              key={course.id}
              icon={course.icon}
              titleJa={course.titleJa}
              titleEn={course.titleEn}
              descJa={course.descJa}
              descEn={course.descEn}
              status={courseStatus(course.progress)}
              ctaJa={course.progress > 0 ? '続ける' : 'アクセス'}
              ctaEn={course.progress > 0 ? 'Continue' : 'Access Module'}
              lang={lang}
              progress={course.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;