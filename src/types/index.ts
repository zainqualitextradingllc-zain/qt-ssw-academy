// =============================================
// QT SSW ACADEMY — Type Definitions
// QT Drive Innovations® × TECH READS®-NECH
// =============================================

export type Language = 'ja' | 'en';

export interface Course {
  id: string;
  titleJa: string;
  titleEn: string;
  descJa: string;
  descEn: string;
  category: 'engine' | 'transmission' | 'electrical' | 'brake' | 'inspection';
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 1 | 2 | 3;
  icon: string;
}

export interface FlashCard {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  exampleJa: string;
  exampleEn: string;
  category: 'noun' | 'verb' | 'adjective' | 'technical';
  jlptLevel: 'N4';
}

export interface QuizQuestion {
  id: string;
  courseId: string;
  questionJa: string;
  questionEn: string;
  options: { ja: string; en: string }[];
  correctIndex: number;
  explanationJa: string;
  explanationEn: string;
}

export interface InspectReport {
  vehicleId: string;
  vehicleName: string;
  vin: string;
  inspectionDate: string;
  inspector: string;
  items: InspectItem[];
  overallStatus: 'pass' | 'warning' | 'fail';
}

export interface InspectItem {
  nameJa: string;
  nameEn: string;
  status: 'pass' | 'warning' | 'fail';
  noteJa: string;
  noteEn: string;
}

export interface UserProgress {
  userId: string;
  name: string;
  completedCourses: string[];
  quizScores: Record<string, number>;
  flashcardProgress: number;
  totalPoints: number;
  level: number;
  joinDate: string;
}
