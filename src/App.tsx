// =============================================
// QT SSW ACADEMY — Main App Component
// QT Drive Innovations® × TECH READS®-NECH
// SSW-1 Automotive Maintenance Training Platform
// =============================================

import React, { useState } from 'react';
import { useLanguage } from './hooks/useLanguage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FlashCards from './components/FlashCards';
import Quiz from './components/Quiz';
import InspectTag from './components/InspectTag';
import ResourceCenter from './components/ResourceCenter';
import Certificate from './components/Certificate';
import Footer from './components/Footer';
import type { TabId } from './types';

interface Tab {
  id: TabId;
  labelJa: string;
  labelEn: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'dashboard',   labelJa: 'ダッシュボード', labelEn: 'Dashboard',    icon: '▦' },
  { id: 'flashcards',  labelJa: 'N4 語彙',        labelEn: 'N4 Vocab',     icon: '◈' },
  { id: 'quiz',        labelJa: 'クイズ',          labelEn: 'Quiz',         icon: '◉' },
  { id: 'inspect',     labelJa: 'InspectTag™',    labelEn: 'InspectTag™',  icon: '◎' },
  { id: 'resources',   labelJa: '資料',            labelEn: 'Resources',    icon: '◇' },
  { id: 'certificate', labelJa: '証明書',          labelEn: 'Certificate',  icon: '◆' },
];

const App: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':   return <Dashboard lang={lang} t={t} onNavigate={setActiveTab} />;
      case 'flashcards':  return <FlashCards lang={lang} t={t} />;
      case 'quiz':        return <Quiz lang={lang} t={t} />;
      case 'inspect':     return <InspectTag lang={lang} t={t} />;
      case 'resources':   return <ResourceCenter lang={lang} t={t} onNavigate={setActiveTab} />;
      case 'certificate': return <Certificate lang={lang} t={t} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B1929', display: 'flex', flexDirection: 'column' }}>
      <Header lang={lang} onToggleLang={toggleLang} />

      {/* Tab navigation */}
      <div style={{
        background: '#0D1F33',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        position: 'sticky',
        top: 74,
        zIndex: 90,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '14px 22px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #E8621A' : '2px solid transparent',
                  color: activeTab === tab.id ? '#F0EDE8' : '#8A9BB0',
                  fontSize: 13,
                  fontFamily: 'Noto Sans JP, sans-serif',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  letterSpacing: '0.02em',
                }}
              >
                <span style={{ fontSize: 11, opacity: 0.7 }}>{tab.icon}</span>
                {lang === 'ja' ? tab.labelJa : tab.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        {renderTab()}
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default App;
