"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Phone, MessageCircle, Zap, Bot, Mic, Brain,
  Globe, Instagram, Facebook, MessageSquare, Mail, Linkedin,
  ChevronRight, Layers, Server, Volume2, Play, Pause,
  ShieldCheck, Clock, TrendingUp, Users, Sparkles, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };

/* ─── Media showcase data ─── */

const showcases = [
  {
    id: 'voice-rama',
    category: 'voice',
    title: 'Rama Packaging — Voice Agent',
    description: 'Live call recording: AI agent takes a packaging order from a customer. The female voice is the AI handling order intake, cancellations, and queries.',
    mediaType: 'audio' as const,
    mediaSrc: '/rama-packaging-voice-agent/Rama_Packaging_Voice_Agent.aac',
    tags: ['Inbound Orders', 'CRM Sync', 'Natural Voice'],
  },
  {
    id: 'voice-therapy',
    category: 'voice',
    title: 'Therapy Center — Cold Outreach Call',
    description: 'Live outbound sales call to a random therapy center in Austin, TX. The AI agent schedules a meeting with a real, unsuspecting lead.',
    mediaType: 'audio' as const,
    mediaSrc: '/therapy-center-live-random-call-main/Therapy Center Call Recording.mp3',
    tags: ['Outbound Sales', 'Meeting Booking', 'Live Call'],
  },
  {
    id: 'chat-convocore',
    category: 'chat',
    title: 'Rama Packaging — Convocore Chatbot',
    description: 'Multi-modal AI chatbot on Instagram that handles returns, orders, and product recommendations with rich card responses.',
    mediaType: 'images' as const,
    mediaSrcs: [
      '/rama-packaging-convocore-chatbot-multi-modal/ConvoCore_RP_Start.png',
      '/rama-packaging-convocore-chatbot-multi-modal/ConvoCore_Instagram_Chatbot.png',
    ],
    tags: ['Product Cards', 'Returns & Exchanges', 'Instagram DM'],
  },
  {
    id: 'chat-social',
    category: 'chat',
    title: 'Rama Packaging — Social Media Agents',
    description: 'Multi-platform AI agent deployed across Instagram and Facebook Messenger, instantly replying to customer queries on social handles.',
    mediaType: 'video' as const,
    mediaSrc: '/rama-packaging-social-media-chat-agents-main/Instagram_Facebook_Chat_Agent.mp4',
    tags: ['Instagram', 'Facebook Messenger', 'Multi-Platform'],
  },
  {
    id: 'automation-ig',
    category: 'automation',
    title: 'Instagram Comment Automation',
    description: 'Automated Instagram engagement — AI handles comment replies and agent-mode conversations to boost algorithmic reach.',
    mediaType: 'video' as const,
    mediaSrc: '/instagram-automation-main/Social_Media_Automation.mp4',
    tags: ['Comment Automation', 'Engagement Boost', 'Agent Mode'],
  },
];

/* ─── Audio Player Component ─── */
function AudioPlayer({ src, accent }: { src: string; accent: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('loadedmetadata', onMeta); a.removeEventListener('ended', onEnd); };
  }, []);

  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${sec.toString().padStart(2, '0')}`; };

  return (
    <div className="glass-card p-5 rounded-2xl animate-shimmer">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <button onClick={toggle} className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${accent} shrink-0 cursor-pointer transition-transform hover:scale-105 shadow-lg`}>
          {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          {/* Waveform bars */}
          <div className="flex items-end gap-[3px] h-10 mb-2">
            {Array.from({ length: 40 }).map((_, i) => {
              const h = 15 + Math.sin(i * 0.8) * 12 + Math.cos(i * 1.3) * 8;
              const filled = duration > 0 && (i / 40) <= (progress / duration);
              return <div key={i} className={`flex-1 rounded-full transition-all duration-300 ${filled ? 'bg-gradient-to-t from-indigo-500 to-cyan-400' : 'bg-white/[0.08]'} ${playing && filled ? 'animate-pulse' : ''}`} style={{ height: `${h}%`, minWidth: 2 }} />;
            })}
          </div>
          <div className="flex justify-between text-[11px] text-zinc-500 font-mono">
            <span>{fmt(progress)}</span><span>{duration ? fmt(duration) : '--:--'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Image Showcase Component ─── */
function ImageShowcase({ srcs }: { srcs: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-shimmer">
      <div className="relative aspect-[9/16] max-h-[500px] w-full bg-black/30 flex items-center justify-center">
        <Image src={srcs[active]} alt="Screenshot" fill className="object-contain" unoptimized />
      </div>
      {srcs.length > 1 && (
        <div className="flex justify-center gap-2 p-3 border-t border-white/[0.04]">
          {srcs.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === active ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 scale-125' : 'bg-white/[0.15] hover:bg-white/[0.3]'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Video Player Component ─── */
function VideoPlayer({ src }: { src: string }) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!vidRef.current) return;
    if (playing) { vidRef.current.pause(); } else { vidRef.current.play(); }
    setPlaying(!playing);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-shimmer group relative cursor-pointer" onClick={toggle}>
      <div className="relative aspect-video w-full bg-black/30">
        <video ref={vidRef} src={src} className="w-full h-full object-contain" playsInline preload="metadata" onEnded={() => setPlaying(false)} />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Platform data ─── */

const platforms = [
  {
    id: 'voice', icon: Phone, label: 'Voice Agents',
    accentGrad: 'from-violet-500 to-fuchsia-500', accentText: 'text-violet-400',
    glow: 'rgba(139,92,246,0.15)',
    headline: 'AI Voice Agent Platform',
    sub: 'Human-like phone conversations that close deals, book appointments, and take orders — autonomously, 24/7.',
    tech: [
      { name: 'Vapi / Vobiz', role: 'Telephony' }, { name: 'Deepgram', role: 'STT' },
      { name: 'GPT-4o-mini', role: 'LLM' }, { name: 'Neha Voice', role: 'Custom TTS' },
    ],
    stats: [{ v: '24/7', l: 'Availability' }, { v: '< 1s', l: 'Latency' }, { v: '97%', l: 'Satisfaction' }, { v: '0', l: 'Manual Entry' }],
  },
  {
    id: 'chat', icon: MessageCircle, label: 'Chat Agents',
    accentGrad: 'from-cyan-500 to-blue-500', accentText: 'text-cyan-400',
    glow: 'rgba(6,182,212,0.15)',
    headline: 'AI Chat Agent Platform',
    sub: 'Omnichannel digital concierge across Website, Instagram, Facebook, and WhatsApp — powered by RAG knowledge bases.',
    tech: [
      { name: 'Convocore', role: 'No-Code' }, { name: 'n8n', role: 'Workflows' },
      { name: 'LangChain', role: 'Full-Code' }, { name: 'LangGraph', role: 'Enterprise' },
    ],
    stats: [{ v: '5+', l: 'Channels' }, { v: '+340%', l: 'Conversion' }, { v: 'RAG', l: 'Knowledge' }, { v: '30s', l: 'Response' }],
  },
  {
    id: 'automation', icon: Zap, label: 'Automation',
    accentGrad: 'from-amber-500 to-orange-500', accentText: 'text-amber-400',
    glow: 'rgba(245,158,11,0.15)',
    headline: 'Business Automation Suite',
    sub: 'End-to-end pipelines for hyper-personalized outreach and LinkedIn automation — scaling acquisition on autopilot.',
    tech: [
      { name: 'LinkedIn Scraper', role: 'Data' }, { name: 'GPT-4o', role: 'Content' },
      { name: 'n8n Pipelines', role: 'Orchestration' }, { name: 'SMTP Engine', role: 'Email' },
    ],
    stats: [{ v: '10x', l: 'Scale' }, { v: '85%', l: 'Open Rate' }, { v: '0hrs', l: 'Manual' }, { v: '∞', l: 'Follow-ups' }],
  },
];

/* ─── Main Component ─── */
const Work = () => {
  const [activePlatform, setActivePlatform] = useState(0);

  const p = platforms[activePlatform];
  const PIcon = p.icon;
  const filtered = showcases.filter((s) => s.category === p.id);

  return (
    <div className="min-h-screen pt-28 relative overflow-hidden">

      {/* Hero */}
      <section className="py-14 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-outfit tracking-tight">
              Our <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Showcase</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
              Three production platforms powering real businesses — with live demos you can hear, watch, and see.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Selector */}
      <section className="pb-6 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="grid md:grid-cols-3 gap-4">
            {platforms.map((pl, i) => {
              const PlIcon = pl.icon;
              const active = activePlatform === i;
              return (
                <motion.button key={pl.id} variants={scaleIn} transition={{ duration: 0.4 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setActivePlatform(i)}
                  className={`group relative p-5 rounded-2xl text-left transition-all duration-500 cursor-pointer overflow-hidden ${active ? 'glass-card border-white/[0.12] scale-[1.02]' : 'glass-card border-white/[0.04] hover:border-white/[0.08]'}`}>
                  {active && <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${pl.glow}, transparent 70%)` }} />}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${pl.glow}, transparent)` }}>
                        <PlIcon className={`w-5 h-5 ${pl.accentText}`} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Platform 0{i + 1}</span>
                    </div>
                    <h3 className={`text-lg font-bold font-outfit transition-colors ${active ? 'text-zinc-100' : 'text-zinc-300 group-hover:text-zinc-100'}`}>{pl.label}</h3>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${pl.accentGrad} transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-0'}`} />
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Platform Details */}
      <AnimatePresence mode="wait">
        <motion.section key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">

            {/* Overview + Tech Stack */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-5 gap-10 mb-14">
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.glow}, transparent)`, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <PIcon className={`w-6 h-6 ${p.accentText}`} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-100">{p.headline}</h2>
                </div>
                <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8">{p.sub}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {p.stats.map((s, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl text-center animate-shimmer">
                      <div className={`text-2xl font-bold font-outfit bg-gradient-to-r ${p.accentGrad} bg-clip-text text-transparent`}>{s.v}</div>
                      <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-1 font-medium">{s.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-500 mb-4 flex items-center gap-2"><Layers className="w-4 h-4" /> Tech Stack</h3>
                <div className="flex flex-col gap-3">
                  {p.tech.map((t, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl flex items-center justify-between animate-shimmer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.glow}, transparent)` }}>
                          <Server className={`w-4 h-4 ${p.accentText}`} />
                        </div>
                        <span className="text-zinc-200 font-semibold text-sm font-outfit">{t.name}</span>
                      </div>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 glass-pill px-3 py-1 rounded-full">{t.role}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ── Live Demos ── */}
            {filtered.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="mb-14">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-500 mb-6 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Live Demos & Recordings
                </h3>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-8">
                  {filtered.map((s) => (
                    <motion.div key={s.id} variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-col gap-4">
                      {/* Title + tags */}
                      <div>
                        <h4 className="text-xl font-bold font-outfit text-zinc-100 mb-2">{s.title}</h4>
                        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-3">{s.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {s.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider glass-pill px-3 py-1 rounded-full text-zinc-400">{tag}</span>
                          ))}
                        </div>
                      </div>
                      {/* Media */}
                      {s.mediaType === 'audio' && <AudioPlayer src={s.mediaSrc} accent={p.accentGrad} />}
                      {s.mediaType === 'video' && <VideoPlayer src={s.mediaSrc} />}
                      {s.mediaType === 'images' && <ImageShowcase srcs={s.mediaSrcs!} />}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

          </div>
        </motion.section>
      </AnimatePresence>

      {/* Omnichannel Band */}
      <section className="py-14 glass-section border-t border-b border-white/[0.04] relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8">Omnichannel Reach</motion.h3>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-wrap justify-center gap-4">
            {[{ icon: Globe, l: 'Website' }, { icon: Instagram, l: 'Instagram' }, { icon: Facebook, l: 'Facebook' }, { icon: MessageSquare, l: 'WhatsApp' }, { icon: Mail, l: 'Email' }, { icon: Linkedin, l: 'LinkedIn' }].map((ch, i) => {
              const CIcon = ch.icon;
              return (
                <motion.div key={i} variants={scaleIn} transition={{ duration: 0.3 }} whileHover={{ scale: 1.08, y: -2 }} className="group glass-card px-5 py-3 rounded-2xl flex items-center gap-2 animate-shimmer hover:border-indigo-500/20 transition-all">
                  <CIcon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-zinc-300 font-medium">{ch.l}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Collective Impact */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
              Collective <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
            </h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[{ icon: Clock, v: '24/7', l: 'Always On' }, { icon: TrendingUp, v: '+340%', l: 'Conversion Lift' }, { icon: Users, v: '97%', l: 'Satisfaction' }, { icon: Sparkles, v: '0 hrs', l: 'Manual Work' }].map((s, i) => {
              const SIcon = s.icon;
              return (
                <motion.div key={i} variants={scaleIn} transition={{ duration: 0.4 }} whileHover={{ y: -4 }} className="group glass-card p-7 rounded-2xl flex flex-col items-center text-center animate-shimmer">
                  <SIcon className="w-9 h-9 text-indigo-400 mb-3 group-hover:scale-110 transition-transform duration-500" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-1 font-outfit">{s.v}</div>
                  <div className="text-zinc-400 font-light text-sm">{s.l}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.04] relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight font-outfit">
            Ready to deploy your own <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">AI workforce</span>?
          </h2>
          <Link href="/contact" className="group bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center text-zinc-950 shadow-lg shadow-indigo-500/25">
            Start Your Transformation <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-zinc-500 mt-5 text-sm font-light">No forms. No demos. Just results.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Work;
