import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export const metadata: Metadata = {
  title: "Onima - AI Automation Agency",
  description: "Emotionally intelligent AI agents that kill busywork permanently. Deploy chatbots, voice agents, and workflow automations that reclaim your time.",
  openGraph: {
    title: "Onima - AI Automation Agency",
    description: "Repetition is a system failure. We deploy AI agents that kill busywork—permanently.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white overflow-x-hidden min-h-screen flex flex-col">
        {/* Persistent ambient glow spheres — visible across all pages */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-indigo-500/25 glow-sphere" />
          <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-cyan-500/20 glow-sphere" />
          <div className="absolute bottom-[10%] left-[25%] w-[450px] h-[450px] bg-violet-500/18 glow-sphere" />
          <div className="absolute top-[60%] right-[30%] w-[350px] h-[350px] bg-indigo-400/12 glow-sphere" />
        </div>

        <Navigation />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
