import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';

interface SuggestedActionsProps {
  onSendMessage: (message: string) => void;
}

function PureSuggestedActions({ onSendMessage }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'How do I block',
      label: 'distracting websites?',
      action: 'How do I block distracting websites?',
    },
    {
      title: 'Set up focus time',
      label: 'for 2 hours',
      action: 'Set up focus time for 2 hours',
    },
    {
      title: 'What are the best',
      label: 'productivity techniques?',
      action: 'What are the best productivity techniques?',
    },
    {
      title: 'Help me create',
      label: 'a study schedule',
      action: 'Help me create a study schedule',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={() => {
              onSendMessage(suggestedAction.action);
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions);