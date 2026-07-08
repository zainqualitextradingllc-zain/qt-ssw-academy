// =============================================
// Module 5: Certificate Page
// Earned certs from courses.ts (progress === 100%)
// TECH READS®-NECH Certification
// =============================================

import React, { useState } from 'react';
import { useCourseStats } from '../hooks/useCourseStats';
import type { Course, Language } from '../types';
import SectionHeader from './ui/SectionHeader';
import StatCounter from './ui/StatCounter';
import ProgressBar from './ui/ProgressBar';
import StatusBadge from './ui/StatusBadge';

interface CertificateProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

const makeCertId = (courseId: string) => {
  const now = new Date();
  return `TR-NECH-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${courseId.slice(0, 4).toUpperCase()}`;
};

const formatDate = (lang: Language) => {
  const now = new Date();
  if (lang === 'ja') {
    return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  }
  return now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

interface CertificatePreviewProps {
  course: Course;
  name: string;
  lang: Language;
  t: (ja: string, en: string) => string;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ course, name, lang, t }) => {
  const certId = makeCertId(course.id);
  const dateStr = formatDate(lang);

  return (
    <div id="certificate-preview" style={{
      background: 'linear-gradient(160deg, #0B1929 0%, #112236 50%, #0B1929 100%)',
      border: '2px solid #D4A843',
      borderRadius: 12,
      padding: '48px 44px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-30deg)',
        fontSize: 80,
        fontFamily: 'Rajdhani, sans-serif',
        fontWeight: 900,
        color: 'rgba(212,168,67,0.04)',
        letterSpacing: '0.1em',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}>
        TECH READS
      </div>

      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 11, letterSpacing: '0.12em', color: '#8A9BB0' }}>
            QT DRIVE INNOVATIONS<sup style={{ fontSize: 8, color: '#E8621A' }}>®</sup>
          </div>
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 11, letterSpacing: '0.12em', color: '#8A9BB0' }}>
            TECH READS<sup style={{ fontSize: 8 }}>®</sup>-NECH
          </div>
        </div>

        <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#D4A843', marginBottom: 12, fontFamily: 'Rajdhani, sans-serif' }}>
          CERTIFICATE OF COMPLETION
        </div>
        <div style={{ fontSize: 13, color: '#8A9BB0', marginBottom: 20 }}>
          {t('修了証明書', 'Certificate of Completion')}
        </div>

        <div style={{ fontSize: 13, color: '#8A9BB0', marginBottom: 8 }}>
          {t('以下の者が下記コースを修了したことを証明します。', 'This certifies that the following person has completed the course below.')}
        </div>

        <div style={{
          fontSize: 36,
          fontWeight: 700,
          color: '#F0EDE8',
          fontFamily: 'Noto Sans JP, sans-serif',
          marginBottom: 6,
          borderBottom: '1px solid rgba(212,168,67,0.4)',
          paddingBottom: 12,
          display: 'inline-block',
          minWidth: 200,
        }}>
          {name}
        </div>
        <div style={{ fontSize: 12, color: '#8A9BB0', marginBottom: 20, marginTop: 4 }}>
          {t('様', 'san')}
        </div>

        <div style={{
          background: 'rgba(232,98,26,0.08)',
          border: '1px solid rgba(232,98,26,0.25)',
          borderRadius: 6,
          padding: '14px 24px',
          display: 'inline-block',
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, color: '#8A9BB0', marginBottom: 4 }}>
            {t('修了コース', 'Completed Course')}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE8' }}>
            {lang === 'ja' ? course.titleJa : course.titleEn}
          </div>
          <div style={{ fontSize: 11, color: '#E8621A', marginTop: 4 }}>
            SSW-1 {t('自動車整備技能者育成プログラム', 'Automotive Maintenance Training Program')}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: '#8A9BB0', marginBottom: 2 }}>{t('発行日', 'Issue Date')}</div>
            <div style={{ fontSize: 13, color: '#F0EDE8', fontWeight: 600 }}>{dateStr}</div>
          </div>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', border: '2px solid #D4A843',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 7, color: '#D4A843', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em', lineHeight: 1.3, textAlign: 'center' }}>
              TECH<br />READS<br />®-NECH
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#8A9BB0', marginBottom: 2 }}>{t('証明書ID', 'Certificate ID')}</div>
            <div style={{ fontSize: 11, color: '#D4A843', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.06em' }}>{certId}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Certificate: React.FC<CertificateProps> = ({ lang, t }) => {
  const stats = useCourseStats();
  const [name, setName] = useState('Zain');
  const [viewingCourseId, setViewingCourseId] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const viewingCourse = stats.courses.find(c => c.id === viewingCourseId);

  const handlePrint = () => {
    window.print();
    setNote(t(
      '※ 印刷ダイアログで「PDFに保存」を選択してください。',
      '※ Select "Save as PDF" in the print dialog.',
    ));
    setTimeout(() => setNote(''), 5000);
  };

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #112236 0%, #1E3A5F 100%)',
        border: '1px solid rgba(212,168,67,0.35)',
        borderRadius: 12,
        padding: '28px 32px',
        marginBottom: 28,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#D4A843', marginBottom: 10 }}>
          TECH READS®-NECH — CERTIFICATION
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE8', margin: '0 0 8px' }}>
          {t('修了証明書', 'Completion Certificates')}
        </h1>
        <p style={{ fontSize: 14, color: '#8A9BB0', margin: 0 }}>
          {t(
            'コース進捗100%で修了証明書を取得できます',
            'Earn a certificate when you reach 100% course progress',
          )}
        </p>
      </div>

      {/* Stats — matches dashboard Certificates count */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 14,
        marginBottom: 32,
      }}>
        <StatCounter value={stats.certificates} labelJa="取得済み" labelEn="Earned" lang={lang} accent="#2E7D52" />
        <StatCounter value={stats.inProgressCourses.length} labelJa="進行中" labelEn="In Progress" lang={lang} accent="#D4A843" />
        <StatCounter value={stats.lockedCourses.length} labelJa="未開始" labelEn="Not Started" lang={lang} accent="#8A9BB0" />
        <StatCounter value={stats.modulesTotal} labelJa="総コース" labelEn="Total Courses" lang={lang} accent="#2D5A8E" />
      </div>

      {/* Student name */}
      <div style={{
        background: '#112236',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '20px 24px',
        marginBottom: 32,
        maxWidth: 400,
      }}>
        <label style={{ fontSize: 12, color: '#8A9BB0', display: 'block', marginBottom: 8 }}>
          {t('受講者名（証明書に表示）', 'Student Name (shown on certificate)')}
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%',
            background: '#0B1929',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            padding: '10px 14px',
            color: '#F0EDE8',
            fontSize: 14,
            fontFamily: 'Noto Sans JP, sans-serif',
            outline: 'none',
          }}
        />
      </div>

      {/* Earned certificates */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader
          titleEn={`Earned Certificates (${stats.certificates})`}
          titleJa={`取得済み証明書（${stats.certificates}件）`}
          lang={lang}
        />

        {stats.earnedCourses.length === 0 ? (
          <div style={{
            background: '#112236',
            border: '1px dashed rgba(255,255,255,0.12)',
            borderRadius: 10,
            padding: '48px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>📜</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', marginBottom: 8 }}>
              {t('まだ証明書がありません', 'No certificates earned yet')}
            </div>
            <div style={{ fontSize: 13, color: '#8A9BB0', lineHeight: 1.6 }}>
              {t(
                'コースの進捗を100%にすると、ここに修了証明書が表示されます。',
                'Complete a course to 100% progress to earn your certificate here.',
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {stats.earnedCourses.map(course => (
              <div key={course.id} style={{
                background: '#112236',
                border: '1px solid rgba(46,125,82,0.4)',
                borderLeft: '4px solid #2E7D52',
                borderRadius: 10,
                padding: '22px 24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{course.icon}</span>
                  <StatusBadge status="completed" lang={lang} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F0EDE8', marginBottom: 4 }}>
                  {lang === 'ja' ? course.titleJa : course.titleEn}
                </div>
                <div style={{ fontSize: 12, color: '#8A9BB0', marginBottom: 16 }}>
                  {lang === 'ja' ? course.titleEn : course.titleJa}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setViewingCourseId(course.id)}
                    disabled={!name.trim()}
                    style={certBtnStyle('primary', !name.trim())}
                  >
                    {t('表示', 'View')}
                  </button>
                  <button
                    onClick={() => { setViewingCourseId(course.id); setTimeout(handlePrint, 300); }}
                    disabled={!name.trim()}
                    style={certBtnStyle('secondary', !name.trim())}
                  >
                    {t('PDF保存', 'Download')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* In-progress — path to earning certs */}
      {stats.inProgressCourses.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <SectionHeader
            titleEn="In Progress — Keep Learning"
            titleJa="進行中 — 学習を続けましょう"
            lang={lang}
            subtitle={t(
              '100%達成で証明書を取得できます',
              'Reach 100% to earn your certificate',
            )}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {stats.inProgressCourses.map(course => (
              <div key={course.id} style={{
                background: '#112236',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{course.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE8' }}>
                      {lang === 'ja' ? course.titleJa : course.titleEn}
                    </div>
                    <StatusBadge status="in-progress" lang={lang} />
                  </div>
                </div>
                <ProgressBar value={course.progress} label={t('進捗', 'Progress')} />
                <div style={{ fontSize: 11, color: '#8A9BB0', marginTop: 8 }}>
                  {100 - course.progress}% {t('残り', 'remaining')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked courses */}
      {stats.lockedCourses.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <SectionHeader titleEn="Not Yet Started" titleJa="未開始コース" lang={lang} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {stats.lockedCourses.map(course => (
              <div key={course.id} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: 0.7,
              }}>
                <span style={{ fontSize: 20 }}>{course.icon}</span>
                <div>
                  <div style={{ fontSize: 13, color: '#8A9BB0' }}>
                    {lang === 'ja' ? course.titleJa : course.titleEn}
                  </div>
                  <StatusBadge status="available" lang={lang} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate preview modal */}
      {viewingCourse && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          overflowY: 'auto',
        }}
        onClick={() => setViewingCourseId(null)}
        >
          <div
            style={{ maxWidth: 720, width: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            <CertificatePreview course={viewingCourse} name={name} lang={lang} t={t} />
            <div style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'center' }}>
              <button onClick={handlePrint} style={certBtnStyle('primary', false)}>
                {t('PDFで保存', 'Save as PDF')} →
              </button>
              <button onClick={() => setViewingCourseId(null)} style={certBtnStyle('secondary', false)}>
                {t('閉じる', 'Close')}
              </button>
            </div>
            {note && (
              <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: '#D4A843' }}>{note}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const certBtnStyle = (variant: 'primary' | 'secondary', disabled: boolean): React.CSSProperties => ({
  padding: '8px 18px',
  background: disabled ? 'rgba(255,255,255,0.06)' : variant === 'primary' ? '#E8621A' : 'transparent',
  border: variant === 'primary' ? 'none' : '1px solid rgba(255,255,255,0.2)',
  borderRadius: 6,
  color: disabled ? '#8A9BB0' : variant === 'primary' ? '#fff' : '#F0EDE8',
  fontSize: 13,
  fontWeight: 600,
  fontFamily: 'Noto Sans JP, sans-serif',
  cursor: disabled ? 'not-allowed' : 'pointer',
});

export default Certificate;