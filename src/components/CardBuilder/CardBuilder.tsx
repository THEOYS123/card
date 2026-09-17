import React, { useState } from 'react';
import { CardModel } from '../../types/card';
import { FormDataSidebar } from './FormDataSidebar';
import { CardPreview } from '../CardPreview';
import { DesignSettingsSidebar } from './DesignSettingsSidebar';
import { saveCard } from '../../utils/storage';
import { Save, Eye, Palette, Edit3, CheckCircle2 } from 'lucide-react';

interface CardBuilderProps {
  card: CardModel;
  onCardChange: (card: CardModel) => void;
  onOpenPrintSheet: () => void;
}

export const CardBuilder: React.FC<CardBuilderProps> = ({
  card,
  onCardChange,
  onOpenPrintSheet,
}) => {
  const [mobileTab, setMobileTab] = useState<'form' | 'preview' | 'design'>('preview');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<boolean>(false);

  const handleCardUpdate = (updatedCard: CardModel) => {
    onCardChange(updatedCard);
    saveCard(updatedCard);
  };

  const handleManualSave = () => {
    saveCard(card);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 2000);
  };

  const handleSideChange = (side: 'front' | 'back') => {
    handleCardUpdate({
      ...card,
      activeSide: side,
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Builder Top Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 shadow-lg">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <span>Editor: {card.personal.fullName || 'Kartu Baru'}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {card.personal.cardIdNumber || 'MYID'}
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Perubahan data dan desain diperbarui secara real-time.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {saveSuccessMessage && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Tersimpan!</span>
            </span>
          )}

          <button
            onClick={handleManualSave}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition flex items-center space-x-1.5 active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Kartu</span>
          </button>
        </div>
      </div>

      {/* Mobile Switcher Tabs */}
      <div className="lg:hidden flex items-center justify-around bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setMobileTab('form')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition ${
            mobileTab === 'form' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Isi Data</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition ${
            mobileTab === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview Live</span>
        </button>
        <button
          onClick={() => setMobileTab('design')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center space-x-1.5 transition ${
            mobileTab === 'design' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Desain</span>
        </button>
      </div>

      {/* Main 3-Column Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar: Form Data */}
        <div className={`lg:col-span-4 ${mobileTab === 'form' ? 'block' : 'hidden lg:block'}`}>
          <FormDataSidebar card={card} onChange={handleCardUpdate} />
        </div>

        {/* Middle Stage: Live Preview */}
        <div className={`lg:col-span-4 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <CardPreview
            card={card}
            onSideChange={handleSideChange}
            onOpenPrintSheet={onOpenPrintSheet}
          />
        </div>

        {/* Right Sidebar: Design Controls */}
        <div className={`lg:col-span-4 ${mobileTab === 'design' ? 'block' : 'hidden lg:block'}`}>
          <DesignSettingsSidebar card={card} onChange={handleCardUpdate} />
        </div>

      </div>

    </div>
  );
};
