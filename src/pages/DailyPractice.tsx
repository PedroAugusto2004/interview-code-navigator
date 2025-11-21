import { useEffect, useState } from "react";
import { CalendarClock, History, RefreshCw, Save } from "lucide-react";

import { topicsData, PracticeProblem } from "@/data/topics";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PracticeEntry = PracticeProblem & { patternId: string; patternTitle: string };

interface DailyPlan {
  id: string;
  createdAt: number;
  easy: PracticeEntry;
  medium: PracticeEntry;
  pattern: {
    id: string;
    title: string;
    whatItIs: string;
    whenUsed: string[];
  };
}

const HISTORY_KEY = "pattern-practice-history";

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  });

const pickRandom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const easyPool: PracticeEntry[] = topicsData.flatMap((topic) =>
  topic.practiceProblems.easy.map((problem) => ({
    ...problem,
    patternId: topic.id,
    patternTitle: topic.title
  })),
);

const mediumPool: PracticeEntry[] = topicsData.flatMap((topic) =>
  topic.practiceProblems.medium.map((problem) => ({
    ...problem,
    patternId: topic.id,
    patternTitle: topic.title
  })),
);

const buildPlan = (): DailyPlan => {
  const pattern = pickRandom(topicsData);
  const easyProblem = pickRandom(easyPool);
  const mediumProblem = pickRandom(mediumPool);
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: Date.now(),
    pattern: {
      id: pattern.id,
      title: pattern.title,
      whatItIs: pattern.whatItIs,
      whenUsed: pattern.whenUsed
    },
    easy: easyProblem,
    medium: mediumProblem
  };
};

export const DailyPractice = () => {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [history, setHistory] = useState<DailyPlan[]>([]);

  useEffect(() => {
    setPlan(buildPlan());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        const parsed: DailyPlan[] = JSON.parse(stored);
        setHistory(parsed);
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const persistHistory = (entries: DailyPlan[]) => {
    setHistory(entries);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
    }
  };

  const saveSession = () => {
    if (!plan) return;
    const nextHistory = [plan, ...history].slice(0, 20);
    persistHistory(nextHistory);
  };

  const regenerate = () => {
    setPlan(buildPlan());
  };

  const reviewItem = history[0];

  if (!plan) {
    return null;
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl space-y-10">
          <div className="space-y-4">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-sm">
              Daily Practice Generator
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">Your curated reps for today.</h1>
            <p className="text-lg text-muted-foreground">
              Each set gives you one easy win, one medium push, one pattern reminder, and a throwback problem to
              review. Save it, finish it, repeat tomorrow.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="gap-2" onClick={regenerate}>
                <RefreshCw className="h-4 w-4" />
                Generate new plan
              </Button>
              <Button variant="secondary" className="gap-2" onClick={saveSession}>
                <Save className="h-4 w-4" />
                Save to history
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col gap-4 border-l-4 border-l-emerald-400 p-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Easy Rep</Badge>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {plan.easy.patternTitle}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{plan.easy.title}</h3>
              <p className="text-muted-foreground">{plan.easy.prompt}</p>
            </Card>

            <Card className="flex flex-col gap-4 border-l-4 border-l-primary p-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Medium Rep</Badge>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {plan.medium.patternTitle}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{plan.medium.title}</h3>
              <p className="text-muted-foreground">{plan.medium.prompt}</p>
            </Card>
          </div>

          <Card className="border border-border/70 bg-card/80 p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CalendarClock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Pattern spotlight</p>
                  <p className="text-xl font-semibold">{plan.pattern.title}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{plan.pattern.whatItIs}</p>
              <div className="flex flex-wrap gap-2">
                {plan.pattern.whenUsed.slice(0, 4).map((signal) => (
                  <Badge key={signal} variant="outline" className="rounded-full text-xs">
                    {signal}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border border-dashed border-border/70 p-6">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Review from history</p>
                <p className="text-lg font-semibold">
                  {reviewItem ? reviewItem.pattern.title : "No saved sessions yet"}
                </p>
              </div>
            </div>
            {reviewItem ? (
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>Easy:</strong> {reviewItem.easy.title}
                </p>
                <p>
                  <strong>Medium:</strong> {reviewItem.medium.title}
                </p>
                <p className="text-xs text-muted-foreground">Saved on {formatDate(reviewItem.createdAt)}</p>
              </div>
            ) : (
              <p className="mt-4 text-muted-foreground">
                Save a session to see it show up here for spaced repetition.
              </p>
            )}
          </Card>

          {history.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold">History</h2>
              <div className="mt-4 space-y-4">
                {history.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="rounded-lg border border-border/60 p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatDate(entry.createdAt)}</span>
                      <span>{entry.pattern.title}</span>
                    </div>
                    <p className="mt-2 text-sm">
                      Easy: <strong>{entry.easy.title}</strong>
                    </p>
                    <p className="text-sm">
                      Medium: <strong>{entry.medium.title}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyPractice;

