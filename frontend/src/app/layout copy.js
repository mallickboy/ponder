// File: src/app/layout.js
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Ponder - Business Adventure Project',
  description: 'Launch a startup in 12 weeks'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}