import { useMemo, useState } from "react";
import { Brain, RefreshCw, ShieldCheck } from "lucide-react";

import { trainerPrompts } from "@/data/patternTrainer";
import { topicsData } from "@/data/topics";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getRandomPromptId = (excludeId?: string) => {
  const available = trainerPrompts.filter((prompt) => prompt.id !== excludeId);
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex] ?? trainerPrompts[0];
};

export const PatternTrainer = () => {
  const [prompt, setPrompt] = useState(() => getRandomPromptId());
  const [guess, setGuess] = useState<string | null>(null);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [stats, setStats] = useState({ attempts: 0, correct: 0 });

  const accuracy = stats.attempts === 0 ? 0 : Math.round((stats.correct / stats.attempts) * 100);

  const patternOptions = useMemo(
    () =>
      topicsData.map((topic) => ({
        id: topic.id,
        title: topic.title,
        subtitle: topic.subtitle
      })),
    []
  );

  const handleCheck = () => {
    if (!guess || result) return;
    const isCorrect = guess === prompt.patternId;
    setResult(isCorrect ? "correct" : "incorrect");
    setStats((prev) => ({
      attempts: prev.attempts + 1,
      correct: prev.correct + (isCorrect ? 1 : 0)
    }));
  };

  const handleNext = () => {
    setPrompt(getRandomPromptId(prompt.id));
    setGuess(null);
    setResult(null);
  };

  const feedback =
    result === "correct"
      ? {
          label: "Nice call! That’s the right pattern.",
          tone: "text-emerald-500"
        }
      : result === "incorrect"
        ? {
            label: "Not quite. Review the signals and try again.",
            tone: "text-rose-500"
          }
        : null;

  const correctPattern = topicsData.find((topic) => topic.id === prompt.patternId);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <div className="mb-10 space-y-4">
            <Badge variant="outline" className="gap-2 rounded-full px-3 py-1 text-sm">
              <Brain className="h-4 w-4 text-primary" />
              Pattern Recognition Trainer
            </Badge>
            <h1 className="text-4xl font-bold leading-tight text-foreground">
              See the clue, call the pattern, build instant reflexes.
            </h1>
            <p className="text-lg text-muted-foreground">
              Read the statement, guess the pattern, and check yourself. The more you loop through this, the
              faster your brain associates signals with solutions.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Correct streak</p>
              <p className="text-3xl font-bold text-emerald-500">
                {stats.correct} / {stats.attempts}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-3xl font-bold">{accuracy}%</p>
            </Card>
          </div>

          <Card className="mb-10 border-primary/30 bg-card/80 p-6 shadow-lg shadow-primary/5">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Problem</p>
                <p className="text-xl font-semibold text-foreground">{prompt.statement}</p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Signals</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {prompt.signals.map((signal) => (
                    <Badge key={signal} variant="secondary" className="rounded-full">
                      {signal}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  Guess the pattern
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {patternOptions.map((pattern) => (
                    <Button
                      key={pattern.id}
                      type="button"
                      variant={guess === pattern.id ? "default" : "outline"}
                      className="h-auto justify-start rounded-2xl p-4 text-left"
                      onClick={() => setGuess(pattern.id)}
                      disabled={!!result}
                    >
                      <div>
                        <p className="font-semibold">{pattern.title}</p>
                        <p className="text-sm text-muted-foreground">{pattern.subtitle}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {feedback && (
                <div className={`flex items-start gap-3 rounded-xl border p-4 ${feedback.tone}`}>
                  <ShieldCheck className="mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-semibold">{feedback.label}</p>
                    {correctPattern && (
                      <p className="text-sm">
                        Correct pattern: <strong>{correctPattern.title}</strong>. {prompt.answer}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button className="flex-1" onClick={handleCheck} disabled={!guess || !!result}>
                  Check Answer
                </Button>
                <Button variant="secondary" className="flex-1 gap-2" onClick={handleNext}>
                  <RefreshCw className="h-4 w-4" />
                  Next Problem
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">How to get the most out of this</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Say the pattern out loud to build voice memory.</li>
              <li>Write down the trigger words that made you choose it.</li>
              <li>Track wrong answers and revisit those patterns tomorrow.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatternTrainer;

