import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, Check, X } from "lucide-react";

interface VisualDiagramProps {
  topicId: string;
}

export const VisualDiagram = ({ topicId }: VisualDiagramProps) => {
  const renderDiagram = () => {
    switch (topicId) {
      case "two-pointers":
        return <TwoPointersVisual />;
      case "sliding-window":
        return <SlidingWindowVisual />;
      case "hash-map":
        return <HashMapVisual />;
      case "sorting-greedy":
        return <SortingGreedyVisual />;
      case "binary-search":
        return <BinarySearchVisual />;
      case "dfs":
        return <DFSVisual />;
      case "bfs":
        return <BFSVisual />;
      case "backtracking":
        return <BacktrackingVisual />;
      case "dynamic-programming":
        return <DPVisual />;
      default:
        return (
          <div className="text-center py-12 text-muted-foreground">
            Visual representation coming soon
          </div>
        );
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-muted/30 overflow-hidden min-h-[300px] flex items-center justify-center">
      {renderDiagram()}
    </Card>
  );
};

// --- Sub-components for each pattern ---

const TwoPointersVisual = () => {
  const [step, setStep] = useState(0);
  const nums = [2, 3, 5, 8, 11, 15];
  const target = 13;

  // Steps: { left, right, status }
  const steps = [
    { left: 0, right: 5, sum: 17, action: "Too big (17 > 13) → Move Right Left" },
    { left: 0, right: 4, sum: 13, action: "Match found! (2 + 11 = 13)" },
    { left: 0, right: 4, sum: 13, action: "Resetting..." }, // Pause state
  ];

  // Actually let's do a proper sequence for 2+11=13
  // 2+15=17 > 13 -> right--
  // 2+11=13 -> found

  const sequence = [
    { left: 0, right: 5 }, // 2+15=17 > 13
    { left: 0, right: 4 }, // 2+11=13 (Match)
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 1)); // +1 for pause
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const current = sequence[Math.min(step, sequence.length - 1)];
  const isResetting = step === sequence.length;
  const sum = nums[current.left] + nums[current.right];
  const isMatch = sum === target;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Target: {target}</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : `Current Sum: ${nums[current.left]} + ${nums[current.right]} = ${sum}`}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {nums.map((num, idx) => (
          <div key={idx} className="relative">
            <div
              className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all duration-500 ${idx === current.left || idx === current.right
                ? isMatch && !isResetting
                  ? "bg-emerald-500 text-white border-emerald-500 scale-110"
                  : "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border"
                }`}
            >
              {num}
            </div>
            {/* Pointers */}
            {!isResetting && idx === current.left && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce">
                <ArrowUp className="h-5 w-5" />
              </div>
            )}
            {!isResetting && idx === current.right && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce">
                <ArrowUp className="h-5 w-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
        {isResetting
          ? "Restarting simulation..."
          : isMatch
            ? "Target found! Return indices."
            : sum > target
              ? "Sum is too large, decrease right pointer."
              : "Sum is too small, increase left pointer."}
      </div>
    </div>
  );
};

const SlidingWindowVisual = () => {
  const [step, setStep] = useState(0);
  const str = "abcabcbb";
  // Longest substring without repeating chars

  const sequence = [
    { left: 0, right: 0, curr: "a" },
    { left: 0, right: 1, curr: "ab" },
    { left: 0, right: 2, curr: "abc" },
    { left: 0, right: 3, curr: "abca", error: true }, // Duplicate a
    { left: 1, right: 3, curr: "bca" }, // Shrink left
    { left: 1, right: 4, curr: "bcab", error: true }, // Duplicate b
    { left: 2, right: 4, curr: "cab" }, // Shrink left
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const current = sequence[Math.min(step, sequence.length - 1)];
  const isResetting = step === sequence.length;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Longest Unique Substring</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : `Window: "${current.curr}"`}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1">
        {str.split("").map((char, idx) => {
          const inWindow = !isResetting && idx >= current.left && idx <= current.right;
          return (
            <div
              key={idx}
              className={`w-10 h-10 flex items-center justify-center border-2 rounded-md font-mono transition-all duration-300 ${inWindow
                ? current.error
                  ? "bg-rose-100 border-rose-500 text-rose-700"
                  : "bg-primary/20 border-primary text-primary"
                : "bg-muted/30 border-transparent text-muted-foreground"
                }`}
            >
              {char}
            </div>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
        {isResetting
          ? "Restarting..."
          : current.error
            ? "Duplicate found! Shrink window from left."
            : "Valid window. Expand right."}
      </div>
    </div>
  );
};

const HashMapVisual = () => {
  const [step, setStep] = useState(0);
  const nums = [2, 7, 11, 15];
  const target = 9;

  // Two Sum with Hash Map
  const sequence = [
    { idx: 0, num: 2, map: {}, action: "Need 7. Map empty. Store 2." },
    { idx: 1, num: 7, map: { 2: 0 }, action: "Need 2. Found 2 in map! Return indices." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const current = sequence[Math.min(step, sequence.length - 1)];
  const isResetting = step === sequence.length;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Two Sum (Target: {target})</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : current.action}
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Array */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase text-muted-foreground text-center">Array</div>
          <div className="flex flex-col gap-2">
            {nums.map((num, idx) => (
              <div
                key={idx}
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all ${!isResetting && idx === current.idx
                  ? "bg-primary text-primary-foreground border-primary scale-110"
                  : "bg-card border-border"
                  }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex flex-col gap-2 min-w-[120px]">
          <div className="text-xs font-semibold uppercase text-muted-foreground text-center">Hash Map</div>
          <div className="border-2 border-dashed border-border rounded-xl p-4 min-h-[150px] space-y-2">
            {isResetting ? null : Object.entries(current.map).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center bg-muted px-3 py-2 rounded text-sm animate-in fade-in slide-in-from-bottom-2">
                <span className="font-mono">Key:{key}</span>
                <span className="text-muted-foreground">Idx:{val}</span>
              </div>
            ))}
            {!isResetting && Object.keys(current.map).length === 0 && (
              <div className="text-xs text-muted-foreground text-center italic pt-4">Empty</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BinarySearchVisual = () => {
  const [step, setStep] = useState(0);
  const nums = [1, 3, 5, 8, 11, 15, 19, 22];
  const target = 15;

  const sequence = [
    { low: 0, high: 7, mid: 3, val: 8, action: "8 < 15. Go Right." },
    { low: 4, high: 7, mid: 5, val: 15, action: "15 == 15. Found!" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const current = sequence[Math.min(step, sequence.length - 1)];
  const isResetting = step === sequence.length;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Find {target}</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : current.action}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1">
        {nums.map((num, idx) => {
          const isMid = !isResetting && idx === current.mid;
          const inRange = !isResetting && idx >= current.low && idx <= current.high;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 flex items-center justify-center border-2 rounded-md font-bold transition-all duration-500 ${isMid
                  ? "bg-primary text-primary-foreground border-primary scale-110 z-10 shadow-lg"
                  : inRange
                    ? "bg-card border-primary/50 text-foreground"
                    : "bg-muted/20 border-transparent text-muted-foreground/30 scale-90"
                  }`}
              >
                {num}
              </div>
              <div className="h-4 text-[10px] font-mono text-muted-foreground">
                {isMid ? "mid" : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DFSVisual = () => {
  const [step, setStep] = useState(0);
  // Simple tree: 1 -> (2, 3), 2 -> (4, 5)
  // Order: 1, 2, 4, 5, 3

  const sequence = [1, 2, 4, 5, 3];
  const tree = {
    1: { children: [2, 3], pos: "top-0 left-1/2 -translate-x-1/2" },
    2: { children: [4, 5], pos: "top-16 left-1/3 -translate-x-1/2" },
    3: { children: [], pos: "top-16 left-2/3 -translate-x-1/2" },
    4: { children: [], pos: "top-32 left-1/4 -translate-x-1/2" },
    5: { children: [], pos: "top-32 left-[42%] -translate-x-1/2" },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 2)); // +2 for full view then reset
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isResetting = step >= sequence.length + 1;
  const visited = new Set(sequence.slice(0, isResetting ? 0 : step + 1));
  const current = sequence[step];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg h-[250px]">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Depth-First Search</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : `Visiting Node: ${current || "Done"}`}
        </div>
      </div>

      <div className="relative w-full h-full">
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border" style={{ zIndex: 0 }}>
          <line x1="50%" y1="20" x2="33%" y2="84" strokeWidth="2" />
          <line x1="50%" y1="20" x2="66%" y2="84" strokeWidth="2" />
          <line x1="33%" y1="84" x2="25%" y2="148" strokeWidth="2" />
          <line x1="33%" y1="84" x2="42%" y2="148" strokeWidth="2" />
        </svg>

        {Object.entries(tree).map(([node, data]) => {
          const isVisited = visited.has(Number(node));
          const isCurrent = !isResetting && Number(node) === current;

          return (
            <div
              key={node}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-500 ${data.pos} ${isCurrent
                ? "bg-primary text-primary-foreground border-primary scale-125 shadow-lg z-10"
                : isVisited
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-card border-border text-muted-foreground"
                }`}
            >
              {node}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BFSVisual = () => {
  const [step, setStep] = useState(0);
  // Order: 1, 2, 3, 4, 5

  const sequence = [1, 2, 3, 4, 5];
  const tree = {
    1: { children: [2, 3], pos: "top-0 left-1/2 -translate-x-1/2" },
    2: { children: [4, 5], pos: "top-16 left-1/3 -translate-x-1/2" },
    3: { children: [], pos: "top-16 left-2/3 -translate-x-1/2" },
    4: { children: [], pos: "top-32 left-1/4 -translate-x-1/2" },
    5: { children: [], pos: "top-32 left-[42%] -translate-x-1/2" },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 2));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isResetting = step >= sequence.length + 1;
  const visited = new Set(sequence.slice(0, isResetting ? 0 : step + 1));
  const current = sequence[step];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg h-[250px]">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Breadth-First Search</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : `Visiting Node: ${current || "Done"}`}
        </div>
      </div>

      <div className="relative w-full h-full">
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border" style={{ zIndex: 0 }}>
          <line x1="50%" y1="20" x2="33%" y2="84" strokeWidth="2" />
          <line x1="50%" y1="20" x2="66%" y2="84" strokeWidth="2" />
          <line x1="33%" y1="84" x2="25%" y2="148" strokeWidth="2" />
          <line x1="33%" y1="84" x2="42%" y2="148" strokeWidth="2" />
        </svg>

        {Object.entries(tree).map(([node, data]) => {
          const isVisited = visited.has(Number(node));
          const isCurrent = !isResetting && Number(node) === current;

          return (
            <div
              key={node}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-500 ${data.pos} ${isCurrent
                ? "bg-cyan-500 text-white border-cyan-500 scale-125 shadow-lg z-10"
                : isVisited
                  ? "bg-cyan-500/20 border-cyan-500 text-cyan-600"
                  : "bg-card border-border text-muted-foreground"
                }`}
            >
              {node}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BacktrackingVisual = () => {
  const [step, setStep] = useState(0);
  // Subsets of [1, 2]
  // [] -> [1] -> [1, 2] -> [1] -> [] -> [2] -> []

  const sequence = [
    { path: [], action: "Start empty" },
    { path: [1], action: "Include 1" },
    { path: [1, 2], action: "Include 2 (Leaf)" },
    { path: [1], action: "Backtrack (remove 2)" },
    { path: [], action: "Backtrack (remove 1)" },
    { path: [2], action: "Include 2" },
    { path: [], action: "Backtrack (remove 2)" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const current = sequence[Math.min(step, sequence.length - 1)];
  const isResetting = step === sequence.length;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Backtracking (Subsets of [1, 2])</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : current.action}
        </div>
      </div>

      <div className="flex gap-2 min-h-[60px]">
        {isResetting ? null : (
          <>
            <div className="text-2xl font-mono text-muted-foreground">[</div>
            {current.path.map((num, idx) => (
              <div key={idx} className="flex items-center animate-in zoom-in duration-300">
                {idx > 0 && <span className="text-muted-foreground mr-2">,</span>}
                <div className="w-10 h-10 rounded bg-pink-500 text-white flex items-center justify-center font-bold shadow-md">
                  {num}
                </div>
              </div>
            ))}
            <div className="text-2xl font-mono text-muted-foreground">]</div>
          </>
        )}
      </div>
    </div>
  );
};

const DPVisual = () => {
  const [step, setStep] = useState(0);
  // Fibonacci: 0, 1, 1, 2, 3, 5

  const sequence = [
    { idx: 0, val: 0, action: "Base case: F(0) = 0" },
    { idx: 1, val: 1, action: "Base case: F(1) = 1" },
    { idx: 2, val: 1, action: "F(2) = F(1) + F(0) = 1 + 0 = 1" },
    { idx: 3, val: 2, action: "F(3) = F(2) + F(1) = 1 + 1 = 2" },
    { idx: 4, val: 3, action: "F(4) = F(3) + F(2) = 2 + 1 = 3" },
    { idx: 5, val: 5, action: "F(5) = F(4) + F(3) = 3 + 2 = 5" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const isResetting = step >= sequence.length + 1;
  const filled = sequence.slice(0, isResetting ? 0 : step + 1);
  const current = sequence[Math.min(step, sequence.length - 1)];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Dynamic Programming (Fibonacci)</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : current?.action}
        </div>
      </div>

      <div className="flex gap-2">
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const item = filled.find(i => i.idx === idx);
          const isNew = !isResetting && item && item.idx === current?.idx;

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all duration-500 ${item
                  ? isNew
                    ? "bg-orange-500 text-white border-orange-500 scale-110"
                    : "bg-orange-500/20 border-orange-500 text-orange-700"
                  : "bg-muted border-border text-transparent"
                  }`}
              >
                {item ? item.val : "?"}
              </div>
              <div className="text-xs text-muted-foreground">F({idx})</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SortingGreedyVisual = () => {
  const [step, setStep] = useState(0);
  // Meetings: [1-3], [2-4], [3-5], [5-6]
  // Sorted by end time: [1-3], [2-4], [3-5], [5-6] (Already sorted roughly)

  const meetings = [
    { id: "A", start: 1, end: 3 },
    { id: "B", start: 2, end: 4 },
    { id: "C", start: 3, end: 5 },
    { id: "D", start: 5, end: 6 },
  ];

  const sequence = [
    { id: "A", action: "Pick A (Ends at 3)", accepted: true },
    { id: "B", action: "B starts at 2 < 3. Conflict! Skip.", accepted: false },
    { id: "C", action: "C starts at 3 >= 3. Pick C (Ends at 5)", accepted: true },
    { id: "D", action: "D starts at 5 >= 5. Pick D (Ends at 6)", accepted: true },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (sequence.length + 2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const isResetting = step >= sequence.length + 1;
  const currentStep = sequence[Math.min(step, sequence.length - 1)];

  // Calculate processed meetings based on step
  const processed = new Set(sequence.slice(0, isResetting ? 0 : step + 1).map(s => s.id));
  const accepted = new Set(sequence.slice(0, isResetting ? 0 : step + 1).filter(s => s.accepted).map(s => s.id));

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">Greedy: Max Meetings</div>
        <div className="h-6 text-sm text-muted-foreground">
          {isResetting ? "Resetting..." : currentStep?.action}
        </div>
      </div>

      <div className="space-y-2 w-full">
        {meetings.map((m) => {
          const isProcessed = processed.has(m.id);
          const isAccepted = accepted.has(m.id);
          const isCurrent = !isResetting && currentStep?.id === m.id;

          return (
            <div
              key={m.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-500 ${isCurrent
                ? "scale-105 shadow-lg bg-card border-primary"
                : isProcessed
                  ? isAccepted
                    ? "bg-emerald-500/10 border-emerald-500 opacity-100"
                    : "bg-muted/50 border-transparent opacity-50 grayscale"
                  : "bg-card border-border"
                }`}
            >
              <div className="font-semibold">Meeting {m.id}</div>
              <div className="text-sm font-mono">{m.start}:00 - {m.end}:00</div>
              <div className="w-6">
                {isProcessed && (
                  isAccepted ? <Check className="w-5 h-5 text-emerald-500" /> : <X className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};