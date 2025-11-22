import { Link } from "react-router-dom";
import { Code2, Rocket } from "lucide-react";

import heroImage from "@/assets/hero-image.jpg";
import { TopicCard } from "@/components/TopicCard";
import { topicsData } from "@/data/topics";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "What is this pattern?",
    body: "Plain-English definition plus diagrams so you store the idea, not syntax."
  },
  {
    title: "When to use it",
    body: "Look for the signals: keywords, constraints, and shapes that scream the pattern."
  },
  {
    title: "Mental template",
    body: "Step-by-step instructions written like a checklist you can run in your head."
  },
  {
    title: "Ultra-simple examples",
    body: "1–2 bite-sized stories that explain the logic behind the moves, not the code."
  },
  {
    title: "Beginner-friendly JS code",
    body: "Minimal JavaScript template you can adapt on the fly during live coding."
  },
  {
    title: "Practice sets",
    body: "3 easy, 3 medium, +1 hard prompts for every single pattern. No guesswork."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <img
          src={heroImage}
          alt="Pattern based prep"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Code2 className="h-4 w-4" />
              Learn patterns once → reuse forever
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              90% of interview problems are patterns. Master them here.
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Every page breaks a pattern into signals, templates, brain-friendly examples, JavaScript snippets,
              and practice reps. Search it, study it, drill it—desktop or mobile.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/trainer">
                  <Rocket className="h-5 w-5" />
                  Open Trainer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-border/60 bg-card/80 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pattern library</p>
            <h2 className="text-3xl font-bold text-foreground">9 essential blueprints</h2>
            <p className="text-lg text-muted-foreground">
              Tap into detailed explanations, logic-first examples, JavaScript templates, and curated practice sets.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {topicsData.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pattern Trainer</p>
            <h3 className="mt-2 text-xl font-bold text-foreground">See the clue → call the pattern</h3>
            <p className="mt-2 text-muted-foreground">
              Rapid-fire prompts that teach your brain to match signals with solutions.
            </p>
            <Button asChild className="mt-4 w-full">
              <Link to="/trainer">Start training</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-emerald-400/50 bg-emerald-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
              Daily Practice Generator
            </p>
            <h3 className="mt-2 text-xl font-bold text-foreground">1 easy · 1 medium · 1 review</h3>
            <p className="mt-2 text-muted-foreground">
              Auto-build a daily set and stash your progress in localStorage.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full border-emerald-400 text-emerald-600">
              <Link to="/daily">Generate now</Link>
            </Button>
          </div>
          <div className="rounded-2xl border border-amber-400/60 bg-amber-500/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-500">Quick quizzes</p>
            <h3 className="mt-2 text-xl font-bold text-foreground">Turn hints into reflexes</h3>
            <p className="mt-2 text-muted-foreground">
              Snap-answer prompts like "no repeating characters" → Sliding Window.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full border-amber-400 text-amber-600">
              <Link to="/quizzes">Start quiz</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
