import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import './Chatbot.css'; // Import the CSS file

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);

    const toggleChatbot = () => {
        console.log("Chatbot icon clicked"); // Debugging log
        setIsOpen(!isOpen);
        console.log("Chatbot isOpen state:", !isOpen); // Debugging log
    };

    const sendMessage = async () => {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput !== "") {
            appendMessage("user", userInput);

            try {
                const response = await fetch("http://127.0.0.1:8000/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams({ user_query: userInput })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                appendMessage("bot", data.response || "Sorry, I didn't understand that.");
            } catch (error) {
                console.error("Error:", error);
                appendMessage("bot", "Oops! Something went wrong.");
            }

            document.getElementById("user-input").value = "";
        }
    };

    const appendMessage = (sender, message) => {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    };

    const startVoiceRecognition = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('Recognized Speech:', transcript);
            document.getElementById("user-input").value = transcript;
            sendMessage();
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };
    };

    return (
        <div>
            <button id="chatbot-toggle-btn" onClick={toggleChatbot} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#8a2be2', color: 'white', borderRadius: '50%', width: '60px', height: '60px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaRobot size={30} />
            </button>
            {isOpen && (
                <div className="chatbot-popup" id="chatbot-popup">
                    <div className="chat-header">
                        <span>Chatbot | <a target="_blank"> Online Shop</a></span>
                        <button id="close-btn" onClick={toggleChatbot}>&times;</button>
                    </div>
                    <div className="chat-box" id="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                                {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input type="text" id="user-input" placeholder="Type a message..." />
                        <button id="send-btn" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

