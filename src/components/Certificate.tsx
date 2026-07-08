// =============================================
// QT SSW ACADEMY — Certificate Component
// TECH READS®-NECH Certification
// =============================================

import React, { useState } from 'react';
import type { Language } from '../types';

interface CertificateProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

const Certificate: React.FC<CertificateProps> = ({ lang, t }) => {
  const [name, setName] = useState('Zain');
  const [course, setCourse] = useState('engine-basics');
  const [generated, setGenerated] = useState(false);
  const [note, setNote] = useState('');

  const CERT_COURSES = [
    { id: 'engine-basics', ja: 'エンジン基礎', en: 'Engine Fundamentals' },
    { id: 'engine-advanced', ja: 'エンジン点検・整備', en: 'Engine Inspection & Maintenance' },
    { id: 'transmission', ja: 'トランスミッション', en: 'Transmission Systems' },
    { id: 'starter-alternator', ja: 'スターター・オルタネータ', en: 'Starter & Alternator' },
    { id: 'brake-system', ja: 'ブレーキシステム', en: 'Brake System' },
    { id: 'jlpt-n4', ja: 'JLPT N4 語彙（自動車整備）', en: 'JLPT N4 Vocabulary (Automotive)' },
  ];

  const selectedCourse = CERT_COURSES.find(c => c.id === course) || CERT_COURSES[0];
  const now = new Date();
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
  const certId = `TR-NECH-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const handleGenerate = () => {
    setGenerated(true);
    setNote('');
  };

  const handlePrint = () => {
    setNote(t(
      '※ 印刷/PDF保存はブラウザの印刷機能（Ctrl+P）をご利用ください。Supabase連携後はPDF自動生成が可能になります。',
      '※ Use browser print (Ctrl+P) to save as PDF. Automatic PDF generation will be available after Supabase integration.'
    ));
    setTimeout(() => setNote(''), 5000);
  };

  return (
    <div style={{ padding: '32px 0' }}>
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 6 }}>
        TECH READS®-NECH — CERTIFICATION
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', marginBottom: 24 }}>
        {t('修了証明書の発行', 'Issue Completion Certificate')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 28 }}>
        {/* Form */}
        <div style={{
          background: '#112236',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '24px',
          height: 'fit-content',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#D4A843', letterSpacing: '0.08em', marginBottom: 20 }}>
            {t('証明書の設定', 'CERTIFICATE SETTINGS')}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: '#8A9BB0', display: 'block', marginBottom: 6 }}>
              {t('受講者名', 'Student Name')}
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
                padding: '8px 12px',
                color: '#F0EDE8',
                fontSize: 13,
                fontFamily: 'Noto Sans JP, sans-serif',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: '#8A9BB0', display: 'block', marginBottom: 6 }}>
              {t('コース', 'Course')}
            </label>
            <select
              value={course}
              onChange={e => { setCourse(e.target.value); setGenerated(false); }}
              style={{
                width: '100%',
                background: '#0B1929',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 6,
                padding: '8px 12px',
                color: '#F0EDE8',
                fontSize: 12,
                fontFamily: 'Noto Sans JP, sans-serif',
                cursor: 'pointer',
              }}
            >
              {CERT_COURSES.map(c => (
                <option key={c.id} value={c.id}>
                  {lang === 'ja' ? c.ja : c.en}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!name.trim()}
            style={{
              width: '100%',
              background: name.trim() ? '#E8621A' : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 8,
              padding: '12px',
              color: name.trim() ? '#fff' : '#8A9BB0',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Noto Sans JP, sans-serif',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            {t('証明書を生成', 'Generate Certificate')}
          </button>
        </div>

        {/* Certificate preview */}
        <div>
          {generated ? (
            <div>
              {/* Certificate */}
              <div id="certificate-preview" style={{
                background: 'linear-gradient(160deg, #0B1929 0%, #112236 50%, #0B1929 100%)',
                border: '2px solid #D4A843',
                borderRadius: 12,
                padding: '48px 44px',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: 16,
              }}>
                {/* Corner decorations */}
                <div style={{ position: 'absolute', top: 16, left: 16, width: 40, height: 40 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M2 38 L2 2 L38 2" stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.6" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M38 38 L38 2 L2 2" stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.6" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', bottom: 16, left: 16, width: 40, height: 40 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M2 2 L2 38 L38 38" stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.6" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', bottom: 16, right: 16, width: 40, height: 40 }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M38 2 L38 38 L2 38" stroke="#D4A843" strokeWidth="1.5" fill="none" opacity="0.6" />
                  </svg>
                </div>

                {/* Watermark */}
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

                {/* Content */}
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  {/* Issuer logos */}
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
                      {lang === 'ja' ? selectedCourse.ja : selectedCourse.en}
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
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: 60, height: 60,
                        borderRadius: '50%',
                        border: '2px solid #D4A843',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}>
                        <div style={{ fontSize: 7, color: '#D4A843', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em', lineHeight: 1.3 }}>
                          TECH<br />READS<br />®-NECH
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#8A9BB0', marginBottom: 2 }}>{t('証明書ID', 'Certificate ID')}</div>
                      <div style={{ fontSize: 11, color: '#D4A843', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.06em' }}>{certId}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={handlePrint}
                  style={{
                    background: '#E8621A',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 24px',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  {t('PDFで保存', 'Save as PDF')}
                </button>
                <button
                  onClick={() => setGenerated(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 8,
                    padding: '10px 24px',
                    color: '#8A9BB0',
                    fontSize: 13,
                    fontFamily: 'Noto Sans JP, sans-serif',
                    cursor: 'pointer',
                  }}
                >
                  {t('別の証明書を作成', 'Create another')}
                </button>
              </div>

              {note && (
                <div style={{
                  marginTop: 12,
                  padding: '10px 16px',
                  background: 'rgba(212,168,67,0.1)',
                  border: '1px solid rgba(212,168,67,0.3)',
                  borderRadius: 6,
                  fontSize: 12,
                  color: '#D4A843',
                }}>
                  {note}
                </div>
              )}
            </div>
          ) : (
            <div style={{
              background: '#112236',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 300,
            }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 16, opacity: 0.3 }}>
                <rect x="8" y="12" width="48" height="40" rx="4" stroke="#F0EDE8" strokeWidth="2" fill="none" />
                <path d="M20 28 H44 M20 36 H36" stroke="#F0EDE8" strokeWidth="2" strokeLinecap="round" />
                <circle cx="48" cy="48" r="12" fill="#0B1929" stroke="#D4A843" strokeWidth="2" />
                <path d="M44 48 L47 51 L52 45" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ fontSize: 14, color: '#8A9BB0', textAlign: 'center' }}>
                {t(
                  '左のフォームに入力して\n「証明書を生成」をクリックしてください',
                  'Fill in the form on the left\nand click "Generate Certificate"'
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
