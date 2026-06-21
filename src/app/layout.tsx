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
      <body className="bg-neutral-950 text-white overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
