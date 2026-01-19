export enum QuestionType {
  TRUE_FALSE_NOT_GIVEN = 'TRUE_FALSE_NOT_GIVEN',
  YES_NO_NOT_GIVEN = 'YES_NO_NOT_GIVEN',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  GAP_FILL = 'GAP_FILL', // Flow chart, notes, summary, or generic input
  MATCHING_HEADINGS = 'MATCHING_HEADINGS',
  MATCHING_INFO = 'MATCHING_INFO'
}

export type PartCategory = 'Part 1' | 'Part 2' | 'Part 3' | 'Uncategorized';

export type FrequencyLevel = 'High' | 'Second' | 'Normal';

export interface Question {
  id: string; // e.g., "1", "2"
  number: number; // The actual question number (1-40)
  text: string; // The prompt text
  options?: string[]; // For MCQ
  answer: string | string[]; // Correct answer(s)
  explanation?: string; // Markdown supported
}

export interface QuestionGroup {
  id: string;
  instruction: string;
  type: QuestionType;
  questions: Question[];
  layout?: 'list' | 'flowchart' | 'notes';
}

export interface Part {
  id: string;
  title: string; // e.g., "Passage 1"
  category: PartCategory; // New: Part 1, 2, or 3
  passageTitle: string; // e.g., "Ahead of its time"
  passageContent: string; // HTML content or empty if PDF
  pdfUrl?: string; // New: Blob URL for PDF content
  questionGroups: QuestionGroup[];
  isHighFrequency?: boolean; // Deprecated, use frequency instead
  frequency?: FrequencyLevel; // New: Priority level
  month?: string; // New: e.g., "Jan", "Feb"
}

export interface Exam {
  id: string;
  title: string;
  tags?: string[];
  parts: Part[]; // 3 parts for standard, 1-3 for custom
  isCustom?: boolean; // If composed by user
}

export interface UserAnswers {
  [questionNumber: number]: string;
}

export interface ExamSession {
  examId: string;
  startTime: number;
  elapsedSeconds: number;
  isComplete: boolean;
  answers: UserAnswers;
  highlightedContent: { [partId: string]: string };
}