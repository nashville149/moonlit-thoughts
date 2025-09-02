export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  mood: string;
  gratitude: string[];
  nextDayPlans: string;
  dailyMood?: string;
}
