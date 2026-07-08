// =============================================
// QT SSW ACADEMY — QT InspectTag™ Demo
// NFC Inspection Simulation
// QT Drive Innovations® Proprietary System
// =============================================

import React, { useState } from 'react';
import { DEMO_VEHICLES, generateInspectReport } from '../data/inspectData';
import type { Language, InspectReport } from '../types';

interface InspectTagProps {
  lang: Language;
  t: (ja: string, en: string) => string;
}

type ScanState = 'idle' | 'scanning' | 'scanned';

const STATUS_CONFIG = {
  pass: { color: '#2E7D52', bg: 'rgba(46,125,82,0.15)', border: 'rgba(46,125,82,0.4)', labelJa: '合格', labelEn: 'PASS' },
  warning: { color: '#D4A843', bg: 'rgba(212,168,67,0.12)', border: 'rgba(212,168,67,0.4)', labelJa: '注意', labelEn: 'WARN' },
  fail: { color: '#C0392B', bg: 'rgba(192,57,43,0.15)', border: 'rgba(192,57,43,0.4)', labelJa: '不合格', labelEn: 'FAIL' },
};

const InspectTag: React.FC<InspectTagProps> = ({ lang, t }) => {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [selectedVehicle, setSelectedVehicle] = useState(DEMO_VEHICLES[0].id);
  const [inspectorName, setInspectorName] = useState('Zain');
  const [report, setReport] = useState<InspectReport | null>(null);
  const [pdfMsg, setPdfMsg] = useState('');

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      const r = generateInspectReport(selectedVehicle, inspectorName);
      setReport(r);
      setScanState('scanned');
    }, 2200);
  };

  const handleReset = () => {
    setScanState('idle');
    setReport(null);
    setPdfMsg('');
  };

  const handlePDF = () => {
    setPdfMsg(t(
      '※ PDFエクスポートはSupabase連携後に有効になります（プロトタイプ版）',
      '※ PDF export will be enabled after Supabase integration (prototype version)'
    ));
    setTimeout(() => setPdfMsg(''), 4000);
  };

  const overallCfg = report ? STATUS_CONFIG[report.overallStatus] : null;

  return (
    <div style={{ padding: '32px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 12, letterSpacing: '0.15em', color: '#E8621A', marginBottom: 6 }}>
          QT DRIVE INNOVATIONS® — PROPRIETARY SYSTEM
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE8', marginBottom: 4 }}>
          QT InspectTag™
        </div>
        <div style={{ fontSize: 13, color: '#8A9BB0' }}>
          {t(
            'NFCタグをスキャンして、車両点検レポートを自動生成するデモです。',
            'Scan an NFC tag to auto-generate a vehicle inspection report. Demo simulation.'
          )}
        </div>
      </div>

      {scanState === 'idle' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 700 }}>
          {/* Setup panel */}
          <div style={{
            background: '#112236',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            padding: '24px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#D4A843', letterSpacing: '0.08em', marginBottom: 20 }}>
              {t('点検設定', 'INSPECTION SETUP')}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: '#8A9BB0', display: 'block', marginBottom: 6 }}>
                {t('車両選択', 'Select Vehicle')}
              </label>
              <select
                value={selectedVehicle}
                onChange={e => setSelectedVehicle(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0B1929',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  color: '#F0EDE8',
                  fontSize: 13,
                  fontFamily: 'Noto Sans JP, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {DEMO_VEHICLES.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: '#8A9BB0', display: 'block', marginBottom: 6 }}>
                {t('点検者名', 'Inspector Name')}
              </label>
              <input
                type="text"
                value={inspectorName}
                onChange={e => setInspectorName(e.target.value)}
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

            <button
              onClick={handleScan}
              style={{
                width: '100%',
                background: '#E8621A',
                border: 'none',
                borderRadius: 8,
                padding: '12px',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'Noto Sans JP, sans-serif',
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              {t('NFCスキャン開始', 'Start NFC Scan')}
            </button>
          </div>

          {/* NFC visual */}
          <div style={{
            background: '#112236',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="100" height="100" viewBox="0 0 100 100" style={{ marginBottom: 16 }}>
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(232,98,26,0.15)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(232,98,26,0.25)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(232,98,26,0.4)" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="10" fill="#E8621A" opacity="0.8" />
              <text x="50" y="54" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="Rajdhani, sans-serif" fontWeight="700">NFC</text>
            </svg>
            <div style={{ fontSize: 13, color: '#8A9BB0', textAlign: 'center', lineHeight: 1.5 }}>
              {t(
                'QT InspectTag™ NFCタグを\n車両に取り付けて点検を開始',
                'Attach QT InspectTag™ NFC tag\nto vehicle to begin inspection'
              )}
            </div>
            <div style={{
              marginTop: 16,
              padding: '6px 14px',
              background: 'rgba(212,168,67,0.1)',
              border: '1px solid rgba(212,168,67,0.3)',
              borderRadius: 4,
              fontSize: 11,
              color: '#D4A843',
              fontFamily: 'Rajdhani, sans-serif',
              letterSpacing: '0.08em',
            }}>
              QT InspectTag™ v1.0 DEMO
            </div>
          </div>
        </div>
      )}

      {scanState === 'scanning' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 0',
        }}>
          <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 24 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid #E8621A',
                animation: `pulse-ring 1.8s ease-out ${i * 0.6}s infinite`,
                opacity: 0,
              }} />
            ))}
            <div style={{
              position: 'absolute',
              inset: '20px',
              borderRadius: '50%',
              background: 'rgba(232,98,26,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#E8621A" strokeWidth="2" />
                <circle cx="20" cy="20" r="10" fill="none" stroke="#E8621A" strokeWidth="1.5" opacity="0.6" />
                <circle cx="20" cy="20" r="4" fill="#E8621A" />
              </svg>
            </div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE8', marginBottom: 8 }}>
            {t('スキャン中...', 'Scanning...')}
          </div>
          <div style={{ fontSize: 13, color: '#8A9BB0' }}>
            {t('NFCタグを読み取っています', 'Reading NFC tag')}
          </div>
          <style>{`
            @keyframes pulse-ring {
              0% { transform: scale(0.5); opacity: 0.8; }
              100% { transform: scale(1.5); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {scanState === 'scanned' && report && overallCfg && (
        <div>
          {/* Report header */}
          <div style={{
            background: '#112236',
            border: `1px solid ${overallCfg.border}`,
            borderTop: `3px solid ${overallCfg.color}`,
            borderRadius: 10,
            padding: '20px 24px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 11, letterSpacing: '0.15em', color: '#8A9BB0', marginBottom: 4 }}>
                QT InspectTag™ — INSPECTION REPORT
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE8', marginBottom: 4 }}>
                {report.vehicleName}
              </div>
              <div style={{ fontSize: 12, color: '#8A9BB0' }}>
                VIN: {report.vin} &nbsp;|&nbsp; {report.inspectionDate} &nbsp;|&nbsp; {t('点検者', 'Inspector')}: {report.inspector}
              </div>
            </div>
            <div style={{
              padding: '8px 20px',
              background: overallCfg.bg,
              border: `1px solid ${overallCfg.border}`,
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 700,
              color: overallCfg.color,
              fontFamily: 'Rajdhani, sans-serif',
              letterSpacing: '0.1em',
            }}>
              {lang === 'ja' ? overallCfg.labelJa : overallCfg.labelEn}
            </div>
          </div>

          {/* Inspection items */}
          <div style={{ marginBottom: 20 }}>
            {report.items.map((item, i) => {
              const cfg = STATUS_CONFIG[item.status];
              return (
                <div key={i} style={{
                  background: '#112236',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 6,
                  padding: '12px 16px',
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}>
                  <div style={{
                    width: 52,
                    padding: '3px 6px',
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                    borderRadius: 3,
                    fontSize: 10,
                    fontWeight: 700,
                    color: cfg.color,
                    fontFamily: 'Rajdhani, sans-serif',
                    letterSpacing: '0.06em',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}>
                    {lang === 'ja' ? cfg.labelJa : cfg.labelEn}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE8', marginBottom: 2 }}>
                      {lang === 'ja' ? item.nameJa : item.nameEn}
                    </div>
                    <div style={{ fontSize: 12, color: '#8A9BB0' }}>
                      {lang === 'ja' ? item.noteJa : item.noteEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handlePDF}
              style={{
                background: '#1E3A5F',
                border: '1px solid rgba(45,90,142,0.6)',
                borderRadius: 8,
                padding: '10px 24px',
                color: '#F0EDE8',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Noto Sans JP, sans-serif',
                cursor: 'pointer',
              }}
            >
              {t('PDFで出力', 'Export PDF')}
            </button>
            <button
              onClick={handleReset}
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
              {t('新しいスキャン', 'New scan')}
            </button>
          </div>

          {pdfMsg && (
            <div style={{
              marginTop: 12,
              padding: '10px 16px',
              background: 'rgba(212,168,67,0.1)',
              border: '1px solid rgba(212,168,67,0.3)',
              borderRadius: 6,
              fontSize: 12,
              color: '#D4A843',
            }}>
              {pdfMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InspectTag;
