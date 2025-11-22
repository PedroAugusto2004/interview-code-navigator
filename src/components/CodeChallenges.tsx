import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Lightbulb, Play } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
  hints: string[];
}

interface CodeChallengesProps {
  challenges: {
    easy: Challenge;
    medium: Challenge;
    hard: Challenge;
  };
}

export const CodeChallenges = ({ challenges }: CodeChallengesProps) => {
  const [activeLevel, setActiveLevel] = useState<"easy" | "medium" | "hard">("easy");
  const [code, setCode] = useState(challenges[activeLevel].starterCode);
  const [showHints, setShowHints] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: number; total: number } | null>(null);

  const challenge = challenges[activeLevel];

  const runTests = () => {
    try {
      const fn = new Function("return " + code)();
      let passed = 0;
      challenge.testCases.forEach(({ input, expected }) => {
        const result = fn(JSON.parse(input));
        if (JSON.stringify(result) === expected) {
          passed++;
        }
      });
      setTestResults({ passed, total: challenge.testCases.length });
    } catch (e) {
      setTestResults({ passed: 0, total: challenge.testCases.length });
    }
  };

  const handleLevelChange = (level: "easy" | "medium" | "hard") => {
    setActiveLevel(level);
    setCode(challenges[level].starterCode);
    setTestResults(null);
    setShowHints(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(["easy", "medium", "hard"] as const).map((level) => (
          <Button
            key={level}
            variant={activeLevel === level ? "default" : "outline"}
            onClick={() => handleLevelChange(level)}
            className="capitalize"
          >
            {level}
          </Button>
        ))}
      </div>

      <Card className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
          <p className="text-muted-foreground">{challenge.description}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Code Editor</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 bg-muted rounded-lg font-mono text-sm border border-border resize-none"
            spellCheck="false"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={runTests} className="gap-2">
            <Play className="h-4 w-4" />
            Run Tests
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowHints(!showHints)}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Hints
          </Button>
        </div>

        {showHints && (
          <Card className="p-4 bg-amber-500/5 border-amber-400/50">
            <div className="space-y-2">
              {challenge.hints.map((hint, i) => (
                <div key={i} className="text-sm text-amber-900 dark:text-amber-200">
                  <span className="font-semibold">Hint {i + 1}:</span> {hint}
                </div>
              ))}
            </div>
          </Card>
        )}

        {testResults && (
          <Card className={`p-4 ${testResults.passed === testResults.total ? "bg-emerald-500/5 border-emerald-400/50" : "bg-red-500/5 border-red-400/50"}`}>
            <div className="text-sm font-semibold">
              {testResults.passed === testResults.total ? "✓ All tests passed!" : `${testResults.passed}/${testResults.total} tests passed`}
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
};
