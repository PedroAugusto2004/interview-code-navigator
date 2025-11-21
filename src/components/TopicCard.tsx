import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Topic } from "@/data/topics";

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard = ({ topic }: TopicCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/50"
      onClick={() => navigate(`/topic/${topic.id}`)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${topic.color} transition-transform group-hover:scale-110`}>
            {topic.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {topic.subtitle}
            </p>
            <p className="text-sm text-foreground/80 line-clamp-2">
              {topic.whatItIs}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};