// File: src/components/ProjectSection.jsx
import { UserButton } from "@clerk/nextjs";

export default function HeaderProfile({ user }) {
  // user.name= "Tamal Mallick mallickboy"
    return (
      <div className="flex justify-end items-center bg-blue w-full text-header-profile">
        <div className="flex items-center hover:-translate-y-0.5 transition-transform duration-200">
          <span className="mr-1 text-violet-800">{user.gems}</span>
          <span><img src="/gems_icon.svg" alt="💎" className="h-6 w-6" /></span>
        </div>
        <div className="flex items-center ml-4 hover:-translate-y-0.5 transition-transform duration-200">
          <span className="mr-1 text-orange-500">{user.points}</span>
          <span><img src="/fire_icon.svg" alt="🔥" className="h-6 w-6" /></span>
        </div>
        <div className="text-blue-500 ml-4 hover:-translate-y-0.5 transition-transform duration-200">Level {user.level}</div>
        
        <div className="flex items-center ml-4 space-x-2 header-profile-icon" title="Open profile or sign out">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "z-50",
                },
              }}
              afterSignOutUrl="/"
            />
          </div>
          {/* <div className="mr-1 text-violet-800">{user.name}</div> */}
          
          <div className="mr-1 text-violet-800">{user.name.length > 18 ? user.name.split(' ')[0] : user.name}</div>
        </div>
      </div>

    );
  }