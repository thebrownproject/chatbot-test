"use client";

import { useState } from "react";
import { Messages } from "./messages";
import { ChatInput } from "./chat-input";
import { SuggestedActions } from "./suggested-actions";
import { ChatHeader } from "./chat-header";
import { generateUUID } from "@/lib/utils";

// Simple message type
export interface SimpleMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

// Sample assistant responses for demo
const DEMO_RESPONSES = [
  "That's a great question! Let me help you with that.",
  "I understand what you're looking for. Here's what I think...",
  "Interesting perspective! Have you considered...",
  "Let me break this down for you step by step.",
  "That's definitely something worth exploring further.",
];

export function Chat() {
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: SimpleMessage = {
      id: generateUUID(),
      role: 'user',
      content: content.trim(),
      createdAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: SimpleMessage = {
        id: generateUUID(),
        role: 'assistant',
        content: DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)],
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

  return (
    <>
      {/* EXACT structure from original - h-dvh, not h-screen */}
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        {/* ChatHeader - EXACT same as original */}
        <ChatHeader onNewChat={handleNewChat} />

        {/* Messages - EXACT same as original */}
        <Messages 
          messages={messages}
          isLoading={isLoading}
        />

        {/* Form wrapper - EXACT same structure as original */}
        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <ChatInput 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            showSuggestions={messages.length === 0}
          />
        </form>
      </div>
    </>
  );
}