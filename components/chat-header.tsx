import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";

interface ChatHeaderProps {
  onNewChat?: () => void;
}

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <Button
        variant="outline"
        className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
        onClick={onNewChat}
      >
        <PlusIcon size={16} />
        <span className="md:sr-only">New Chat</span>
      </Button>
    </header>
  );
}