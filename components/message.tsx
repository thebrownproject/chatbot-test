"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { cn, sanitizeText } from "@/lib/utils";
import { SparklesIcon } from "./icons";
import { Markdown } from "./markdown";
import type { SimpleMessage } from "./chat";

interface MessageProps {
  message: SimpleMessage;
  isLoading?: boolean;
}

const PureSimpleMessage = ({ message, isLoading }: MessageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className="w-full mx-auto max-w-3xl px-4 group/message"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div
          className={cn(
            "flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl",
            "group-data-[role=user]/message:w-fit"
          )}
        >
          {/* Assistant Avatar (only show for assistant) */}
          {message.role === "assistant" && (
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <SparklesIcon size={14} />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 w-full">
            {/* Message Content */}
            <div className="flex flex-row gap-2 items-start">
              <div
                data-testid="message-content"
                className={cn("flex flex-col gap-4", {
                  "bg-primary text-primary-foreground px-3 py-2 rounded-xl":
                    message.role === "user",
                })}
              >
                {isLoading ? (
                  // Loading state with "Hmm..." like the original
                  <div className="flex flex-col gap-4 text-muted-foreground">
                    Hmm...
                  </div>
                ) : (
                  <Markdown>{sanitizeText(message.content)}</Markdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(PureSimpleMessage);

// Thinking/Loading Message Component (matches original styling)
export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      data-testid="message-assistant-loading"
      className="w-full mx-auto max-w-3xl px-4 group/message min-h-96"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      data-role={role}
    >
      <div className="flex gap-4 w-full">
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Hmm...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
