import React, { useState } from 'react';
import { Scan, Cpu, Activity, Info, Volume2, VolumeX, Sparkles, Menu, X } from 'lucide-react';
import { NavTab } from '../types';
import { soundManager } from '../utils/soundEffects';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAnalysis: () => void;
  onOpenAbout: () => void;
  onStartScan: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  onOpenAnalysis,
  onOpenAbout,
  onStartScan,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    soundManager.playClick();
    onTabChange(tab);
    setMobileMenuOpen(false);

    if (tab === 'analysis') {
      onOpenAnalysis();
    } else if (tab === 'about') {
      onOpenAbout();
    } else if (tab === 'scan') {
      onStartScan();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#030712]/75 border-b border-cyan-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-400/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
            <Scan className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-chakra font-bold text-lg tracking-wider text-white">
              <span>FACESYNC</span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 bg-clip-text text-transparent text-glow-cyan">
                AI
              </span>
            </div>
            <div className="text-[10px] font-mono-tech tracking-widest text-cyan-400/70 uppercase">
              V2.4 BIO-CORE
            </div>
          </div>
        </button>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {[
            { id: 'home', label: 'Home', icon: Cpu },
            { id: 'scan', label: 'Face Scan', icon: Scan },
            { id: 'analysis', label: 'Analysis', icon: Activity },
            { id: 'about', label: 'About', icon: Info },
          ].map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as NavTab)}
                className={`relative px-4 py-2 rounded-md font-chakra text-sm font-semibold tracking-wider transition-all flex items-center gap-2 group ${
                  isActive
                    ? 'text-cyan-300 shadow-[inset_0_0_12px_rgba(6,182,212,0.15)] bg-cyan-950/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>

                {/* Active Cyan Underline & Soft Glow */}
                {isActive && (
                  <>
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]" />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-cyan-400/30 blur-sm rounded-full pointer-events-none" />
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & Futuristic HUD Status */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all shadow-sm"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Futuristic System Light Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono-tech tracking-wider text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SYS: OPTIMAL</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-cyan-500/20 flex flex-col gap-2 pb-2">
          {[
            { id: 'home', label: 'Home', icon: Cpu },
            { id: 'scan', label: 'Face Scan', icon: Scan },
            { id: 'analysis', label: 'Analysis', icon: Activity },
            { id: 'about', label: 'About', icon: Info },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id as NavTab)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-chakra tracking-wider ${
                activeTab === item.id
                  ? 'bg-cyan-950/60 text-cyan-300 border-l-2 border-cyan-400'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <item.icon className="w-4 h-4 text-cyan-400" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-2">
            <span className="text-xs font-mono-tech text-slate-400">Audio Telemetry</span>
            <button
              onClick={onToggleSound}
              className="text-xs px-3 py-1 rounded bg-slate-800 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'ON' : 'MUTED'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
