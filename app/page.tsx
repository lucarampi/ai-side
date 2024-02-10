import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Developed with 💖 by Luca</span>
          <Button size={"icon"} variant={"outline"}>
            <Github />
          </Button>
        </div>
      </div>
    </div>
  );
}
