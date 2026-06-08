import React, { useState } from 'react';
import { BookOpen, Sparkles, Binary, Award, Clock, Menu, X, Flame } from 'lucide-react';
import { BOOK_METADATA } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'reader', name: "Kitobxon", icon: BookOpen, description: "Keng qamrovli asar" },
    { id: 'counter', name: "Zikr Portali", icon: Sparkles, description: "Kvant muvofiqlashuv" },
    { id: 'sandbox', name: "Matritsa", icon: Binary, description: "Adadlar simulyatori" },
    { id: 'saved', name: "Mening Virdlarim", icon: Award, description: "Maxfiy statistika" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('reader')}
          id="brand-logo-container"
        >
          {/* Custom Sacred Geometry Logo */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-400/20 group-hover:border-gold-400/50 transition-all duration-350">
            {/* Spinning outward golden ring */}
            <div className="absolute inset-0.5 rounded-lg border border-dashed border-gold-500/30 animate-orbit-slow" />
            <div className="absolute inset-2.5 rounded border border-emerald-500/30 animate-pulse-slow" />
            {/* Center light core */}
            <div className="h-2 w-2 rounded-full bg-gold-400 shadow-[0_0_10px_#dba112]" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors uppercase">
              {BOOK_METADATA.title}
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
              G'aybiy Muhandislik
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`btn-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive 
                    ? 'text-gold-400 bg-gold-500/5 border border-gold-500/10' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-gold-400' : 'text-zinc-500 group-hover:text-white'}`} />
                <span>{item.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-gold-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick status badges */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-400 uppercase">SERVER CONNECTED</span>
          </div>
          <div className="text-[10px] text-zinc-500">
            2026 UTC
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800"
            aria-label="Menuni ochish/yopish"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden border-t border-white/5 bg-zinc-950 px-4 py-4 space-y-2 animate-fadeIn">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`btn-mobile-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border font-sans text-left transition-all ${
                  isActive 
                    ? 'bg-gold-500/5 text-gold-400 border-gold-500/25' 
                    : 'bg-zinc-900/40 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-gold-400/10 text-gold-400' : 'bg-zinc-950/80 text-zinc-500'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="text-[11px] text-zinc-500 font-normal">{item.description}</div>
                  </div>
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-gold-400 opacity-60" />
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500 px-2">
            <span>Uvaysiy Ijoza Silsilasi</span>
            <span className="text-emerald-400 font-semibold uppercase">● Secure Tunnel</span>
          </div>
        </div>
      )}
    </header>
  );
}
