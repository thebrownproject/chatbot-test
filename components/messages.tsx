import { PreviewMessage, ThinkingMessage } from "./message";
import { Greeting } from "./greeting";
import { memo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { SimpleMessage } from "./chat";

interface MessagesProps {
  messages: Array<SimpleMessage>;
  isLoading?: boolean;
}

function PureMessages({ messages, isLoading }: MessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 relative"
    >
      {/* Show greeting when no messages - EXACT same as original */}
      {messages.length === 0 && <Greeting />}

      {/* Render messages - EXACT same structure as original */}
      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          message={message}
          isLoading={false}
        />
      ))}

      {/* Show thinking message when loading and last message is from user - EXACT same logic */}
      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}

      {/* Scroll anchor - EXACT same styling as original */}
      <motion.div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  // Simplified but equivalent memo comparison
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;

  // Compare message IDs and content for changes
  for (let i = 0; i < prevProps.messages.length; i++) {
    if (prevProps.messages[i].id !== nextProps.messages[i].id) return false;
    if (prevProps.messages[i].content !== nextProps.messages[i].content)
      return false;
  }

  return true;
});
