import { Navbar } from '@components/Navbar';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
      <footer className="flex w-full items-center justify-center py-3"></footer>
    </div>
  );
}
