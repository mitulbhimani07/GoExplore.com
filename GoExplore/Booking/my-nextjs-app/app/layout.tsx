import './globals.css';
import { Navbar } from './components/Navbar';

export const metadata = {
  title: 'My Next.js App',
  description: 'A Next.js application with HeroUI and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}