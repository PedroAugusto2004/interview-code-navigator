export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  whatItIs: string;
  whenUsed: string[];
  template: string[];
  example: {
    problem: string;
    solution: string[];
  };
  visualization?: string;
}

export const topicsData: Topic[] = [
  {
    id: "two-pointers",
    title: "Two Pointers",
    subtitle: "Efficient array traversal technique",
    icon: "👉",
    color: "bg-blue-500/10 text-blue-500",
    whatItIs: "You use two 'fingers' pointing at positions in a list. You move them depending on what you need.",
    whenUsed: [
      "When the list is sorted",
      "When you're searching for pairs",
      "When you're shrinking/expanding from both sides"
    ],
    template: [
      "Put one pointer at the start",
      "Put the other at the end",
      "Move one of them depending on what you're looking for"
    ],
    example: {
      problem: "Find two numbers that add to 10 in a sorted list.",
      solution: [
        "If left + right is too small → move left up",
        "If left + right is too big → move right down",
        "If it matches → done"
      ]
    },
    visualization: "Two pointers moving from both ends toward center"
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    subtitle: "Dynamic subarray optimization",
    icon: "🪟",
    color: "bg-purple-500/10 text-purple-500",
    whatItIs: "Imagine a 'window' sliding over a list, taking a chunk at a time.",
    whenUsed: [
      "When you're looking for the longest substring",
      "When you're looking for the shortest window",
      "When you're looking for the max/min sum of a continuous part of an array",
      "When the problem mentions 'consecutive' or 'continuous'"
    ],
    template: [
      "Start with an empty window",
      "Expand the window by moving the right side",
      "If you break the rule → shrink from the left",
      "Keep track of your best result"
    ],
    example: {
      problem: "Find longest substring with no repeated letters.",
      solution: [
        "Move right, adding characters",
        "If you repeat one, move left until the repeat disappears",
        "Track the longest window"
      ]
    },
    visualization: "A window sliding across an array, expanding and contracting"
  },
  {
    id: "hash-map",
    title: "Hash Map / Counting",
    subtitle: "Fast lookup and frequency tracking",
    icon: "🗂️",
    color: "bg-green-500/10 text-green-500",
    whatItIs: "A 'fast lookup notebook.' You store: how many times something appeared, or where you last saw it, or if something exists.",
    whenUsed: [
      "When you need frequency counts",
      "When you follow patterns like 'first time I see this...'",
      "When looking up something must be fast"
    ],
    template: [
      "Create a map/dictionary",
      "Loop through the list",
      "Store/update info inside the map",
      "Use it to make decisions"
    ],
    example: {
      problem: "Return the first number that appears twice.",
      solution: [
        "Use a map → when you see the second time → return it"
      ]
    },
    visualization: "A key-value store for instant lookups"
  },
  {
    id: "sorting-greedy",
    title: "Sorting + Greedy",
    subtitle: "Optimal local choices strategy",
    icon: "📊",
    color: "bg-yellow-500/10 text-yellow-500",
    whatItIs: "Sort the data → make the best choice at each step.",
    whenUsed: [
      "Meeting rooms problems",
      "Scheduling tasks",
      "Activity selection",
      "'Pick the smallest first' problems"
    ],
    template: [
      "Sort the list",
      "Go through it one by one",
      "Always pick the best current option",
      "This builds the best final answer"
    ],
    example: {
      problem: "Find the maximum number of meetings you can attend.",
      solution: [
        "Sort by end time",
        "Always pick the next meeting that ends the fastest"
      ]
    },
    visualization: "Sorted items with greedy selection highlighted"
  },
  {
    id: "binary-search",
    title: "Binary Search",
    subtitle: "Divide and conquer searching",
    icon: "🔍",
    color: "bg-red-500/10 text-red-500",
    whatItIs: "You take a sorted list and cut it in half again and again.",
    whenUsed: [
      "Data is sorted",
      "Data is monotonic (always goes up or down)",
      "Problem hints: 'find minimum,' 'find maximum,' 'find first...'"
    ],
    template: [
      "Pick the middle",
      "Decide if the answer is to the left or right",
      "Cut your search in half",
      "Repeat until you find it"
    ],
    example: {
      problem: "Search for a number in a sorted list.",
      solution: [
        "Compare target with middle element",
        "If smaller, search left half",
        "If larger, search right half",
        "Repeat until found"
      ]
    },
    visualization: "Repeatedly dividing array in half"
  },
  {
    id: "dfs",
    title: "DFS (Depth-First Search)",
    subtitle: "Deep exploration algorithm",
    icon: "🌲",
    color: "bg-indigo-500/10 text-indigo-500",
    whatItIs: "Explore as deep as possible before coming back.",
    whenUsed: [
      "Trees",
      "Graphs",
      "Anything nested",
      "'Count islands'",
      "'Find all paths'"
    ],
    template: [
      "Pick a starting point",
      "Go deep until you can't go further",
      "Backtrack",
      "Continue"
    ],
    example: {
      problem: "Count how many separate 'islands' exist on a grid of 1s and 0s.",
      solution: [
        "For each unvisited 1, start DFS",
        "Mark all connected 1s as visited",
        "Count each DFS start as a new island"
      ]
    },
    visualization: "Tree traversal going deep first"
  },
  {
    id: "bfs",
    title: "BFS (Breadth-First Search)",
    subtitle: "Level-by-level exploration",
    icon: "🌊",
    color: "bg-cyan-500/10 text-cyan-500",
    whatItIs: "Explore layer by layer.",
    whenUsed: [
      "Shortest path",
      "Levels of a tree",
      "Flood fill",
      "Multi-step actions"
    ],
    template: [
      "Use a queue",
      "Add your starting point",
      "Visit neighbors first",
      "Move outward step by step"
    ],
    example: {
      problem: "Find shortest path in a maze.",
      solution: [
        "Start from beginning, add to queue",
        "Visit all adjacent cells",
        "Add unvisited neighbors to queue",
        "First to reach end is shortest path"
      ]
    },
    visualization: "Tree traversal expanding outward in waves"
  },
  {
    id: "backtracking",
    title: "Backtracking",
    subtitle: "Trial and error with undo",
    icon: "↩️",
    color: "bg-pink-500/10 text-pink-500",
    whatItIs: "Try something → if it doesn't work, undo it and try another.",
    whenUsed: [
      "Combinations",
      "Subsets",
      "Permutations",
      "Password-like problems",
      "All possible paths"
    ],
    template: [
      "Choose something",
      "Explore deeper",
      "If impossible → undo the choice (backtrack)",
      "Try next choice"
    ],
    example: {
      problem: "Find all possible subsets of a list.",
      solution: [
        "For each element, choose to include it or not",
        "Recursively build subsets",
        "Backtrack to try other combinations",
        "Collect all valid subsets"
      ]
    },
    visualization: "Decision tree with backtracking paths"
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming (DP)",
    subtitle: "Optimization through memorization",
    icon: "💾",
    color: "bg-orange-500/10 text-orange-500",
    whatItIs: "Breaking a big problem into smaller pieces that overlap. Then remembering previous results.",
    whenUsed: [
      "When your solution repeats work",
      "When a problem sounds like: 'How many ways...'",
      "When a problem sounds like: 'Maximum/minimum...'",
      "When a problem sounds like: 'Best path...'",
      "'Knapsack...' problems"
    ],
    template: [
      "Create an array to store results",
      "Solve the easiest subproblem",
      "Build up step by step using previous answers"
    ],
    example: {
      problem: "Climbing stairs problem",
      solution: [
        "Step 1 has 1 way",
        "Step 2 has 2 ways",
        "Step 3 has 3 ways",
        "Step n = (ways for n-1) + (ways for n-2)"
      ]
    },
    visualization: "Building solution from bottom up, reusing previous results"
  }
];