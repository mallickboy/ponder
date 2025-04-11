// File: src/app/layout.js
import './globals.css';
import Sidebar from '@/components/Sidebar';
import{
ClerkProvider,
SignedIn,
SignedOut,
SignIn,
UserButton
} from "@clerk/nextjs"
import Head from 'next/head';

// export const metadata = {
//   title: 'Ponder - Business Adventure Project',
//   description: 'Launch a startup in 12 weeks'
// };

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="flex h-screen bg-slate-100">
          {/* <header className='flex'><UserButton showName/></header> */}
          <Sidebar />
          <SignedOut>
            <div className="flex flex-1 items-center justify-center">
              <SignIn routing="hash" />
            </div>
          </SignedOut>
          <SignedIn>
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}