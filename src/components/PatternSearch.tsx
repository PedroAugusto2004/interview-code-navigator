import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { topicsData, Topic } from "@/data/topics";
import { keywordSuggestions, topicLookup } from "@/data/patternTrainer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PatternSearchVariant = "full" | "compact";

const fuseOptions: Fuse.IFuseOptions<Topic> = {
  includeScore: true,
  threshold: 0.35,
  keys: [
    "title",
    "subtitle",
    "whatItIs",
    "whenUsed",
    "template",
    "example.problem",
    "example.solution",
    "keywords",
    "miniExamples.title",
    "miniExamples.logic"
  ]
};

const defaultKeywords = Object.keys(keywordSuggestions);

export const PatternSearch = ({ variant = "full" }: { variant?: PatternSearchVariant }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(topicsData, fuseOptions), []);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return topicsData.slice(0, variant === "compact" ? 4 : 6);
    }
    return fuse
      .search(normalizedQuery)
      .map((match) => match.item)
      .slice(0, variant === "compact" ? 5 : 8);
  }, [fuse, normalizedQuery, variant]);

  const matchedSuggestions = useMemo(() => {
    if (!normalizedQuery) return [];
    const ids = new Set<string>();
    Object.entries(keywordSuggestions).forEach(([keyword, patterns]) => {
      if (keyword.includes(normalizedQuery)) {
        patterns.forEach((id) => ids.add(id));
      }
    });
    return Array.from(ids).map((id) => topicLookup.get(id)).filter(Boolean) as Topic[];
  }, [normalizedQuery]);

  const handleSelect = (topicId: string) => {
    navigate(`/topic/${topicId}`);
  };

  return (
    <Card
      className={cn(
        "border-border/70 bg-card/80 backdrop-blur-sm",
        variant === "full" ? "p-6 md:p-8" : "p-4"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Search className="h-4 w-4 text-primary" />
            Instant Pattern Search
          </div>
          <div className="relative">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by keyword (substring, intervals, pair, no repeats...)"
              className="pl-10 text-base"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          {!normalizedQuery && (
            <div className="flex flex-wrap gap-2 text-sm">
              {defaultKeywords.map((keyword) => (
                <Button
                  key={keyword}
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setQuery(keyword)}
                >
                  {keyword}
                </Button>
              ))}
            </div>
          )}
        </div>

        {normalizedQuery && matchedSuggestions.length > 0 && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Suggested patterns for “{normalizedQuery}”
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {matchedSuggestions.map((topic) => (
                <Badge
                  key={topic.id}
                  variant="secondary"
                  className="cursor-pointer rounded-full"
                  onClick={() => handleSelect(topic.id)}
                >
                  {topic.title}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {results.length === 0 && (
            <Card className="p-4 bg-muted/40 text-sm text-muted-foreground">
              Nothing yet. Try keywords like “substring”, “consecutive”, “pair”, or “intervals”.
            </Card>
          )}

          {results.map((topic) => (
            <button
              key={topic.id}
              className="w-full rounded-2xl border border-border/70 bg-background/70 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/5"
              onClick={() => handleSelect(topic.id)}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-foreground">{topic.title}</div>
                  <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
                </div>
                <Badge variant="outline" className="hidden shrink-0 text-xs font-mono md:inline-flex">
                  {topic.whenUsed[0]}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {topic.keywords.slice(0, 4).map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="rounded-full text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

