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