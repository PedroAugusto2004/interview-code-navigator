import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { topicsData } from "@/data/topics";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${topic.color}`}>
              {topic.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-muted-foreground">{topic.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">What it is</h2>
            <p className="text-foreground/90 leading-relaxed">{topic.whatItIs}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">When it's used</h2>
            <ul className="space-y-2">
              {topic.whenUsed.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground/90">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Template (plain English)</h2>
            <ol className="space-y-2 list-decimal list-inside">
              {topic.template.map((step, index) => (
                <li key={index} className="text-foreground/90">{step}</li>
              ))}
            </ol>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Example</h2>
            <div className="space-y-4">
              <p className="text-foreground/90 font-medium">{topic.example.problem}</p>
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-2 text-foreground">Solution:</h3>
                <ul className="space-y-2">
                  {topic.example.solution.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground/90">
                      <span className="text-primary font-mono">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {topic.visualization && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Visual Representation</h2>
              <div className="bg-muted/30 p-8 rounded-lg flex items-center justify-center min-h-[200px]">
                <p className="text-muted-foreground text-center">{topic.visualization}</p>
              </div>
            </Card>
          )}
        </div>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          {prevTopic ? (
            <Button
              variant="outline"
              onClick={() => navigate(`/topic/${prevTopic.id}`)}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {prevTopic.title}
            </Button>
          ) : (
            <div />
          )}
          
          {nextTopic ? (
            <Button
              variant="outline"
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              className="gap-2"
            >
              {nextTopic.title}
              <ChevronRight className="h-4 w-4" />
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