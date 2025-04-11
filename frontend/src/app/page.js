// File: src/app/page.js

'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import ProjectSection from '@/components/ProjectSection';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { fetchProjectUpdates } from '@/services/api';
import Header from '@/components/Header';
import HeaderWrapper from '@/components/HeaderWrapper';
import HeaderProfile from '@/components/HeaderProfile';

import { fetchOrCreateUserProfile } from '@/services/api';
import { updateUserProject } from '@/services/api';

export default function Home() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [sections, setSections] = useState([]);
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize user state with default values
  const [user, setUser] = useState({
    id: 0,
    name: "User",
    avatar: "/user-avatar.png",
    level: 1,
    gems: 7,
    points: 358,
    project_json_object: [{}]
  });
  
  // Fetch user profile from backend when Clerk user is loaded
  useEffect(() => {
    async function fetchUserProfile() {
      if (!isClerkLoaded || !clerkUser) return;
      
      try {
        // console.log("=== API Request Debug ===");
        setIsLoading(true);
        const userName = clerkUser.fullName || 
                        (clerkUser.firstName && clerkUser.lastName ? 
                        `${clerkUser.firstName} ${clerkUser.lastName}` : 
                        clerkUser.username || 
                        clerkUser.emailAddresses[0].emailAddress);
        const sessionToken = await getToken();
        
        // Fetch user profile from backend
        const profileData = await fetchOrCreateUserProfile(
          clerkUser.id, 
          userName,
          sessionToken
        );     
        console.log('Fetched profile data:', profileData);
        console.log('Project data:', profileData.project_json_object);
        
        // Update user state with fetched data
        setUser(currentUser => ({
          ...currentUser,
          name: userName || currentUser.name,
          avatar: clerkUser.imageUrl || currentUser.avatar,
          id: profileData.id || 0,
          level: profileData.level || 1,
          gems: profileData.gems || 0,
          points: profileData.points || 0,
          project_json_object: profileData || currentUser.project_json_object
        }));
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserProfile();
  }, [isClerkLoaded, clerkUser, getToken]);
  
  // Initialize chat messages with the updated user state
  const [chatMessages, setChatMessages] = useState([]);
  
  // Set up chat messages after user state is initialized
  useEffect(() => {
    setChatMessages([
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
  }, [user.name, user.avatar]); // Only re-run when user name or avatar changes

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
      <div className="flex-1 p-6 overflow-auto scroll-container ">
        <HeaderWrapper user={user} />
        
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
        
        <div className="text-project-body mt-4 text-gray-600">
          Want to make changes? Tell Po!
        </div>
      </div>
      

      <div className="w-96 flex flex-col h-full right-most-flex ">
        {/* Header profile - sticky at top */}
        <div className="sticky top-0 z-10 w-full">
          <HeaderProfile user={user} />
        </div>

        {/* Chat container - takes remaining height */}
        <div className="flex-1 flex flex-col overflow-hidden chat-box ">
          {/* Chat messages area with scrolling */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-auto p-6 pb-2 scroll-container"
            style={{ scrollBehavior: 'smooth'}}
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
          
          {/* Chat input fixed at bottom */}
          <div className="p-6 pt-3">
            <ChatInput 
              onMessageSent={handleNewMessage} 
              onProjectUpdate={handleProjectUpdate} 
              UserProfile={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}