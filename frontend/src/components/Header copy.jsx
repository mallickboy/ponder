// File: src/components/Header.jsx

import { UserButton } from "@clerk/nextjs";

export default function Header({ user, avatar, level, gems, points}) {
  return (
    <div className="flex justify-between items-center p-4 rounded-2xl bg-navy-900 text-white mb-6">
      <div>
        <div className="text-top-heading">{user.split(" ")[0]}'s Business Adventure Project:</div>
        <div className="text-main-heading flex items-center ">
          Launch a startup in 12 weeks
          <span className="ml-2"><img src="/design_logo2.svg" alt="🚀" className="h-6 w-6" /></span>
        </div>
      </div>
    
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="mr-1">{gems}</span>
          <span className="text-blue-400"><img src="/gems_icon.svg" alt="💎" className="h-6 w-6" /></span>
        </div>
        <div className="flex items-center">
          <span className="mr-1">{points}</span>
          <span className="text-orange-400"><img src="/fire_icon.svg" alt="🔥" className="h-6 w-6" /></span>
        </div>
        <div className="text-blue-300">Level {level}</div>
        
        {/* Avatar click opens Clerk's profile/signout dropdown
        <div className="flex items-center justify-center cursor-pointer" onClick={onAvatarClick} title="Open profile">
          <div className="w-8 h-8 rounded-full bg-blue-700">
            <img src={avatar} alt={user.charAt(0)} className="w-8 h-8 rounded-full" />
          </div> 
          <div>{user}</div>
        </div> */}
          <div className="flex items-center justify-center space-x-2" title="Open profile or sign out">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8", // Same size as your design
                    userButtonPopoverCard: "z-50", // Ensure dropdown shows over other content
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
            <div>{user}</div>
          </div>
      </div>
    </div>
  );
}