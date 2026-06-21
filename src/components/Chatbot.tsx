"use client";

import React, { useEffect } from 'react';
import '@n8n/chat/style.css';

export default function Chatbot() {
  useEffect(() => {
    const initChat = async () => {
      try {
        const { createChat } = await import('@n8n/chat');
        createChat({
          webhookUrl: 'http://localhost:5678/webhook/22f03920-3d1b-40ab-9259-38293f22aa97/chat',
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
  }, []);

  return <div id="n8n-chat" />;
}
