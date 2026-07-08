// =============================================
// QT SSW ACADEMY — Course Data
// Based on Kanagawa Sogo Gakko curriculum
// QT Drive Innovations® × TECH READS®-NECH
// =============================================

import type { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'engine-basics',
    titleJa: 'エンジン基礎',
    titleEn: 'Engine Fundamentals',
    descJa: '4ストロークエンジンの仕組み、燃焼サイクル、バルブタイミングを学ぶ。',
    descEn: 'Learn 4-stroke engine mechanics, combustion cycles, and valve timing.',
    category: 'engine',
    progress: 75,
    totalLessons: 8,
    completedLessons: 6,
    difficulty: 1,
    icon: '⚙️',
  },
  {
    id: 'engine-advanced',
    titleJa: 'エンジン点検・整備',
    titleEn: 'Engine Inspection & Maintenance',
    descJa: 'オイル交換、冷却水点検、圧縮圧力測定の実技手順。',
    descEn: 'Oil change, coolant inspection, compression pressure measurement procedures.',
    category: 'engine',
    progress: 50,
    totalLessons: 10,
    completedLessons: 5,
    difficulty: 2,
    icon: '🔧',
  },
  {
    id: 'transmission',
    titleJa: 'トランスミッション',
    titleEn: 'Transmission Systems',
    descJa: 'MT/AT/CVTの構造と動力伝達の仕組み、シフトフォークの点検方法。',
    descEn: 'MT/AT/CVT structure, power transmission, and shift fork inspection.',
    category: 'transmission',
    progress: 40,
    totalLessons: 8,
    completedLessons: 3,
    difficulty: 2,
    icon: '⚡',
  },
  {
    id: 'starter-alternator',
    titleJa: 'スターター・オルタネータ',
    titleEn: 'Starter & Alternator',
    descJa: '始動装置と充電装置の構造、電流測定、ブラシ摩耗の点検。',
    descEn: 'Starting and charging system structure, current measurement, brush wear inspection.',
    category: 'electrical',
    progress: 60,
    totalLessons: 6,
    completedLessons: 4,
    difficulty: 2,
    icon: '🔋',
  },
  {
    id: 'brake-system',
    titleJa: 'ブレーキシステム',
    titleEn: 'Brake System',
    descJa: 'ディスク/ドラムブレーキの構造、パッド厚測定、エア抜き手順。',
    descEn: 'Disc/drum brake structure, pad thickness measurement, bleeding procedure.',
    category: 'brake',
    progress: 30,
    totalLessons: 7,
    completedLessons: 2,
    difficulty: 2,
    icon: '🛑',
  },
  {
    id: 'vehicle-inspection',
    titleJa: '車検・法定点検',
    titleEn: 'Shaken & Periodic Inspection',
    descJa: '24ヶ月定期点検の項目、法定基準値、点検記録簿の記入方法。',
    descEn: '24-month periodic inspection items, legal standards, and record-keeping.',
    category: 'inspection',
    progress: 20,
    totalLessons: 9,
    completedLessons: 2,
    difficulty: 3,
    icon: '📋',
  },
];

export const CATEGORY_LABELS = {
  engine: { ja: 'エンジン', en: 'Engine' },
  transmission: { ja: 'トランスミッション', en: 'Transmission' },
  electrical: { ja: '電装系', en: 'Electrical' },
  brake: { ja: 'ブレーキ', en: 'Brake' },
  inspection: { ja: '点検・車検', en: 'Inspection' },
} as const;
