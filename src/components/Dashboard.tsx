// Dashboard tab renders Module 1: Course Hub Landing Page
import React from 'react';
import CourseHub from './CourseHub';
import type { Language, TabId } from '../types';

interface DashboardProps {
  lang: Language;
  t: (ja: string, en: string) => string;
  onNavigate?: (tab: TabId) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => <CourseHub {...props} />;

export default Dashboard;