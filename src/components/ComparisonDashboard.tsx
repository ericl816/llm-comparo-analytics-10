import { useState } from "react";
import { ComparisonCard } from "./ComparisonCard";
import { PerformanceChart } from "./PerformanceChart";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function ComparisonDashboard() {
  const [prompt, setPrompt] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const { toast } = useToast();

  const mockPerformanceData = [
    {
      timestamp: "00:00",
      gpt4: 100,
      claude: 95,
      gemini: 90,
      palm: 88,
      llama: 85,
      mistral: 92,
    },
    {
      timestamp: "00:01",
      gpt4: 98,
      claude: 97,
      gemini: 92,
      palm: 89,
      llama: 86,
      mistral: 93,
    },
  ];

  const handleCompare = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to compare",
        variant: "destructive",
      });
      return;
    }

    setIsComparing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsComparing(false);
  };

  return (
    <div className="container mx-auto py-8 space-y-8 bg-background">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">LLM Performance Comparison</h1>
        <p className="text-muted-foreground">
          Compare different language models in real-time
        </p>
      </div>

      <div className="grid gap-6">
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] bg-card text-card-foreground"
        />
        <Button
          onClick={handleCompare}
          disabled={isComparing}
          className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isComparing ? "Comparing..." : "Compare Models"}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ComparisonCard
          model="GPT-4"
          responseTime={150}
          tokensPerSecond={35}
          qualityScore={9.5}
        />
        <ComparisonCard
          model="Claude 2"
          responseTime={180}
          tokensPerSecond={32}
          qualityScore={9.2}
        />
        <ComparisonCard
          model="Gemini Pro"
          responseTime={165}
          tokensPerSecond={30}
          qualityScore={9.0}
        />
        <ComparisonCard
          model="PaLM 2"
          responseTime={170}
          tokensPerSecond={28}
          qualityScore={8.8}
        />
        <ComparisonCard
          model="Llama 2"
          responseTime={190}
          tokensPerSecond={25}
          qualityScore={8.5}
        />
        <ComparisonCard
          model="Mistral 7B"
          responseTime={175}
          tokensPerSecond={27}
          qualityScore={8.7}
        />
      </div>

      <PerformanceChart data={mockPerformanceData} />
    </div>
  );
}