import { useMemo } from 'react';
import { COURSES } from '../data/courses';

export function useCourseStats() {
  return useMemo(() => {
    const totalModules = COURSES.length;
    const completedModules = COURSES.filter(c => c.progress === 100).length;
    const inProgressModules = COURSES.filter(c => c.progress > 0 && c.progress < 100).length;
    const overallProgress = Math.round(
      COURSES.reduce((sum, c) => sum + c.progress, 0) / totalModules,
    );
    const totalLessons = COURSES.reduce((sum, c) => sum + c.totalLessons, 0);
    const completedLessons = COURSES.reduce((sum, c) => sum + c.completedLessons, 0);
    const certificates = completedModules;
    const earnedCourses = COURSES.filter(c => c.progress === 100);
    const inProgressCourses = COURSES.filter(c => c.progress > 0 && c.progress < 100);
    const lockedCourses = COURSES.filter(c => c.progress === 0);

    return {
      overallProgress,
      modulesCompleted: completedModules,
      modulesInProgress: inProgressModules,
      modulesTotal: totalModules,
      hoursCompleted: completedLessons,
      hoursTotal: totalLessons,
      certificates,
      earnedCourses,
      inProgressCourses,
      lockedCourses,
      courses: COURSES,
    };
  }, []);
}