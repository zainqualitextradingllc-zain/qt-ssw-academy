// =============================================
// QT SSW ACADEMY — Footer Component
// Legal disclaimers, trademark notices
// =============================================

import React from 'react';
import type { Language } from '../types';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#060F1A',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      marginTop: 60,
      padding: '40px 24px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Brand row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: '#F0EDE8', marginBottom: 8 }}>
              QT DRIVE INNOVATIONS<sup style={{ fontSize: 9, color: '#E8621A' }}>®</sup>
            </div>
            <div style={{ fontSize: 12, color: '#8A9BB0', lineHeight: 1.7 }}>
              {lang === 'ja'
                ? '自動車整備・技術革新・SSW人材育成を\n専門とするブランドです。'
                : 'A brand specializing in automotive maintenance,\ntechnical innovation, and SSW talent development.'}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: '#F0EDE8', marginBottom: 8 }}>
              TECH READS<sup style={{ fontSize: 9 }}>®</sup>-NECH
            </div>
            <div style={{ fontSize: 12, color: '#8A9BB0', lineHeight: 1.7 }}>
              {lang === 'ja'
                ? '教育・トレーニングブランド。\nコース・クイズ・証明書発行を担当。'
                : 'Education and training brand.\nHandles courses, quizzes, and certificate issuance.'}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', color: '#F0EDE8', marginBottom: 8 }}>
              QT InspectTag™
            </div>
            <div style={{ fontSize: 12, color: '#8A9BB0', lineHeight: 1.7 }}>
              {lang === 'ja'
                ? 'NFCベースの車両点検デジタルシステム。\nQT Drive Innovations®の独自技術。'
                : 'NFC-based digital vehicle inspection system.\nProprietary technology of QT Drive Innovations®.'}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

        {/* Legal notices */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 6,
          padding: '16px 20px',
          marginBottom: 20,
          fontSize: 11,
          color: '#8A9BB0',
          lineHeight: 1.8,
        }}>
          {lang === 'ja' ? (
            <>
              <strong style={{ color: '#D4A843', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>商標・法的表記</strong><br />
              「QT DRIVE INNOVATIONS®」および「TECH READS®」は米国特許商標庁（USPTO）に登録された商標です。「QT InspectTag™」はQT Drive Innovations®の商標です。
              本アプリケーションはプロトタイプ版であり、教育目的のデモンストレーションです。本アプリに含まれるすべての試験問題・教材・コンテンツは学習補助を目的としており、
              実際の特定技能1号試験の出題内容を保証するものではありません。証明書は現時点ではデモ用であり、公的な資格証明としての効力はありません。
              本アプリの使用によって生じたいかなる損害についても、QT Drive Innovations®およびTECH READS®-NECHは責任を負いません。
            </>
          ) : (
            <>
              <strong style={{ color: '#D4A843', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>TRADEMARK & LEGAL NOTICES</strong><br />
              "QT DRIVE INNOVATIONS®" and "TECH READS®" are registered trademarks with the United States Patent and Trademark Office (USPTO).
              "QT InspectTag™" is a trademark of QT Drive Innovations®. This application is a prototype version for educational demonstration purposes.
              All exam questions, course materials, and content included in this application are for learning assistance only and do not guarantee
              the content of the actual SSW-1 examination. Certificates are currently for demonstration purposes only and have no official qualification validity.
              QT Drive Innovations® and TECH READS®-NECH accept no liability for any damages arising from the use of this application.
            </>
          )}
        </div>

        {/* Copyright */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#8A9BB0' }}>
            © {year} QT Drive Innovations® × TECH READS®-NECH. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { ja: 'プライバシーポリシー', en: 'Privacy Policy' },
              { ja: '利用規約', en: 'Terms of Use' },
              { ja: 'お問い合わせ', en: 'Contact' },
            ].map((link, i) => (
              <span key={i} style={{ fontSize: 11, color: '#8A9BB0', cursor: 'pointer', textDecoration: 'underline' }}>
                {lang === 'ja' ? link.ja : link.en}
              </span>
            ))}
          </div>
        </div>

        {/* Prototype notice */}
        <div style={{
          marginTop: 16,
          padding: '8px 14px',
          background: 'rgba(232,98,26,0.06)',
          border: '1px solid rgba(232,98,26,0.15)',
          borderRadius: 4,
          fontSize: 11,
          color: '#E8621A',
          textAlign: 'center',
          fontFamily: 'Rajdhani, sans-serif',
          letterSpacing: '0.08em',
        }}>
          PROTOTYPE v0.1.0 — FOR DEMONSTRATION PURPOSES ONLY — NOT FOR COMMERCIAL USE
        </div>
      </div>
    </footer>
  );
};

export default Footer;
