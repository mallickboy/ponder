'use client';

import { SignIn } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Home from '@/app/page';

export default function AuthWrapper({ children, isSignedIn, setAuthModalOpen }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      {children}
      
      {!isSignedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In to Continue</h2>
            <SignIn 
              signUpUrl="/sign-up" 
              afterSignInUrl="/"
              afterSignUpUrl="/"
            />
          </div>
        </div>
      )}
    </div>
  );
}