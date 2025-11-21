import { Card } from "@/components/ui/card";

interface VisualDiagramProps {
  topicId: string;
}

export const VisualDiagram = ({ topicId }: VisualDiagramProps) => {
  const renderDiagram = () => {
    switch (topicId) {
      case "two-pointers":
        return (
          <div className="flex flex-col items-center gap-8 py-8">
            <div className="flex items-center gap-2">
              {[1, 3, 5, 7, 9, 11, 13, 15].map((num, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all duration-300 ${
                    idx === 0 || idx === 7
                      ? "bg-primary text-primary-foreground border-primary animate-pulse-glow"
                      : "bg-card border-border"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full max-w-md">
              <div className="text-center animate-slide-in-left">
                <div className="text-2xl mb-2">👈</div>
                <div className="text-sm font-semibold text-primary">Left Pointer</div>
              </div>
              <div className="text-center animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="text-2xl mb-2">👉</div>
                <div className="text-sm font-semibold text-primary">Right Pointer</div>
              </div>
            </div>
          </div>
        );

      case "sliding-window":
        return (
          <div className="flex flex-col items-center gap-8 py-8">
            <div className="flex items-center gap-2">
              {["a", "b", "c", "a", "b", "d", "e"].map((char, idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg font-bold transition-all duration-300 ${
                    idx >= 2 && idx <= 5
                      ? "bg-primary/20 border-primary text-primary animate-pulse-glow"
                      : "bg-card border-border"
                  }`}
                >
                  {char}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-primary mb-2">Current Window: "cabd"</div>
              <div className="text-xs text-muted-foreground">Window expands and contracts dynamically</div>
            </div>
          </div>
        );

      case "hash-map":
        return (
          <div className="grid grid-cols-2 gap-4 py-8 max-w-md mx-auto">
            {[
              { key: "1", value: "count: 2" },
              { key: "5", value: "count: 1" },
              { key: "7", value: "count: 3" },
              { key: "9", value: "count: 1" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded font-bold">
                  {item.key}
                </div>
                <div className="text-sm text-muted-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        );

      case "sorting-greedy":
        return (
          <div className="flex flex-col items-center gap-8 py-8">
            <div className="text-sm text-muted-foreground mb-2">Sort by end time, pick earliest finishing</div>
            <div className="space-y-3 w-full max-w-md">
              {[
                { name: "Meeting A", time: "9:00 - 10:00", selected: true },
                { name: "Meeting B", time: "9:30 - 11:00", selected: false },
                { name: "Meeting C", time: "10:30 - 11:30", selected: true },
                { name: "Meeting D", time: "11:00 - 12:00", selected: false }
              ].map((meeting, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 transition-all animate-fade-in ${
                    meeting.selected
                      ? "bg-primary/10 border-primary"
                      : "bg-muted/30 border-border opacity-50"
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{meeting.name}</span>
                    <span className="text-sm text-muted-foreground">{meeting.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "binary-search":
        return (
          <div className="flex flex-col items-center gap-8 py-8">
            <div className="flex items-center gap-2">
              {[1, 3, 5, 7, 9, 11, 13, 15, 17].map((num, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded font-bold text-sm transition-all ${
                    idx === 4
                      ? "bg-primary text-primary-foreground border-primary animate-pulse-glow"
                      : idx < 4
                      ? "bg-destructive/10 border-destructive/30 opacity-40"
                      : "bg-card border-border opacity-40"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-primary mb-2">Middle Element: 9</div>
              <div className="text-xs text-muted-foreground">Search space cut in half each iteration</div>
            </div>
          </div>
        );

      case "dfs":
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg animate-pulse-glow">
                  1
                </div>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/70 text-primary-foreground flex items-center justify-center font-bold animate-fade-in">
                      2
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center font-semibold text-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        4
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center font-semibold text-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        5
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-muted border-2 border-border flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-sm">
                        6
                      </div>
                      <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-sm">
                        7
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Goes deep first: 1 → 2 → 4 (then backtracks)
            </div>
          </div>
        );

      case "bfs":
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="flex gap-8">
                  <div className="w-14 h-14 rounded-full bg-primary/70 text-primary-foreground flex items-center justify-center font-bold animate-fade-in">
                    2
                  </div>
                  <div className="w-14 h-14 rounded-full bg-primary/70 text-primary-foreground flex items-center justify-center font-bold animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    3
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center font-semibold text-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    4
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center font-semibold text-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    5
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center font-semibold text-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    6
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/50 text-primary-foreground flex items-center justify-center font-semibold text-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    7
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Explores level by level: 1 → (2, 3) → (4, 5, 6, 7)
            </div>
          </div>
        );

      case "backtracking":
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="grid grid-cols-3 gap-4">
              {["[1]", "[1,2]", "[1,3]", "[2]", "[2,3]", "[3]", "[]", "[1,2,3]"].map((subset, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-muted/50 rounded-lg border border-border hover:border-primary transition-all font-mono text-sm text-center animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {subset}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground">
              All subsets of [1, 2, 3] generated by backtracking
            </div>
          </div>
        );

      case "dynamic-programming":
        return (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="grid grid-cols-6 gap-3">
              {[
                { step: 0, ways: 1 },
                { step: 1, ways: 1 },
                { step: 2, ways: 2 },
                { step: 3, ways: 3 },
                { step: 4, ways: 5 },
                { step: 5, ways: 8 }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold border-2 ${
                    idx === 5 ? "bg-primary text-primary-foreground border-primary animate-pulse-glow" : "bg-muted border-border"
                  }`}>
                    {item.ways}
                  </div>
                  <div className="text-xs text-muted-foreground">Step {item.step}</div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground max-w-md">
              Each step builds on previous results: dp[i] = dp[i-1] + dp[i-2]
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-muted-foreground">
            Visual representation coming soon
          </div>
        );
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-muted/30 overflow-hidden">
      {renderDiagram()}
    </Card>
  );
};