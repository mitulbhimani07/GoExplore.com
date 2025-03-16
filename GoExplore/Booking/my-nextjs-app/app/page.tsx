import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to My Next.js App</h1>
      <p className="mt-4 text-lg">This is the home page of your application.</p>
      <Navbar />
    </main>
  );
}