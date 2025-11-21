import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface CodeExampleProps {
  examples: {
    language: string;
    code: string;
  }[];
  complexity?: {
    time: string;
    space: string;
  };
}

export const CodeExample = ({ examples, complexity }: CodeExampleProps) => {
  return (
    <Card className="overflow-hidden border-border/50">
      <Tabs defaultValue={examples[0]?.language} className="w-full">
        <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center justify-between">
          <TabsList className="bg-background/50">
            {examples.map((example) => (
              <TabsTrigger key={example.language} value={example.language}>
                {example.language}
              </TabsTrigger>
            ))}
          </TabsList>
          {complexity && (
            <div className="flex gap-2">
              <Badge variant="outline" className="font-mono">
                Time: {complexity.time}
              </Badge>
              <Badge variant="outline" className="font-mono">
                Space: {complexity.space}
              </Badge>
            </div>
          )}
        </div>
        {examples.map((example) => (
          <TabsContent key={example.language} value={example.language} className="m-0">
            <pre className="p-6 overflow-x-auto bg-card m-0 border-0">
              <code className="text-sm leading-relaxed">{example.code}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};