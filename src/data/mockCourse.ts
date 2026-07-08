export interface CurriculumItem {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'exam';
  duration?: string;
  completed: boolean;
  questionsCount?: number;
  minutesCount?: number;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  items: CurriculumItem[];
}

export interface MaterialFile {
  id: string;
  title: string;
  type: 'pdf' | 'excel' | 'word' | 'zip';
  size: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  completedLessons: number;
  isCurrentUser?: boolean;
}

export interface CourseInfo {
  title: string;
  modulesCount: number;
  lessonsCount: number;
  durationHours: string;
  level: string;
  language: string;
}

export const mockCourseInfo: CourseInfo = {
  title: 'Starting SEO as your Home Based Business',
  modulesCount: 8,
  lessonsCount: 42,
  durationHours: '12 Hours total',
  level: 'Beginner Friendly',
  language: 'English (Subtitles)',
};

export const initialModules: CurriculumModule[] = [
  {
    id: 'm1',
    title: 'Week 1-4',
    description: 'Introduction to SEO & Search Crawlers',
    items: [
      { id: 'm1-1', title: 'Introduction', type: 'video', duration: '08:45', completed: true },
      { id: 'm1-2', title: 'Course Overview', type: 'video', duration: '15:20', completed: true },
      { id: 'm1-3', title: 'How Search Engines Work', type: 'video', duration: '10:00', completed: false },
      { id: 'm1-4', title: 'Course Exercise / Reference Files', type: 'pdf', completed: false },
      { id: 'm1-5', title: 'Code Editor Installation', type: 'video', duration: '12:15', completed: false },
      { id: 'm1-6', title: 'Embedding PHP in HTML', type: 'video', duration: '18:30', completed: false },
    ],
  },
  {
    id: 'm2',
    title: 'Week 5-8',
    description: 'On-Page SEO & Content Strategy',
    items: [
      { id: 'm2-1', title: 'Defining Keyword Strategy', type: 'video', duration: '14:20', completed: false },
      { id: 'm2-2', title: 'Content Optimization', type: 'video', duration: '19:10', completed: false },
      { id: 'm2-3', title: 'Module 2 Exam', type: 'exam', completed: false, questionsCount: 3, minutesCount: 15 },
      { id: 'm2-4', title: 'Link Building Fundamentals', type: 'video', duration: '22:45', completed: false },
      { id: 'm2-5', title: 'Technical SEO Reference', type: 'pdf', completed: false },
      { id: 'm2-6', title: 'Advanced Schema Markup', type: 'video', duration: '09:50', completed: false },
    ],
  },
  {
    id: 'm3',
    title: 'Week 9-12',
    description: 'Technical SEO & Analytics',
    items: [
      { id: 'm3-1', title: 'Core Web Vitals', type: 'video', duration: '14:20', completed: false },
      { id: 'm3-2', title: 'Search Console Deep Dive', type: 'video', duration: '19:10', completed: false },
      { id: 'm3-3', title: 'Final Exam', type: 'exam', completed: false, questionsCount: 3, minutesCount: 20 },
      { id: 'm3-4', title: 'Analytics & Reporting', type: 'video', duration: '22:45', completed: false },
    ],
  },
];

export const mockMaterials: MaterialFile[] = [
  { id: 'mat-1', title: 'Ultimate On-Page SEO Checklist', type: 'pdf', size: '1.2 MB' },
  { id: 'mat-2', title: 'SEO Keyword Research & Grouping Template', type: 'excel', size: '3.4 MB' },
  { id: 'mat-3', title: 'Competitor Backlink Analysis Sheet', type: 'excel', size: '2.1 MB' },
  { id: 'mat-4', title: 'SEO Pitch Client Proposal', type: 'pdf', size: '5.8 MB' },
  { id: 'mat-5', title: 'Outreach & Link Building Templates', type: 'word', size: '850 KB' },
];

export const mockLeaderboard: LeaderboardUser[] = [
  { rank: 1, name: 'Alex Johnson', points: 2850, completedLessons: 42 },
  { rank: 2, name: 'Sarah Miller', points: 2700, completedLessons: 40 },
  { rank: 3, name: 'Mohamed Ali', points: 2550, completedLessons: 38 },
  { rank: 4, name: 'Sofia Rodriguez', points: 2100, completedLessons: 32 },
  { rank: 5, name: 'You (Student)', points: 1950, completedLessons: 29, isCurrentUser: true },
  { rank: 6, name: 'David Chen', points: 1800, completedLessons: 27 },
  { rank: 7, name: 'Emma Watson', points: 1650, completedLessons: 25 },
];
