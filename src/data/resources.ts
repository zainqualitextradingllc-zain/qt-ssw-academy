import type { BadgeStatus } from '../components/ui/StatusBadge';
import type { TabId } from '../types';

export interface AppResource {
  id: string;
  icon: string;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  status: BadgeStatus;
  ctaJa: string;
  ctaEn: string;
  tab?: TabId;
}

export const QUICK_ACTIONS: AppResource[] = [
  {
    id: 'dashboard',
    icon: '🎯',
    titleJa: '学習ダッシュボード',
    titleEn: 'SSW Type 1 Dashboard',
    descJa: '',
    descEn: '',
    status: 'available',
    ctaJa: '',
    ctaEn: '',
    tab: 'dashboard',
  },
  {
    id: 'quiz',
    icon: '📝',
    titleJa: '模擬試験',
    titleEn: 'SSW Mock Exam',
    descJa: '',
    descEn: '',
    status: 'available',
    ctaJa: '',
    ctaEn: '',
    tab: 'quiz',
  },
  {
    id: 'flashcards',
    icon: '🇯🇵',
    titleJa: '日本語能力試験',
    titleEn: 'JLPT N4 Mock Test',
    descJa: '',
    descEn: '',
    status: 'available',
    ctaJa: '',
    ctaEn: '',
    tab: 'flashcards',
  },
  {
    id: 'resources',
    icon: '📋',
    titleJa: '資料等を見る',
    titleEn: 'View Resources',
    descJa: '',
    descEn: '',
    status: 'available',
    ctaJa: '',
    ctaEn: '',
    tab: 'resources',
  },
];

export const FEATURED_RESOURCES: AppResource[] = [
  {
    id: 'learning-hub',
    icon: '🎯',
    titleJa: '特定技能1号学習ハブ',
    titleEn: 'SSW Type 1 Learning Hub',
    descJa: '自動車整備士特定技能1号の総合学習ダッシュボード。',
    descEn: 'Complete learning dashboard for SSW Type 1 automotive maintenance certification.',
    status: 'available',
    ctaJa: 'アクセス',
    ctaEn: 'Access Now',
    tab: 'dashboard',
  },
  {
    id: 'mock-exam',
    icon: '📝',
    titleJa: '自動車整備技能登録試験',
    titleEn: 'SSW Registration Exam',
    descJa: '自動車整備技能登録試験の模擬試験ポータル。',
    descEn: 'Official automotive maintenance skill registration examination portal.',
    status: 'available',
    ctaJa: '受験する',
    ctaEn: 'Take Exam',
    tab: 'quiz',
  },
  {
    id: 'jlpt-quiz',
    icon: '📚',
    titleJa: 'JLPT N4 模擬試験',
    titleEn: 'JLPT N4 Mock Quiz',
    descJa: 'インタラクティブなJLPT N4模擬試験と即時フィードバック。',
    descEn: 'Interactive JLPT N4 mock examination with instant feedback.',
    status: 'available',
    ctaJa: '開始',
    ctaEn: 'Start Quiz',
    tab: 'quiz',
  },
  {
    id: 'flashcard-game',
    icon: '🎴',
    titleJa: 'JLPT N4 フラッシュカードゲーム',
    titleEn: 'JLPT N4 Flashcard Game',
    descJa: 'JLPT N4語彙と漢字を暗記するインタラクティブゲーム。',
    descEn: 'Interactive flashcard game to memorize JLPT N4 vocabulary and kanji.',
    status: 'new',
    ctaJa: 'ゲーム開始',
    ctaEn: 'Play Game',
    tab: 'flashcards',
  },
  {
    id: 'inspect-tag',
    icon: '🔍',
    titleJa: 'InspectTag™ 車両点検',
    titleEn: 'InspectTag™ Vehicle Inspection',
    descJa: 'デジタル車両点検レポートと整備記録の生成。',
    descEn: 'Generate digital vehicle inspection reports and maintenance records.',
    status: 'beta',
    ctaJa: 'ベータ版を試す',
    ctaEn: 'Try Beta',
    tab: 'inspect',
  },
  {
    id: 'certificate',
    icon: '📄',
    titleJa: '修了証明書の発行',
    titleEn: 'Completion Certificate',
    descJa: 'TECH READS®-NECH修了証明書の発行と印刷。',
    descEn: 'Issue and print TECH READS®-NECH completion certificates.',
    status: 'available',
    ctaJa: '証明書を発行',
    ctaEn: 'Issue Certificate',
    tab: 'certificate',
  },
];