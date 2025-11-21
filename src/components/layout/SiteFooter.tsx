import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background/90">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Pattern Navigator</p>
            <p className="text-muted-foreground">
              Learn the signal → recall the pattern → apply it under pressure.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/trainer">Pattern Trainer</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/daily">Daily Generator</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/quizzes">Quick Quizzes</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

