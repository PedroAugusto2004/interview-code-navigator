import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb, Code2, Zap } from "lucide-react";
import { topicsData } from "@/data/topics";
import { VisualDiagram } from "@/components/VisualDiagram";
import { CodeExample } from "@/components/CodeExample";

const TopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  
  const currentIndex = topicsData.findIndex(t => t.id === topicId);
  const topic = topicsData[currentIndex];
  
  if (!topic) {
    return <div>Topic not found</div>;
  }

  const prevTopic = currentIndex > 0 ? topicsData[currentIndex - 1] : null;
  const nextTopic = currentIndex < topicsData.length - 1 ? topicsData[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2 hover:gap-3 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Topics
            </Button>
            <Badge variant="outline" className="font-semibold">
              {currentIndex + 1} / {topicsData.length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${topic.color} shadow-lg`}>
              {topic.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-foreground mb-3 leading-tight">
                {topic.title}
              </h1>
              <p className="text-xl text-muted-foreground">{topic.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* What it is */}
          <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">What it is</h2>
            </div>
            <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-border/50">
              <p className="text-lg text-foreground/90 leading-relaxed">{topic.whatItIs}</p>
            </Card>
          </section>

          {/* Visual Representation */}
          <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Visual Representation</h2>
            </div>
            <VisualDiagram topicId={topic.id} />
          </section>

          {/* When to Use */}
          <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-3xl font-bold mb-4 text-foreground">When to use it</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {topic.whenUsed.map((item, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/50 animate-slide-in-left"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <p className="text-foreground/90 leading-relaxed">{item}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Template */}
          <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Step-by-step template</h2>
            <Card className="p-8 bg-gradient-to-br from-muted/30 to-muted/10 border-border/50">
              <ol className="space-y-4">
                {topic.template.map((step, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <p className="text-lg text-foreground/90 leading-relaxed pt-1.5">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </section>

          {/* Code Example */}
          {topic.codeExample && (
            <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Code Implementation</h2>
              </div>
              <CodeExample 
                examples={topic.codeExample.examples}
                complexity={topic.codeExample.complexity}
              />
            </section>
          )}

          {/* Example Problem */}
          <section className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Example Problem</h2>
            <Card className="overflow-hidden border-border/50">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border/50">
                <h3 className="text-xl font-semibold text-foreground mb-2">Problem:</h3>
                <p className="text-lg text-foreground/90">{topic.example.problem}</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Solution Approach:</h3>
                <div className="space-y-3">
                  {topic.example.solution.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/50 transition-all"
                    >
                      <span className="text-primary font-bold font-mono flex-shrink-0">
                        {index + 1}.
                      </span>
                      <span className="text-foreground/90 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </div>

        <Separator className="my-12" />

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {prevTopic ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(`/topic/${prevTopic.id}`)}
              className="gap-2 group hover:gap-3 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-semibold">{prevTopic.title}</div>
              </div>
            </Button>
          ) : (
            <div />
          )}
          
          {nextTopic ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              className="gap-2 group hover:gap-3 transition-all"
            >
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="font-semibold">{nextTopic.title}</div>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;