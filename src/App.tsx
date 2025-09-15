import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Work from './pages/Work';
import Story from './pages/Story';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';
// App.tsx
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './chatbot-styles.css'

function App() {
  useEffect(() => {
		createChat({
			webhookUrl: 'https://n8n.ofzen.in/webhook/22f03920-3d1b-40ab-9259-38293f22aa97/chat',
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
		},
	},
	enableStreaming: false,
		});
	}, []);
  return (
    <Router>
      <div className="bg-neutral-950 text-white overflow-x-hidden">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/story" element={<Story />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
