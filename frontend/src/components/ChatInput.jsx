// File: src/components/ChatInput.jsx

'use client';

import { useState } from 'react';
import { sendChatMessage, fetchProjectUpdates } from '@/services/api';

export default function ChatInput({ onMessageSent, onProjectUpdate, UserProfile }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Add user message to the chat immediately
      const userMessage = {
        sender: UserProfile.name,
        content: message,
        avatar: UserProfile.avatar,
        isUser: true
      };
      
      onMessageSent(userMessage);
      
      // Clear input field
      setMessage('');
      
      // Send to API and wait for response
      const response = await sendChatMessage(message);
      
      // Add bot response to the chat
      const botMessage = {
        sender: 'Po',
        content: response.reply || "I'm thinking about that...",
        avatar: "/po-avatar.png",
        isUser: false
      };
      
      onMessageSent(botMessage);
      
      // If projectUpdates flag is true, fetch the project updates
      if (response.projectUpdates) {
        // First, send a message that project is being updated
        const updateMessage = {
          sender: 'Po',
          content: "Updating your project...",
          avatar: "/po-avatar.png",
          isUser: false
        };
        
        onMessageSent(updateMessage);
        
        // Fetch the latest project data
        const projectData = await fetchProjectUpdates();
        
        // Update the project sections
        if (projectData && projectData.length > 0) {
          onProjectUpdate(projectData);
          
          // Confirm project update is complete
          const confirmMessage = {
            sender: 'Po',
            content: "Your project has been updated!",
            avatar: "/po-avatar.png",
            isUser: false
          };
          
          onMessageSent(confirmMessage);
        }
      }
      
    } catch (error) {
      console.error('Error sending message:', error);
      onMessageSent({
        sender: 'Po',
        content: "Sorry, I couldn't process that message. Please try again.",
        avatar: "/po-avatar.png",
        isUser: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-navy-900 rounded-full p-1 chat-input">
      <input
        type="text"
        placeholder="Message Po"
        className="flex-1 bg-transparent text-white border-none outline-none px-4 text-chat-po"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
      />
      <button 
        type="submit" 
        // className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin">⟳</span>
        ) : (
          // <span>➤message_send_logo.svg</span>
          // <span><img src="/message_send_logo.svg" alt="➤" className="h-6 w-6" /></span>
          <span ><img src="/message_send_logo.svg" alt="➤" style={{ margin:"3px", height:"5vh" }} /></span>
        )}
      </button>
    </form>
  );
}