"use client";

import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { ArrowUpIcon, StopIcon } from './icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SuggestedActions } from './suggested-actions';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { getLocalStorage, setLocalStorage, cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  showSuggestions?: boolean;
  className?: string;
}

function PureChatInput({
  onSendMessage,
  isLoading = false,
  showSuggestions = false,
  className,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '98px';
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const savedInput = getLocalStorage('input');
      const finalValue = savedInput || '';
      setInput(finalValue);
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    setLocalStorage('input', input);
  }, [input]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input.trim());
    setInput('');
    setLocalStorage('input', '');
    resetHeight();

    if (window.innerWidth > 768) {
      textareaRef.current?.focus();
    }
  }, [input, isLoading, onSendMessage]);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full flex flex-col gap-4">
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute left-1/2 bottom-28 -translate-x-1/2 z-50"
          >
            <Button
              data-testid="scroll-to-bottom-button"
              className="rounded-full"
              size="icon"
              variant="outline"
              onClick={(event) => {
                event.preventDefault();
                scrollToBottom();
              }}
            >
              <ArrowDown />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {showSuggestions && (
        <SuggestedActions onSendMessage={onSendMessage} />
      )}

      {/* EXACT original textarea styling */}
      <Textarea
        data-testid="multimodal-input"
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className={cn(
          'min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 dark:border-zinc-700',
          className,
        )}
        rows={2}
        autoFocus
        onKeyDown={(event) => {
          if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            submitForm();
          }
        }}
      />

      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
        {isLoading ? (
          <Button
            data-testid="stop-button"
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600 flex items-center justify-center"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <StopIcon size={14} />
          </Button>
        ) : (
          <Button
            data-testid="send-button"
            className="rounded-full p-1.5 h-fit border dark:border-zinc-600 flex items-center justify-center"
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={input.length === 0}
          >
            <ArrowUpIcon size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}

export const ChatInput = memo(PureChatInput);