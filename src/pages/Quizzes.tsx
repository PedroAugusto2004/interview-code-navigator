import { useMemo, useState } from "react";
import { CheckCircle2, HelpCircle, RotateCcw, XCircle } from "lucide-react";

import { quizQuestions } from "@/data/patternTrainer";
import { topicsData } from "@/data/topics";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const patternTitles = new Map(topicsData.map((topic) => [topic.id, topic.title]));

export const Quizzes = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});

  const score = useMemo(() => Object.values(results).filter(Boolean).length, [results]);

  const handleSelect = (questionId: string, option: string, correctAnswer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setResults((prev) => ({ ...prev, [questionId]: option === correctAnswer }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setResults({});
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-3">
            <Badge variant="outline" className="rounded-full px-3 py-1 text-sm">
              Reflex Quizzes
            </Badge>
            <h1 className="text-4xl font-bold text-foreground">
              Rapid-fire cues → instant pattern recall.
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick the pattern as soon as you read the clue. The more sparks you trigger, the faster your
              interviews feel.
            </p>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm">
                Score: {score} / {quizQuestions.length}
              </Badge>
              <Button variant="ghost" size="sm" className="gap-2" onClick={resetQuiz}>
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((question) => {
              const selected = answers[question.id];
              const isCorrect = results[question.id];
              return (
                <Card key={question.id} className="p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-1 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-lg font-semibold text-foreground">{question.question}</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {question.options.map((option) => (
                          <Button
                            key={option}
                            variant={selected === option ? "default" : "outline"}
                            className="justify-start"
                            onClick={() => handleSelect(question.id, option, question.answer)}
                          >
                            {patternTitles.get(option) ?? option}
                          </Button>
                        ))}
                      </div>
                      {selected && (
                        <div className="mt-4 flex items-start gap-2 text-sm">
                          {isCorrect ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                          ) : (
                            <XCircle className="mt-0.5 h-4 w-4 text-rose-500" />
                          )}
                          <p className={isCorrect ? "text-emerald-600" : "text-rose-600"}>
                            {isCorrect ? "Correct." : "Not this time."} {question.explanation}{" "}
                            <strong>{patternTitles.get(question.answer)}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizzes;

