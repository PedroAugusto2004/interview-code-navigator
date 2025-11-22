import { useMemo, useState, useRef, useEffect } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { topicsData, Topic } from "@/data/topics";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const fuseOptions: Fuse.IFuseOptions<Topic> = {
  includeScore: true,
  threshold: 0.35,
  keys: ["title", "subtitle", "keywords"]
};

export const HeaderSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(() => new Fuse(topicsData, fuseOptions), []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((match) => match.item).slice(0, 5);
  }, [fuse, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (topicId: string) => {
    navigate(`/topic/${topicId}`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      <div className="relative">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search patterns..."
          className="pl-9 text-sm"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="max-h-80 overflow-y-auto">
            {results.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic.id)}
                className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
              >
                <div className="font-semibold text-sm text-foreground">{topic.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{topic.subtitle}</div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {topic.keywords.slice(0, 3).map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-xs rounded-full">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
