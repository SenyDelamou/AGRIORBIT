import { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "Bonjour ! Je suis l'assistant AgriOrbit. Comment puis-je vous aider aujourd'hui ?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const SUGGESTIONS = [
  "Comment importer une parcelle ?",
  "Tarification",
  "Parler à un conseiller",
  "Fonctionnalités"
];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'fr-FR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setTimeout(() => handleSendMessage(transcript), 500); // Auto-send
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = "Merci pour votre message. Un conseiller va vous répondre sous peu.";

      const lowerText = text.toLowerCase();
      if (lowerText.includes("parcelle") || lowerText.includes("importer")) {
        botResponseText = "Vous pouvez importer vos parcelles via l'onglet 'Explorateur' en utilisant des fichiers GeoJSON ou KML.";
      } else if (lowerText.includes("prix") || lowerText.includes("tarification") || lowerText.includes("coût")) {
        botResponseText = "Nos tarifs sont adaptés à la surface. Contactez notre équipe commerciale pour un devis personnalisé.";
      } else if (lowerText.includes("conseiller") || lowerText.includes("humain") || lowerText.includes("parler")) {
        botResponseText = "Vous pouvez joindre notre support au +221 33 000 00 00 ou via contact@agriorbit.ai.";
      } else if (lowerText.includes("fonctionnalité") || lowerText.includes("feature")) {
        botResponseText = "AgriOrbit propose la cartographie temps réel, la modélisation de rendement et la surveillance sanitaire.";
      }

      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      {/* Toggle Button */}
      <button
        className="chat-toggle-btn"
        onClick={toggleChat}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div className="chat-window glass-panel">
        <div className="chat-header">
          <div className="chat-avatar">
            <div className="avatar-dot"></div>
            AO
          </div>
          <div className="chat-header-info">
            <h4>Support AgriOrbit</h4>
            <span>En ligne</span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 3 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                className="suggestion-chip"
                onClick={() => handleSendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <input
            type="text"
            placeholder={isListening ? "Écoute en cours..." : "Écrivez votre message..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={startListening}
            className={isListening ? "listening-mode" : ""}
            title="Dictée vocale"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
