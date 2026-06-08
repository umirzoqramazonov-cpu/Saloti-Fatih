export interface Section {
  id: string;
  title: string;
  content: string[];
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  sections: Section[];
  icon: string; // lucide icon name
  bgColor: string;
  accentColor: string;
  category: 'origins' | 'theology' | 'science' | 'practice' | 'experience';
}

export interface ZikrGoal {
  id: string;
  title: string;
  target: number;
  frequency: string;
  description: string;
  cyberMetaphor: string;
  effect: string;
}

export interface ZikrHistory {
  date: string;
  count: number;
  goalId: string;
}
