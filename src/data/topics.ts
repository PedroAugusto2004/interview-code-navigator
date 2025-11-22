export interface MiniExample {
  title: string;
  logic: string[];
}

export interface PracticeProblem {
  title: string;
  prompt: string;
  link?: string;
}

export interface PracticeSet {
  easy: PracticeProblem[];
  medium: PracticeProblem[];
  hard?: PracticeProblem[];
}

export interface CodeChallenge {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
  hints: string[];
}

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
  keywords: string[];
  miniExamples: MiniExample[];
  jsTemplate: string;
  practiceProblems: PracticeSet;
  visualization?: string;
  videoId?: string;
  codeExample?: {
    examples: {
      language: string;
      code: string;
    }[];
    complexity?: {
      time: string;
      space: string;
    };
  };
  codeChallenges?: {
    easy: CodeChallenge;
    medium: CodeChallenge;
    hard: CodeChallenge;
  };
}

type CoreTopicFields = Omit<Topic, "keywords" | "miniExamples" | "jsTemplate" | "practiceProblems">;

const baseTopics: CoreTopicFields[] = [
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
    visualization: "Two pointers moving from both ends toward center",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def two_sum(nums, target):
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []  # No solution found`
        },
        {
          language: "JavaScript",
          code: `function twoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const currentSum = nums[left] + nums[right];
        
        if (currentSum === target) {
            return [left, right];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];  // No solution found
}`
        }
      ],
      complexity: {
        time: "O(n)",
        space: "O(1)"
      }
    }
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
    visualization: "A window sliding across an array, expanding and contracting",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def longest_substring_without_repeating(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length`
        },
        {
          language: "JavaScript",
          code: `function longestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`
        }
      ],
      complexity: {
        time: "O(n)",
        space: "O(min(n, m))"
      }
    }
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
    visualization: "A key-value store for instant lookups",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def first_duplicate(nums):
    seen = {}
    
    for num in nums:
        if num in seen:
            return num
        seen[num] = True
    
    return -1  # No duplicate found`
        },
        {
          language: "JavaScript",
          code: `function firstDuplicate(nums) {
    const seen = new Map();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.set(num, true);
    }
    
    return -1;  // No duplicate found
}`
        }
      ],
      complexity: {
        time: "O(n)",
        space: "O(n)"
      }
    }
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
    visualization: "Sorted items with greedy selection highlighted",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def max_meetings(meetings):
    # Sort by end time
    meetings.sort(key=lambda x: x[1])
    
    count = 0
    last_end = 0
    
    for start, end in meetings:
        if start >= last_end:
            count += 1
            last_end = end
    
    return count`
        },
        {
          language: "JavaScript",
          code: `function maxMeetings(meetings) {
    // Sort by end time
    meetings.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let lastEnd = 0;
    
    for (const [start, end] of meetings) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }
    
    return count;
}`
        }
      ],
      complexity: {
        time: "O(n log n)",
        space: "O(1)"
      }
    }
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
    visualization: "Repeatedly dividing array in half",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found`
        },
        {
          language: "JavaScript",
          code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;  // Not found
}`
        }
      ],
      complexity: {
        time: "O(log n)",
        space: "O(1)"
      }
    }
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
    visualization: "Tree traversal going deep first",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def count_islands(grid):
    if not grid:
        return 0
    
    def dfs(i, j):
        if (i < 0 or i >= len(grid) or 
            j < 0 or j >= len(grid[0]) or 
            grid[i][j] == '0'):
            return
        
        grid[i][j] = '0'  # Mark as visited
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1
    
    return count`
        },
        {
          language: "JavaScript",
          code: `function countIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || 
            j < 0 || j >= grid[0].length || 
            grid[i][j] === '0') {
            return;
        }
        
        grid[i][j] = '0';  // Mark as visited
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j);
                count++;
            }
        }
    }
    
    return count;
}`
        }
      ],
      complexity: {
        time: "O(m × n)",
        space: "O(m × n)"
      }
    }
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
    visualization: "Tree traversal expanding outward in waves",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `from collections import deque

def shortest_path(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start[0], start[1], 0)])  # (row, col, distance)
    visited = {start}
    directions = [(0,1), (1,0), (0,-1), (-1,0)]
    
    while queue:
        row, col, dist = queue.popleft()
        
        if (row, col) == end:
            return dist
        
        for dr, dc in directions:
            new_r, new_c = row + dr, col + dc
            if (0 <= new_r < rows and 0 <= new_c < cols and
                (new_r, new_c) not in visited and grid[new_r][new_c] != 1):
                visited.add((new_r, new_c))
                queue.append((new_r, new_c, dist + 1))
    
    return -1  # No path found`
        },
        {
          language: "JavaScript",
          code: `function shortestPath(grid, start, end) {
    const rows = grid.length, cols = grid[0].length;
    const queue = [[start[0], start[1], 0]];  // [row, col, distance]
    const visited = new Set([\`\${start[0]},\${start[1]}\`]);
    const directions = [[0,1], [1,0], [0,-1], [-1,0]];
    
    while (queue.length > 0) {
        const [row, col, dist] = queue.shift();
        
        if (row === end[0] && col === end[1]) {
            return dist;
        }
        
        for (const [dr, dc] of directions) {
            const newR = row + dr, newC = col + dc;
            const key = \`\${newR},\${newC}\`;
            if (newR >= 0 && newR < rows && newC >= 0 && newC < cols &&
                !visited.has(key) && grid[newR][newC] !== 1) {
                visited.add(key);
                queue.push([newR, newC, dist + 1]);
            }
        }
    }
    
    return -1;  // No path found
}`
        }
      ],
      complexity: {
        time: "O(m × n)",
        space: "O(m × n)"
      }
    }
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
    visualization: "Decision tree with backtracking paths",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def subsets(nums):
    result = []
    
    def backtrack(start, current):
        result.append(current[:])  # Add copy of current subset
        
        for i in range(start, len(nums)):
            current.append(nums[i])  # Choose
            backtrack(i + 1, current)  # Explore
            current.pop()  # Backtrack (undo choice)
    
    backtrack(0, [])
    return result

# Example: subsets([1,2,3])
# Returns: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`
        },
        {
          language: "JavaScript",
          code: `function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);  // Add copy of current subset
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);  // Choose
            backtrack(i + 1, current);  // Explore
            current.pop();  // Backtrack (undo choice)
        }
    }
    
    backtrack(0, []);
    return result;
}

// Example: subsets([1,2,3])
// Returns: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`
        }
      ],
      complexity: {
        time: "O(2^n)",
        space: "O(n)"
      }
    }
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
    visualization: "Building solution from bottom up, reusing previous results",
    codeExample: {
      examples: [
        {
          language: "Python",
          code: `def climb_stairs(n):
    if n <= 2:
        return n
    
    # dp[i] = number of ways to reach step i
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Space optimized version
def climb_stairs_optimized(n):
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1`
        },
        {
          language: "JavaScript",
          code: `function climbStairs(n) {
    if (n <= 2) return n;
    
    // dp[i] = number of ways to reach step i
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}

// Space optimized version
function climbStairsOptimized(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        [prev2, prev1] = [prev1, current];
    }
    
    return prev1;
}`
        }
      ],
      complexity: {
        time: "O(n)",
        space: "O(n) or O(1) optimized"
      }
    }
  }
];

interface PatternMeta {
  keywords: string[];
  miniExamples: MiniExample[];
  jsTemplate: string;
  practiceProblems: PracticeSet;
}

const patternMeta: Record<string, PatternMeta> = {
  "two-pointers": {
    keywords: [
      "two pointers",
      "pair",
      "sorted",
      "converging",
      "indices",
      "low high",
      "opposite ends",
      "substring"
    ],
    miniExamples: [
      {
        title: "Closest Pair Sum",
        logic: [
          "Start with one pointer at the beginning and one at the end",
          "Compare their sum to the target to decide which pointer to move",
          "Shrink toward the center until you find the best pair"
        ]
      },
      {
        title: "Validate Palindrome",
        logic: [
          "Left pointer skips non letters moving forward, right pointer goes backwards",
          "Compare characters case-insensitively",
          "If mismatch → stop; if pointers cross → string is a palindrome"
        ]
      }
    ],
    jsTemplate: `function twoPointerTemplate(nums, check) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (check(nums[left], nums[right], left, right)) {
      return { leftValue: nums[left], rightValue: nums[right], left, right };
    }

    // Decide which pointer to move based on your condition
    left++;
    // or right--;
  }

  return null;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Pair Adds to Target",
          prompt: "Given a sorted list and a number, return any two values that add to the target."
        },
        {
          title: "Almost Palindrome",
          prompt: "Check if a string becomes a palindrome after removing non letters and ignoring case."
        },
        {
          title: "Move Zeroes",
          prompt: "Shift all zeroes to the end of the array while keeping the order of the rest."
        }
      ],
      medium: [
        {
          title: "Container With Most Water",
          prompt: "Pick two lines that hold the most water without inspecting every pair."
        },
        {
          title: "Longest Subarray Within Limit",
          prompt: "Find the longest subarray where max and min differ by at most limit."
        },
        {
          title: "3Sum Closest",
          prompt: "Return the sum of three numbers closest to target using sorting + two pointers."
        }
      ],
      hard: [
        {
          title: "Trapping Rain Water",
          prompt: "Compute trapped water using two pointers that track the best left/right wall so far."
        }
      ]
    }
  },
  "sliding-window": {
    keywords: [
      "sliding window",
      "window",
      "substring",
      "consecutive",
      "continuous",
      "interval",
      "range",
      "no repeating"
    ],
    miniExamples: [
      {
        title: "Max Sum of Size k",
        logic: [
          "Build a window of size k one element at a time",
          "Once the window reaches k, slide it forward by subtracting the left value and adding the new right value",
          "Track the maximum sum seen"
        ]
      },
      {
        title: "Unique Characters Substring",
        logic: [
          "Grow the window by moving the right pointer and storing counts in a map",
          "If a character repeats, slide the left pointer while reducing counts",
          "Keep the best window length without duplicates"
        ]
      }
    ],
    jsTemplate: `function slidingWindowTemplate(arr, condition, { fixedSize } = {}) {
  let left = 0;
  let best = 0;
  const state = new Map();

  for (let right = 0; right < arr.length; right++) {
    const current = arr[right];
    state.set(current, (state.get(current) ?? 0) + 1);

    while (!condition({ left, right, state })) {
      const leftVal = arr[left++];
      const nextCount = (state.get(leftVal) ?? 0) - 1;
      if (nextCount <= 0) {
        state.delete(leftVal);
      } else {
        state.set(leftVal, nextCount);
      }
    }

    if (!fixedSize || right - left + 1 === fixedSize) {
      best = Math.max(best, right - left + 1);
    }
  }

  return best;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Max Sum Window",
          prompt: "Find the maximum sum of any length-k subarray."
        },
        {
          title: "Smallest Window ≥ Target",
          prompt: "Return the length of the smallest subarray with sum ≥ target."
        },
        {
          title: "Count Good Substrings",
          prompt: "Count substrings of length 3 with all distinct characters."
        }
      ],
      medium: [
        {
          title: "Longest Repeating Replacement",
          prompt: "Given a string and k replacements, find max window where we can make all chars equal."
        },
        {
          title: "Longest Ones With Flips",
          prompt: "You may flip k zeroes to ones; find the longest 1s streak."
        },
        {
          title: "Minimum Window Substring",
          prompt: "Find the smallest substring that contains all characters of t."
        }
      ],
      hard: [
        {
          title: "Substring With At Most K Distinct",
          prompt: "Return the count of substrings that contain at most k distinct characters."
        }
      ]
    }
  },
  "hash-map": {
    keywords: [
      "hash map",
      "dictionary",
      "counting",
      "frequency",
      "lookup",
      "anagram",
      "substring",
      "two sum"
    ],
    miniExamples: [
      {
        title: "Anagram Checker",
        logic: [
          "Count each character in the first string",
          "Subtract the counts using the second string",
          "If all counts drop to zero, they are anagrams"
        ]
      },
      {
        title: "First Unique Character",
        logic: [
          "Walk through characters and count the frequency",
          "Scan the string again to find the first character with count 1"
        ]
      }
    ],
    jsTemplate: `function hashMapTemplate(items, watcher) {
  const map = new Map();

  for (const item of items) {
    const nextValue = watcher(map, item);
    if (nextValue?.done) {
      return nextValue.result;
    }
  }

  return null;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Two Sum",
          prompt: "Return indices of the two numbers that add up to a target."
        },
        {
          title: "First Duplicate",
          prompt: "Return the first element that appears twice in the array."
        },
        {
          title: "Ransom Note",
          prompt: "Check if you can build a note string using letters from magazine."
        }
      ],
      medium: [
        {
          title: "Group Anagrams",
          prompt: "Group strings that share the same letter counts."
        },
        {
          title: "Longest Consecutive Sequence",
          prompt: "Find the length of the longest run of consecutive integers."
        },
        {
          title: "Subarray Sum Equals K",
          prompt: "Count subarrays whose sum equals k using prefix sums in a map."
        }
      ],
      hard: [
        {
          title: "Minimum Window Substring",
          prompt: "Track counts for string t while sliding a window over s."
        }
      ]
    }
  },
  "sorting-greedy": {
    keywords: [
      "sorting",
      "greedy",
      "intervals",
      "activity selection",
      "meeting rooms",
      "difference",
      "pair",
      "interval cover"
    ],
    miniExamples: [
      {
        title: "Meeting Rooms",
        logic: [
          "Sort meetings by end time",
          "Always pick the meeting that finishes earliest",
          "Skip overlaps and count how many you keep"
        ]
      },
      {
        title: "Stick Cutting",
        logic: [
          "Sort costs or lengths",
          "Always make the locally cheapest cut",
          "Greedy choices add up to a global optimum"
        ]
      }
    ],
    jsTemplate: `function greedyTemplate(items, chooser) {
  const sorted = [...items].sort(chooser.sortBy);
  const answer = [];

  for (const item of sorted) {
    if (chooser.shouldPick(item, answer.at(-1))) {
      answer.push(item);
    }
  }

  return answer;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Assign Cookies",
          prompt: "Give smaller cookies to the smallest kids so that more kids are satisfied."
        },
        {
          title: "Maximum Units on Truck",
          prompt: "Sort boxes by units per box and greedily load truck capacity."
        },
        {
          title: "Relative Sort Array",
          prompt: "Use sorting with custom order to rearrange numbers."
        }
      ],
      medium: [
        {
          title: "Non-overlapping Intervals",
          prompt: "Remove the fewest intervals so the rest do not overlap."
        },
        {
          title: "Task Scheduler",
          prompt: "Use counts + greedy selection to spread the most frequent tasks."
        },
        {
          title: "Meeting Rooms II",
          prompt: "Sort start/end times to compute the minimum number of rooms."
        }
      ],
      hard: [
        {
          title: "Minimum Number of Arrows to Burst Balloons",
          prompt: "Sort intervals by end coordinate and shoot greedily."
        }
      ]
    }
  },
  "binary-search": {
    keywords: [
      "binary search",
      "log n",
      "sorted",
      "threshold",
      "first true",
      "last false",
      "rotated array",
      "peak",
      "interval"
    ],
    miniExamples: [
      {
        title: "First Bad Version",
        logic: [
          "Mid is the candidate version",
          "If mid is bad, answer is in left half including mid",
          "If mid is good, move to the right half"
        ]
      },
      {
        title: "Search Insert Position",
        logic: [
          "Binary search the smallest index whose value is ≥ target",
          "Return that index even if value is not equal"
        ]
      }
    ],
    jsTemplate: `function binarySearchTemplate(low, high, works) {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (works(mid)) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Binary Search",
          prompt: "Return index of target in a sorted array or -1."
        },
        {
          title: "Guess Number Higher or Lower",
          prompt: "Use an API to guess a secret number using binary search."
        },
        {
          title: "Square Root",
          prompt: "Return the integer square root using binary search on the answer."
        }
      ],
      medium: [
        {
          title: "Search Rotated Array",
          prompt: "Split the array into sorted halves to locate target."
        },
        {
          title: "Find Peak Element",
          prompt: "Use binary search on neighbors to find a peak."
        },
        {
          title: "Koko Eating Bananas",
          prompt: "Binary search on the eating speed to finish within hours."
        }
      ],
      hard: [
        {
          title: "Median of Two Sorted Arrays",
          prompt: "Binary search the partition using two sorted arrays."
        }
      ]
    }
  },
  dfs: {
    keywords: [
      "dfs",
      "depth first",
      "recursion",
      "stack",
      "islands",
      "components",
      "backtracking",
      "tree"
    ],
    miniExamples: [
      {
        title: "Number of Islands",
        logic: [
          "Scan the grid and launch DFS when you see land",
          "Mark each visited cell so you do not re-count it",
          "Each DFS call accounts for one island"
        ]
      },
      {
        title: "Tree Diameter",
        logic: [
          "Pick a node, DFS to find the farthest point",
          "DFS again from that farthest point to get the diameter"
        ]
      }
    ],
    jsTemplate: `function dfsTemplate(node, visit, seen = new Set()) {
  if (!node || seen.has(node)) return;
  seen.add(node);
  visit(node);
  for (const neighbor of node.neighbors ?? []) {
    dfsTemplate(neighbor, visit, seen);
  }
}`,
    practiceProblems: {
      easy: [
        {
          title: "Maximum Depth of Binary Tree",
          prompt: "Traverse down to leaves to compute height."
        },
        {
          title: "Flood Fill",
          prompt: "Use DFS to recolor connected pixels."
        },
        {
          title: "Path Sum",
          prompt: "Check if any root-to-leaf path equals target."
        }
      ],
      medium: [
        {
          title: "Number of Islands",
          prompt: "Count connected components of land cells."
        },
        {
          title: "Clone Graph",
          prompt: "Deep copy every node using DFS + map."
        },
        {
          title: "Word Search",
          prompt: "Use DFS with backtracking on grid cells."
        }
      ],
      hard: [
        {
          title: "Critical Connections",
          prompt: "Run DFS with timestamps (Tarjan) to find bridges."
        }
      ]
    }
  },
  bfs: {
    keywords: [
      "bfs",
      "breadth first",
      "queue",
      "shortest path",
      "level order",
      "graph",
      "maze",
      "consecutive"
    ],
    miniExamples: [
      {
        title: "Shortest Path in Grid",
        logic: [
          "Push the start cell into a queue",
          "Visit neighbors layer by layer",
          "Return when the target cell is dequeued"
        ]
      },
      {
        title: "Word Ladder",
        logic: [
          "Each word is a node; edges connect words that differ by one letter",
          "BFS levels correspond to number of transformations"
        ]
      }
    ],
    jsTemplate: `function bfsTemplate(start, getNeighbors, isGoal) {
  const queue = [{ node: start, steps: 0 }];
  const seen = new Set([start]);

  while (queue.length) {
    const { node, steps } = queue.shift();
    if (isGoal(node)) return steps;
    for (const neighbor of getNeighbors(node)) {
      if (seen.has(neighbor)) continue;
      seen.add(neighbor);
      queue.push({ node: neighbor, steps: steps + 1 });
    }
  }

  return -1;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Minimum Depth of Binary Tree",
          prompt: "Find the first leaf level."
        },
        {
          title: "Average of Levels",
          prompt: "Traverse each level using BFS."
        },
        {
          title: "Binary Tree Level Order",
          prompt: "Return a list of values per level."
        }
      ],
      medium: [
        {
          title: "Open the Lock",
          prompt: "Every wheel turn is an edge; BFS finds fewest turns."
        },
        {
          title: "Word Ladder",
          prompt: "Find the shortest transformation sequence."
        },
        {
          title: "Rotting Oranges",
          prompt: "Spread rot level by level and count minutes."
        }
      ],
      hard: [
        {
          title: "Shortest Path in Binary Matrix",
          prompt: "BFS in eight directions to reach the bottom-right cell."
        }
      ]
    }
  },
  backtracking: {
    keywords: [
      "backtracking",
      "choices",
      "undo",
      "combinations",
      "permutations",
      "subset",
      "search tree"
    ],
    miniExamples: [
      {
        title: "Generate Parentheses",
        logic: [
          "Choose '(' or ')' only when it keeps the string valid",
          "When length reaches 2n, record the current string"
        ]
      },
      {
        title: "Permutations",
        logic: [
          "Pick an unused number, add it to the path",
          "Explore deeper, then pop it back out"
        ]
      }
    ],
    jsTemplate: `function backtrackTemplate(options, path = [], answers = []) {
  if (done(path)) {
    answers.push([...path]);
    return answers;
  }

  for (const option of options(path)) {
    path.push(option);
    backtrackTemplate(options, path, answers);
    path.pop();
  }

  return answers;
}`,
    practiceProblems: {
      easy: [
        {
          title: "Binary Watch",
          prompt: "Select LEDs that sum to a given time."
        },
        {
          title: "Subsets",
          prompt: "Generate all subsets of a set."
        },
        {
          title: "Letter Case Permutation",
          prompt: "Toggle each letter between lower and upper case."
        }
      ],
      medium: [
        {
          title: "Combination Sum",
          prompt: "Choose numbers that add up to target; reuse allowed."
        },
        {
          title: "Permutations II",
          prompt: "Avoid duplicates while permuting with counts."
        },
        {
          title: "N Queens",
          prompt: "Place queens row by row and backtrack on conflicts."
        }
      ],
      hard: [
        {
          title: "Sudoku Solver",
          prompt: "Fill digits using DFS with constraint pruning."
        }
      ]
    }
  },
  "dynamic-programming": {
    keywords: [
      "dynamic programming",
      "dp",
      "memo",
      "overlap",
      "optimal substructure",
      "knapsack",
      "subsequence",
      "interval"
    ],
    miniExamples: [
      {
        title: "Climbing Stairs",
        logic: [
          "Base cases for step 1 and 2",
          "Every new step is the sum of the previous two counts"
        ]
      },
      {
        title: "House Robber",
        logic: [
          "At each house, choose max of (rob current + skip next) or (skip current)",
          "Store the best up to each index"
        ]
      }
    ],
    jsTemplate: `function dpTemplate(n, compute) {
  const memo = new Map();

  function helper(state) {
    if (memo.has(state.key)) return memo.get(state.key);
    if (state.base) return state.baseValue;
    const value = compute(state, helper);
    memo.set(state.key, value);
    return value;
  }

  return helper(n);
}`,
    practiceProblems: {
      easy: [
        {
          title: "Climbing Stairs",
          prompt: "Count ways to reach the top taking 1 or 2 steps."
        },
        {
          title: "Min Cost Climbing Stairs",
          prompt: "Roll up cumulative cost with DP."
        },
        {
          title: "Tribonacci",
          prompt: "Memoize the tribonacci sequence."
        }
      ],
      medium: [
        {
          title: "Coin Change",
          prompt: "Fewest coins to make a target sum."
        },
        {
          title: "Longest Increasing Subsequence",
          prompt: "Keep best length ending at each index."
        },
        {
          title: "Palindromic Substrings",
          prompt: "Use DP to expand palindromes and count them."
        }
      ],
      hard: [
        {
          title: "Edit Distance",
          prompt: "Classic 2D DP comparing prefixes."
        }
      ]
    }
  }
};

export const topicsData: Topic[] = baseTopics.map((topic) => ({
  ...topic,
  ...patternMeta[topic.id],
}));