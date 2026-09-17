import React, { useState, useEffect } from 'react';
import { CreditCard, PlusCircle, LayoutGrid, Shield, Download, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'builder' | 'my-cards' | 'admin';
  onNavigate: (tab: 'home' | 'builder' | 'my-cards' | 'admin') => void;
  onNewCard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onNewCard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold tracking-wider text-sm">
              MYID
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">MYID</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                100% GRATIS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'home'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onNavigate('my-cards')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === 'my-cards'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Kartu Saya</span>
            </button>
            <button
              onClick={() => onNavigate('builder')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === 'builder'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Card Builder</span>
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                currentTab === 'admin'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {canInstallPwa && (
              <button
                onClick={handleInstallPwa}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition flex items-center space-x-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Install App</span>
              </button>
            )}

            <button
              onClick={() => {
                onNewCard();
                onNavigate('builder');
              }}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/25 transition-all flex items-center space-x-2 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Kartu Baru</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium"
          >
            Beranda
          </button>
          <button
            onClick={() => {
              onNavigate('my-cards');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium flex items-center space-x-2"
          >
            <LayoutGrid className="w-4 h-4 text-blue-400" />
            <span>Kartu Saya</span>
          </button>
          <button
            onClick={() => {
              onNavigate('builder');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 text-sm font-medium flex items-center space-x-2"
          >
            <CreditCard className="w-4 h-4 text-blue-400" />
            <span>Card Builder</span>
          </button>
          <button
            onClick={() => {
              onNavigate('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 text-sm font-medium flex items-center space-x-2"
          >
            <Shield className="w-4 h-4 text-slate-400" />
            <span>Admin Dashboard</span>
          </button>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onNewCard();
                onNavigate('builder');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Kartu Baru</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
