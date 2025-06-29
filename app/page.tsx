import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold">Focus Chat</h1>
        <p className="text-muted-foreground">
          Your AI-powered productivity assistant for better focus and time
          management.
        </p>
        <Button asChild size="lg">
          <Link href="/chat">Start Chatting</Link>
        </Button>
      </div>
    </div>
  );
}
