// src/app/sign-up/[[...sign-up]]/page.js
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-100">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/"
      />
    </div>
  );
}