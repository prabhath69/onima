import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";
import "./ChatbotWidgetCSS.css"; // Ensure you have the correct path to your CSS file

const ChatbotWidget = () => {
    useEffect(() => {
        createChat({
            webhookUrl: 'https://n8n-ax2e.onrender.com/webhook/ce1fb85a-0642-4741-acb7-e158be6d3520/chat',
            initialMessages: [
		        'Hey, Welcome to Onima!',
		        'I am your assistant here to help you with anything related to Onima. Feel free to ask anything!!',
	        ],
            i18n: {
		        en: {
			        title: 'Onima Assistant',
			        subtitle: "Ask me anything 24/7!",
			        footer: '',
			        getStarted: 'New Conversation',
			        inputPlaceholder: 'Type your question..',
		},
	},
        });
    }, []);

    return (
        <div className="onima-chatbot-container">
            <div className="onima-chatbot-header">
                <div className="onima-chatbot-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-8.5h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5zm0 2h7c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5zm0 2h4c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-4c-.28 0-.5.22-.5.5s.22.5.5.5z"/>
                    </svg>
                </div>
                <div className="onima-chatbot-info">
                    <h3>Onima Assistant</h3>
                    <p>Ask me about our products</p>
                </div>
                <button className="onima-chatbot-close">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            
            <div className="onima-chatbot-messages">
                <div className="onima-chatbot-welcome">
                    <p>Hey there! I'm here to help you with anything about Onima. What would you like to know?</p>
                </div>
            </div>
            
            <div className="onima-chatbot-input-area">
                <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="onima-chatbot-input"
                />
                <button className="onima-chatbot-send">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatbotWidget;