// File: src/components/Sidebar.jsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, useClerk } from '@clerk/nextjs';

export default function Sidebar() {
  const { openUserProfile } = useClerk();
  return (
    <div className="w-60 bg-navy-900 text-white p-6 flex flex-col">
      <div className="mb-12 pl-[8px]">
        <Link href="/">
          {/* <div className="text-2xl font-bold text-white">ponder</div> */}
          <div className="w-auto h-8">
            <img src="/ponder_logo.png" alt="ponder logo" className="h-full object-contain" />
          </div>
        </Link>
      </div>
      
      <nav className="flex flex-col space-y-4">
        {/* <SidebarItem icon="🚀" text="Adventure" active={false} /> */}
        {/* <SidebarItem icon="🎨" text="Design" active={true} />
        <SidebarItem icon="🔮" text="Discover" active={false} />
        <SidebarItem icon="🏛️" text="Internships" active={false} />
        <SidebarItem icon="📚" text="Resource" active={false} /> */}
        <SidebarItem icon={<img src="/adventure_logo.svg" alt="🚀" className="h-6 w-6" />} text="Adventure" active={false} /> 
        <SidebarItem icon={<img src="/design_logo.svg" alt="🎨" className="h-6 w-6" />} text="Design" active={true} />
        <SidebarItem icon={<img src="/discover_logo.svg" alt="🔮" className="h-6 w-6" />} text="Discover" active={false} />
        <SidebarItem icon={<img src="/internships_logo.svg" alt="🏛️" className="h-6 w-6" />} text="Internships" active={false} />
        <SidebarItem icon={<img src="/resource_logo.svg" alt="📚" className="h-6 w-6" />} text="Resource" active={false} />
      </nav>
      
      <div className="mt-auto" onClick={openUserProfile} title="Open profile">
        {/* <SidebarItem icon="⚙️" text="Settings" active={false} /> */}
        <SidebarItem icon={<img src="/settings_logo.svg" alt="⚙️" className="h-6 w-6" />} text="Settings" active={false} />
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active }) {
  return (
    <Link 
      href="#" 
      className={`flex items-center p-3 rounded-lg ${active ? 'bg-white text-navy-900' : 'text-white hover:bg-navy-800'}`}
    >
      {/* <span className="mr-3">{icon}</span> */}
      <span className={`mr-3 h-6 w-6 ${active ? 'filter brightness-0' : ''}`}>  {icon}</span>
      <span className={`${active ? 'text-navbar-tab-active' : 'text-navbar-tab'}`}>{text}</span>
    </Link>
  );
}