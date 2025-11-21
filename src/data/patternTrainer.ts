import { topicsData } from "./topics";

export interface PatternPrompt {
  id: string;
  patternId: string;
  statement: string;
  signals: string[];
  answer: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export const trainerPrompts: PatternPrompt[] = [
  {
    id: "prompt-1",
    patternId: "sliding-window",
    statement: "Find the length of the longest substring without repeating characters.",
    signals: ["substring", "no repeating characters", "continuous"],
    answer: "Sliding Window lets you grow and shrink the substring while tracking duplicates."
  },
  {
    id: "prompt-2",
    patternId: "two-pointers",
    statement: "Given a sorted array, return any pair of numbers whose sum equals the target.",
    signals: ["sorted array", "pair", "target sum"],
    answer: "Two Pointers start at both ends and move inward based on the current sum."
  },
  {
    id: "prompt-3",
    patternId: "hash-map",
    statement: "Count how many times each character appears in a string.",
    signals: ["frequency", "counting", "lookup"],
    answer: "Hash Map stores counts per character for constant-time lookups."
  },
  {
    id: "prompt-4",
    patternId: "sorting-greedy",
    statement: "You have meeting intervals; return the minimum number of rooms needed.",
    signals: ["interval scheduling", "start/end times", "conflicts"],
    answer: "Sorting + Greedy lets you process starts and ends to track simultaneous meetings."
  },
  {
    id: "prompt-5",
    patternId: "binary-search",
    statement: "A function is monotonic; find the smallest input that returns true.",
    signals: ["monotonic", "first true", "search on answer"],
    answer: "Binary Search on the answer space quickly finds the threshold."
  },
  {
    id: "prompt-6",
    patternId: "dfs",
    statement: "Count how many islands exist in a grid of 0s and 1s.",
    signals: ["grid traversal", "connected components", "mark visited"],
    answer: "DFS explores each island deeply and marks the visited cells."
  },
  {
    id: "prompt-7",
    patternId: "bfs",
    statement: "Find the minimum number of moves to unlock a lock from 0000 to a target.",
    signals: ["shortest path", "state graph", "level traversal"],
    answer: "BFS checks all states layer by layer until it reaches the target."
  },
  {
    id: "prompt-8",
    patternId: "backtracking",
    statement: "Generate all valid combinations of n pairs of parentheses.",
    signals: ["generate all", "valid states", "choices + undo"],
    answer: "Backtracking tries '(' or ')' only when it keeps the string valid."
  },
  {
    id: "prompt-9",
    patternId: "dynamic-programming",
    statement: "Given coins of different values, compute the fewest coins to make the target.",
    signals: ["optimal substructure", "overlapping subproblems", "minimum coins"],
    answer: "Dynamic Programming builds the answer from smaller remaining totals."
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "quiz-1",
    question: "This problem mentions “no repeating characters” → which pattern?",
    options: ["sliding-window", "hash-map", "binary-search"],
    answer: "sliding-window",
    explanation: "Longest substring without repeats is a classic sliding window template."
  },
  {
    id: "quiz-2",
    question: "This problem asks for the “shortest path” → which pattern?",
    options: ["bfs", "dfs", "sorting-greedy"],
    answer: "bfs",
    explanation: "Breadth-first search finds the minimum number of steps across levels."
  },
  {
    id: "quiz-3",
    question: "The input is a sorted list and you need a pair → what should you try first?",
    options: ["two-pointers", "hash-map", "dynamic-programming"],
    answer: "two-pointers",
    explanation: "Two pointers exploit the sorted property to shrink the search space."
  },
  {
    id: "quiz-4",
    question: "You must explore every path but undo bad choices quickly. Which pattern?",
    options: ["backtracking", "bfs", "sorting-greedy"],
    answer: "backtracking",
    explanation: "Backtracking is pick → explore → undo."
  },
  {
    id: "quiz-5",
    question: "You need a threshold where something becomes possible. Which pattern?",
    options: ["binary-search", "dynamic-programming", "hash-map"],
    answer: "binary-search",
    explanation: "Binary search on answers isolates the first valid value fast."
  }
];

export const keywordSuggestions: Record<string, string[]> = {
  substring: ["sliding-window", "hash-map", "two-pointers"],
  consecutive: ["sliding-window", "hash-map", "bfs"],
  pair: ["two-pointers", "hash-map", "sorting-greedy"],
  intervals: ["sorting-greedy", "sliding-window", "binary-search"],
  path: ["bfs", "dfs", "dynamic-programming"]
};

export const topicLookup = new Map(topicsData.map((topic) => [topic.id, topic]));

