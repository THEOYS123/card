import React, { useState, useEffect } from 'react';
import { CardModel } from './types/card';
import { getAllCards, createInitialDemoCard, saveCard } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { CardBuilder } from './components/CardBuilder/CardBuilder';
import { MyCardsDashboard } from './components/MyCardsDashboard';
import { PublicProfilePage } from './components/PublicProfilePage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { PrintSheetModal } from './components/PrintSheetModal';
import { NotFoundPage } from './components/NotFoundPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'builder' | 'my-cards' | 'admin'>('home');
  const [activeCard, setActiveCard] = useState<CardModel>(() => {
    const cards = getAllCards();
    return cards.length > 0 ? cards[0] : createInitialDemoCard();
  });
  const [isPrintSheetOpen, setIsPrintSheetOpen] = useState<boolean>(false);

  // Check route path on load for /p/:slug or /admin
  const pathname = window.location.pathname;
  const isPublicRoute = pathname.startsWith('/p/');
  const publicSlug = isPublicRoute ? pathname.replace('/p/', '').trim() : '';
  const isAdminRoute = pathname.startsWith('/admin');

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration error:', err);
      });
    }
  }, []);

  const handleCreateNewCard = () => {
    const demo = createInitialDemoCard();
    const newCard: CardModel = {
      ...demo,
      id: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      slug: 'my-id-' + Math.floor(1000 + Math.random() * 9000),
      personal: {
        fullName: 'Nama Anda',
        cardIdNumber: 'MYID-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
      },
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveCard(newCard);
    setActiveCard(newCard);
    setCurrentTab('builder');
  };

  // If opening a public profile card /p/:slug
  if (isPublicRoute && publicSlug) {
    return (
      <PublicProfilePage
        slug={publicSlug}
        onNavigateHome={() => (window.location.href = '/')}
        onCreateCard={() => (window.location.href = '/')}
      />
    );
  }

  // If opening /admin directly
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar
          currentTab="admin"
          onNavigate={(tab) => {
            if (tab !== 'admin') window.location.href = '/';
            else setCurrentTab('admin');
          }}
          onNewCard={handleCreateNewCard}
        />
        <main className="flex-1 py-6">
          <AdminPanel />
        </main>
        <Footer onNavigate={(tab) => (window.location.href = '/')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Top Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        onNewCard={handleCreateNewCard}
      />

      {/* Main View Router */}
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {currentTab === 'home' && (
          <LandingPage
            onStartBuilder={() => setCurrentTab('builder')}
            onExploreTemplates={() => setCurrentTab('builder')}
          />
        )}

        {currentTab === 'builder' && (
          <CardBuilder
            card={activeCard}
            onCardChange={(updated) => setActiveCard(updated)}
            onOpenPrintSheet={() => setIsPrintSheetOpen(true)}
          />
        )}

        {currentTab === 'my-cards' && (
          <MyCardsDashboard
            onSelectCardToEdit={(selected) => {
              setActiveCard(selected);
              setCurrentTab('builder');
            }}
            onCreateNewCard={handleCreateNewCard}
          />
        )}

        {currentTab === 'admin' && <AdminPanel />}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => setCurrentTab(tab)} />

      {/* Print Sheet Modal */}
      <PrintSheetModal
        isOpen={isPrintSheetOpen}
        card={activeCard}
        onClose={() => setIsPrintSheetOpen(false)}
      />

    </div>
  );
}
