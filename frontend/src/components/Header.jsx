// File: src/components/Header.jsx

// import { user_nameButton } from "@clerk/nextjs";

export default function Header({ user_name}) {
  return (
    <div>
<div className="flex flex-col p-4 rounded-2xl bg-navy-900 text-white mb-6 header-project">
  <div className="text-top-heading">
    {user_name.length > 18 ? user_name.split(' ')[0] : user_name}'s Business Adventure Project:
  </div>
  <div className="text-main-heading flex items-center">
    Launch a startup in 12 weeks
    <span className="ml-2"><img src="/design_logo2.svg" alt="🚀" className="h-6 w-6" /></span>
  </div>
</div>
    </div>
  );
}