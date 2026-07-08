// =============================================
// QT SSW ACADEMY — Dashboard Component
// Progress overview with Recharts radar + bar
// =============================================

import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import { COURSES } from '../data/courses';
import type { Language } from '../types';

interface DashboardProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

const SKILL_COLORS = ['#E8621A', '#D4A843', '#2D5A8E', '#2E7D52', '#8A9BB0', '#C4521A'];

const Dashboard: React.FC<DashboardProps> = ({ lang, t }) => {
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

  const statCards = [
    {
      labelJa: '総合進捗',
      labelEn: 'Overall Progress',
      value: `${totalProgress}%`,
      sub: t('全コース平均', 'All courses avg.'),
      color: '#E8621A',
    },
    {
      labelJa: '修了コース',
      labelEn: 'Completed',
      value: `${completedCourses} / ${COURSES.length}`,
      sub: t('コース', 'courses'),
      color: '#D4A843',
    },
    {
      labelJa: '完了レッスン',
      labelEn: 'Lessons Done',
      value: totalLessons,
      sub: t('レッスン', 'lessons'),
      color: '#2D5A8E',
    },
    {
      labelJa: 'JLPT N4',
      labelEn: 'JLPT N4',
      value: '20',
      sub: t('語彙学習中', 'vocab in progress'),
      color: '#2E7D52',
    },
  ];

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, #112236 0%, #1E3A5F 100%)',
        border: '1px solid rgba(232,98,26,0.3)',
        borderLeft: '4px solid #E8621A',
        borderRadius: 8,
        padding: '20px 28px',
        marginBottom: 32,
      }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 13, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 6 }}>
          TECH READS®-NECH — SSW TRAINING PROGRAM
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', marginBottom: 4 }}>
          {t('Zain様、学習を続けましょう。', 'Keep going, Zain.')}
        </div>
        <div style={{ fontSize: 14, color: '#8A9BB0' }}>
          {t(
            '特定技能1号（自動車整備）の合格に向けて、今日も一歩前進。',
            'One step closer to SSW-1 (Automotive Maintenance) certification today.'
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
        {statCards.map((s, i) => (
          <div key={i} style={{
            background: '#112236',
            border: `1px solid rgba(255,255,255,0.08)`,
            borderTop: `3px solid ${s.color}`,
            borderRadius: 8,
            padding: '20px 22px',
          }}>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', color: '#8A9BB0', marginBottom: 8, fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>
              {lang === 'ja' ? s.labelJa : s.labelEn}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color, fontFamily: 'Rajdhani, sans-serif', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: '#8A9BB0', marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
        {/* Radar chart */}
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
                <Radar
                  name="Progress"
                  dataKey="value"
                  stroke="#E8621A"
                  fill="#E8621A"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart */}
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

      {/* Course cards */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#D4A843', letterSpacing: '0.1em', marginBottom: 16 }}>
          {t('コース一覧', 'COURSE LIST')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {COURSES.map(course => (
            <div key={course.id} style={{
              background: '#112236',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8,
              padding: '20px',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,98,26,0.5)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{course.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE8', marginBottom: 4 }}>
                    {lang === 'ja' ? course.titleJa : course.titleEn}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A9BB0', lineHeight: 1.5 }}>
                    {lang === 'ja' ? course.descJa : course.descEn}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: '#8A9BB0' }}>
                    {t('進捗', 'Progress')}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: course.progress >= 70 ? '#2E7D52' : course.progress >= 40 ? '#D4A843' : '#E8621A' }}>
                    {course.progress}%
                  </span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${course.progress}%`,
                    background: course.progress >= 70 ? '#2E7D52' : course.progress >= 40 ? '#D4A843' : '#E8621A',
                    borderRadius: 3,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#8A9BB0' }}>
                  {course.completedLessons} / {course.totalLessons} {t('レッスン', 'lessons')}
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: i < course.difficulty ? '#D4A843' : 'rgba(255,255,255,0.1)',
                    }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
