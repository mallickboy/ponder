// File: src/app/page.js

'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import ProjectSection from '@/components/ProjectSection';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { fetchProjectUpdates } from '@/services/api';
import HeaderWrapper from '@/components/HeaderWrapper';


export default function Home() {
  const [sections, setSections] = useState([]);

  const [user, setUser] = useState({  // User data origin
    name: "Tamal Mallick",
    avatar: "/user-avatar.png",
    level: 1,
    gems: 7,
    points: 358
  });

  
  // For chat history
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Po',
      content: "Hey Mark. I'm Po, your Extracurricular Mentor!",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: 'Po',
      content: "Let's start brainstorm some project ideas for your learning adventure together!",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: 'Po',
      content: "What are you interested in?",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: user.name,
      content: "I'm interested in starting a business",
      avatar: user.avatar,
      isUser: true
    },
    {
      sender: 'Po',
      content: "What have you done related to business?",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: user.name,
      content: "I'm in a business club and watch a couple videos on starting a company. I also have a business idea.",
      avatar: user.avatar,
      isUser: true
    },
    {
      sender: 'Po',
      content: "Awesome! What is your business idea?",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: user.name,
      content: "I want to build a mask shaped microphone that keeps people's voice private when they are taking a call in public and in places such as library.",
      avatar: user.avatar,
      isUser: true
    },
    {
      sender: 'Po',
      content: "Interesting! Start designing a draft of your adventure now. You can make any changes you want.",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: 'Po',
      content: "What do you think?",
      avatar: "/po-avatar.png",
      isUser: false
    },
    {
      sender: user.name,
      content: "I want to shorten the project to 12 weeks.",
      avatar: user.avatar,
      isUser: true
    },
    {
      sender: 'Po',
      content: "...",
      avatar: "/po-avatar.png",
      isUser: false
    }
  ]);

  // Reference to chat container for auto-scrolling
  const chatContainerRef = useRef(null);

  // Function to handle new chat messages
  const handleNewMessage = (message) => {
    setChatMessages(prev => [...prev, message]);
  };

  // Function to handle project updates
  const handleProjectUpdate = (newSections) => {
    setSections(newSections);
  };

  // Auto-scroll chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Fetch project data on initial load
  useEffect(() => {
    const loadInitialProjectData = async () => {
      try {
        const projectData = await fetchProjectUpdates();
        if (projectData && projectData.length > 0) {
          setSections(projectData);
          
          // Add a welcome message about the project
          setChatMessages(prev => [
            ...prev, 
            {
              sender: 'Po',
              content: "I've loaded your project. Let me know if you want to make any changes!",
              avatar: "/po-avatar.png",
              isUser: false
            }
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch initial project data:', error);
        setChatMessages(prev => [
          ...prev, 
          {
            sender: 'Po',
            content: "I couldn't load your project data. Please try refreshing the page.",
            avatar: "/po-avatar.png",
            isUser: false
          }
        ]);
      }
    };

    // Load project data when component mounts
    loadInitialProjectData();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 overflow-auto">
        {/* <Header 
          user={user.name}
          avatar={user.avatar} 
          level={user.level} 
          gems={user.gems} 
          points={user.points} 
        /> */}
        <HeaderWrapper/>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <ProjectSection 
              key={`section-${idx}-${section.title}`}
              title={section.title}
              weekRange={section.weekRange}
              coreQuestions={section.coreQuestions}
              steps={section.steps}
            />
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Want to make changes? Tell Po!
        </div>
      </div>
      
      <div className="w-96 bg-slate-100 p-6 flex flex-col">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-auto mb-4 pr-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {chatMessages.map((message, idx) => (
            <ChatMessage 
              key={`msg-${idx}`}
              sender={message.sender}
              content={message.content}
              avatar={message.avatar}
              isUser={message.isUser}
            />
          ))}
        </div>
        
        <ChatInput 
          onMessageSent={handleNewMessage} 
          onProjectUpdate={handleProjectUpdate} 
          UserProfile={user}
        />
      </div>
    </div>
  );
}