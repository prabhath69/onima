import { verifyAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#07070d] text-zinc-100 flex flex-col font-sans relative">
      {/* Background glow spheres just for Admin section */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-indigo-500/10 glow-sphere" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/8 glow-sphere" />
      </div>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col relative z-10">
        {children}
      </div>
    </div>
  );
}
