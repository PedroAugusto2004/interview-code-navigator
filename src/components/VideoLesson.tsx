import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

interface VideoLessonProps {
  videoId: string;
  title: string;
}

export const VideoLesson = ({ videoId, title }: VideoLessonProps) => {
  return (
    <Card className="overflow-hidden border-border/50">
      <div className="relative w-full bg-black aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        />
      </div>
      <div className="p-4 bg-card border-t border-border/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Play className="h-4 w-4" />
          Video Lesson
        </div>
        <p className="font-semibold text-foreground mt-1">{title}</p>
      </div>
    </Card>
  );
};
