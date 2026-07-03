"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import '@n8n/chat/style.css';

export default function Chatbot() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;
    const initChat = async () => {
      try {
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/22f03920-3d1b-40ab-9259-38293f22aa97/chat';

        // Pre-flight check to see if n8n webhook is online/reachable.
        // Prevents the library's internal loadPreviousSession from causing unhandled TypeError: Failed to fetch rejections.
        try {
          await fetch(webhookUrl, {
            method: 'OPTIONS',
            mode: 'cors',
          });
        } catch (fetchError) {
          console.warn('n8n chatbot webhook is offline or unreachable. Skipping chatbot widget rendering.', fetchError);
          return;
        }

        const { createChat } = await import('@n8n/chat');
        createChat({
          webhookUrl,
          webhookConfig: {
            method: 'POST',
            headers: {}
          },
          target: '#n8n-chat',
          mode: 'window',
          chatInputKey: 'chatInput',
          chatSessionKey: 'sessionId',
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: 'en',
          initialMessages: [
            'Hello!',
            'My name is Alex. What brings you to Onima?'
          ],
          i18n: {
            en: {
              title: 'Hi',
              subtitle: "Welcome to Onima!",
              footer: '',
              getStarted: 'New Conversation',
              inputPlaceholder: 'Type your question..',
              closeButtonTooltip: 'Close Chat',
            },
          },
          enableStreaming: false,
        });
      } catch (error) {
        console.error('Failed to initialize n8n chat:', error);
      }
    };
    initChat();
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return <div id="n8n-chat" />;
}
