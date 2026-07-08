// =============================================
// Module 4: Resource / Download Center data
// In-app links + official external references
// =============================================

import type { TabId } from '../types';
import type { BadgeStatus } from '../components/ui/StatusBadge';

export interface DownloadResource {
  id: string;
  icon: string;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  status: BadgeStatus;
  ctaJa: string;
  ctaEn: string;
  linkType: 'external' | 'internal';
  url?: string;
  tab?: TabId;
}

export interface ResourceSection {
  id: string;
  titleJa: string;
  titleEn: string;
  subtitleJa?: string;
  subtitleEn?: string;
  items: DownloadResource[];
}

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: 'in-app',
    titleJa: 'アプリ内学習ツール',
    titleEn: 'In-App Learning Tools',
    subtitleJa: 'QT SSW Academy内のインタラクティブコンテンツ',
    subtitleEn: 'Interactive content within QT SSW Academy',
    items: [
      {
        id: 'hub',
        icon: '🎯',
        titleJa: 'SSW Type 1 学習ハブ',
        titleEn: 'SSW Type 1 Learning Hub',
        descJa: 'コース進捗と学習モジュールの総合ダッシュボード。',
        descEn: 'Complete dashboard for course progress and learning modules.',
        status: 'available',
        ctaJa: 'アクセス',
        ctaEn: 'Access Now',
        linkType: 'internal',
        tab: 'dashboard',
      },
      {
        id: 'mock-exam',
        icon: '📝',
        titleJa: 'SSW 模擬試験',
        titleEn: 'SSW Mock Examination',
        descJa: '自動車整備技能に関する10問の模擬試験。',
        descEn: '10-question mock exam covering automotive maintenance skills.',
        status: 'available',
        ctaJa: '受験する',
        ctaEn: 'Take Exam',
        linkType: 'internal',
        tab: 'quiz',
      },
      {
        id: 'flashcards',
        icon: '🎴',
        titleJa: 'JLPT N4 フラッシュカード',
        titleEn: 'JLPT N4 Flashcard Game',
        descJa: '自動車整備向けN4語彙のカードめくり学習。',
        descEn: 'Card-flip game for automotive-focused N4 vocabulary.',
        status: 'new',
        ctaJa: 'ゲーム開始',
        ctaEn: 'Play Game',
        linkType: 'internal',
        tab: 'flashcards',
      },
      {
        id: 'inspect',
        icon: '🔍',
        titleJa: 'InspectTag™ 点検',
        titleEn: 'InspectTag™ Inspection',
        descJa: 'デジタル車両点検レポートの生成ツール。',
        descEn: 'Digital vehicle inspection report generator.',
        status: 'beta',
        ctaJa: 'ベータ版を試す',
        ctaEn: 'Try Beta',
        linkType: 'internal',
        tab: 'inspect',
      },
      {
        id: 'cert',
        icon: '📄',
        titleJa: '修了証明書',
        titleEn: 'Completion Certificate',
        descJa: 'TECH READS®-NECH修了証明書の発行。',
        descEn: 'Issue TECH READS®-NECH completion certificates.',
        status: 'available',
        ctaJa: '証明書を発行',
        ctaEn: 'Issue Certificate',
        linkType: 'internal',
        tab: 'certificate',
      },
    ],
  },
  {
    id: 'official',
    titleJa: '公式情報・試験機関',
    titleEn: 'Official Information',
    subtitleJa: '特定技能評価試験・登録試験の公式リソース',
    subtitleEn: 'Official resources for SSW evaluation and registration exams',
    items: [
      {
        id: 'jaspa-ssw',
        icon: '🎯',
        titleJa: 'SSW 評価試験（自動車整備）',
        titleEn: 'SSW Evaluation Test (Automotive)',
        descJa: '日整連（JASPA）による自動車整備分野の特定技能評価試験情報。',
        descEn: 'JASPA official information for automotive maintenance SSW evaluation.',
        status: 'official',
        ctaJa: '見る',
        ctaEn: 'View',
        linkType: 'external',
        url: 'https://www.jaspa.or.jp/mechanic/specific-skill/',
      },
      {
        id: 'jaspa-past',
        icon: '📄',
        titleJa: 'JASPA 過去問題',
        titleEn: 'JASPA Past Exams',
        descJa: '技能実習評価試験の過去問題と解答。',
        descEn: 'Past examination questions and answers from JASPA.',
        status: 'official',
        ctaJa: '見る',
        ctaEn: 'View',
        linkType: 'external',
        url: 'https://www.jaspa.or.jp/mechanic/past/',
      },
      {
        id: 'jaspa-about',
        icon: 'ℹ️',
        titleJa: '日整連について',
        titleEn: 'About JASPA',
        descJa: '日本自動車整備振興会連合会の概要と組織情報。',
        descEn: 'Overview of Japan Automobile Service Promotion Association.',
        status: 'official',
        ctaJa: '見る',
        ctaEn: 'View',
        linkType: 'external',
        url: 'https://www.jaspa.or.jp/association/about/',
      },
      {
        id: 'immigration',
        icon: '🏛️',
        titleJa: '出入国在留管理庁',
        titleEn: 'Immigration Services Agency',
        descJa: '在留資格・ビザに関する公式情報。',
        descEn: 'Official visa and residence status information.',
        status: 'official',
        ctaJa: '見る',
        ctaEn: 'View',
        linkType: 'external',
        url: 'https://www.moj.go.jp/isa/index.html',
      },
      {
        id: 'mhlw',
        icon: '💼',
        titleJa: '厚生労働省（技能実習）',
        titleEn: 'MHLW — Technical Intern Training',
        descJa: '外国人技能実習制度に関する公式ガイドライン。',
        descEn: 'Official guidelines for foreign technical intern training.',
        status: 'official',
        ctaJa: '見る',
        ctaEn: 'View',
        linkType: 'external',
        url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/jinzaikaihatsu/global_cooperation/index.html',
      },
      {
        id: 'mlit',
        icon: '🚙',
        titleJa: '国土交通省 自動車局',
        titleEn: 'MLIT — Automotive Division',
        descJa: '自動車整備事業場の認証要件とガイドライン。',
        descEn: 'Automotive maintenance facility certification requirements.',
        status: 'official',
        ctaJa: '見る',
        ctaEn: 'View',
        linkType: 'external',
        url: 'https://www.mlit.go.jp/jidosha/jidosha_tk9_000027.html',
      },
    ],
  },
  {
    id: 'downloads',
    titleJa: 'ダウンロード資料',
    titleEn: 'Downloadable Materials',
    subtitleJa: 'PDF形式の学習・試験関連資料',
    subtitleEn: 'Study and exam-related PDF materials',
    items: [
      {
        id: 'exam-scope',
        icon: '📋',
        titleJa: '試験の範囲（厚労省）',
        titleEn: 'Official Exam Scope (MHLW)',
        descJa: '技能実習評価試験の公式試験範囲と出題領域。',
        descEn: 'Official exam scope and coverage areas from MHLW.',
        status: 'pdf',
        ctaJa: 'PDF',
        ctaEn: 'PDF',
        linkType: 'external',
        url: 'https://www.mhlw.go.jp/file/06-Seisakujouhou-11800000-Shokugyounouryokukaihatsukyoku/0000182281.pdf',
      },
      {
        id: 'exam-flow',
        icon: '🔄',
        titleJa: '試験の流れ',
        titleEn: 'Exam Process Flow',
        descJa: '技能実習評価試験の手続きと流れの概要。',
        descEn: 'Overview of technical intern evaluation exam procedures.',
        status: 'pdf',
        ctaJa: 'PDF',
        ctaEn: 'PDF',
        linkType: 'external',
        url: 'https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/expat/pdf/003.pdf',
      },
      {
        id: 'safety-manual',
        icon: '🦺',
        titleJa: '安全衛生教本',
        titleEn: 'Safety & Health Manual',
        descJa: '自動車整備職種の安全衛生に関する公式教本。',
        descEn: 'Official safety and health manual for automotive maintenance.',
        status: 'pdf',
        ctaJa: 'PDF',
        ctaEn: 'PDF',
        linkType: 'external',
        url: 'https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/expat/pdf/015.pdf',
      },
      {
        id: 'basic-written',
        icon: '✍️',
        titleJa: '学科試験問題例（初級）',
        titleEn: 'Sample Written Exam (Basic)',
        descJa: '初級学科試験の問題例と解答の参考資料。',
        descEn: 'Sample basic-level written exam questions for reference.',
        status: 'pdf',
        ctaJa: 'PDF',
        ctaEn: 'PDF',
        linkType: 'external',
        url: 'https://www.jaspa.or.jp/Portals/0/resources/jaspahp/user/expat/pdf/011-2.pdf',
      },
    ],
  },
];

export const ALL_DOWNLOAD_RESOURCES = RESOURCE_SECTIONS.flatMap(s => s.items);