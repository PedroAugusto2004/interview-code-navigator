import { TopicCard } from "@/components/TopicCard";
import { topicsData } from "@/data/topics";
import { Button } from "@/components/ui/button";
import { BookOpen, Code2 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <img 
          src={heroImage} 
          alt="Coding Interview Mastery" 
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Code2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Master Your Interviews</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Coding Interview Mastery
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive guide to the 9 essential algorithm patterns you need to ace any coding interview. Learn the patterns, understand the templates, and master the examples.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <BookOpen className="h-5 w-5" />
                Start Learning
              </Button>
              <Button size="lg" variant="outline">
                View All Topics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              9 Essential Patterns
            </h2>
            <p className="text-muted-foreground text-lg">
              Click on any topic to dive deep into the pattern, see examples, and understand when to use it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicsData.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            Built to help you succeed in your coding interviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;