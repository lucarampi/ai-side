import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 p-6 flex gap-6 ">
      <div className="flex flex-col flex-1  gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1 ">
          <Textarea
            className="resize-none p-5 leading-relaxed"
            placeholder="Add you prompt here..."
          />
          <Textarea
            className="resize-none p-5 leading-relaxed"
            placeholder="The result from the AI yill be displayed here..."
            readOnly
          />
        </div>
        <span className="text-muted-foreground text-sm">
          Note: You can use{" "}
          <code className="text-primary border rounded px-1 bg-primary-foreground/20">
            {"{transcripton}"}
          </code>{" "}
          in your prompt to use the transcripted data from the selected video.w
        </span>
      </div>
      <aside className="w-80"></aside>
    </main>
  );
}
