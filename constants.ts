
import { DayData } from './types';

export const COLORS = {
  HE_BLUE: '#004F9F',
  HE_YELLOW: '#FFD100',
  SOFT_BLUE: '#F0F9FF',
  ICE_WHITE: 'rgba(255, 255, 255, 0.8)',
  TEXT_DARK: '#1d1d1f',
  TEXT_SECONDARY: '#86868b'
};

const NOTION_AI_TIPS = [
  "Draft a perfect host welcome letter",
  "Summarize local neighborhood reviews",
  "Generate unique house rule icons",
  "Translate your listing to 5 languages",
  "Brainstorm winter guest gift ideas",
  "Create an automated check-out list",
  "Rewrite listing for higher impact",
  "Analyze guest feedback patterns",
  "Simplify exchange insurance terms",
  "Write an enticing property title",
  "Generate a local 'Secret Spot' guide",
  "Format a clear house manual",
  "Suggest nearby winter activities",
  "Optimize photo descriptions for SEO",
  "Respond to inquiries with AI tone-matching",
  "Synthesize calendar availability notes",
  "Extract flight details from emails",
  "Build a local eatery comparison table",
  "Correct listing grammar instantly",
  "Draft professional exchange contracts",
  "Summarize regional travel warnings",
  "Create a packing list for guests",
  "Brainstorm cleaning protocol steps",
  "Generate social captions for listings",
  "Write personalized thank you notes",
  "Plan exchange-friendly pet rules",
  "Analyze heating cost efficiency tips",
  "Draft a bio that builds trust",
  "Translate emergency contacts lists",
  "Create a 'First Night' dinner recipe",
  "Review and polish exchange terms"
];

export const TARGET_YEAR = 2026;
export const TARGET_MONTH = 0; // January 2026

export const CALENDAR_DAYS: DayData[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  title: NOTION_AI_TIPS[i] || "Notion AI Magic",
  description: "Advanced AI techniques for the modern HomeExchanger.",
  notionUrl: "https://www.notion.so/product/ai",
  isUnlocked: false,
  type: 'tip'
}));

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const isWeekendOrHoliday = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay(); 
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 Sun, 6 Sat
};
