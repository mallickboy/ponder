// File: src/components/ChatMessage.jsx
'use client';

export default function ChatMessage({ sender, avatar, content , isUser }) {
  return (
    <div >
      <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="mr-2">
            <img src={avatar} alt={sender.charAt(0)} className="w-8 h-8 rounded-full" />
          </div>
        )}
        
        {/* <div 
          className={`max-w-[70%] p-3 rounded-lg ${
            isUser 
              ? 'bg-blue-600 text-white rounded-tr-none' 
              : 'bg-gray-200 text-gray-800 rounded-tl-none'
          }`}
        > */}
        <div 
          className={`max-w-[70%] p-3 ${
            isUser 
              ? 'chat-show-user' 
              : 'chat-show-bot'
          }`}
        >
          {/* <div className="text-sm font-bold mb-1">{sender}</div> */}
          <div className="text-sm whitespace-pre-wrap" style={{ overflowWrap: "break-word" }}>{content}</div>
        </div>
        
        {isUser && (
          <div className="ml-2">
            <img src={avatar} alt={sender.charAt(0)} className="w-8 h-8 rounded-full" />
          </div>
        )}
      </div>
    </div>
  ); 
}