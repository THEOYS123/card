import React from 'react';
import { ShieldAlert, ArrowLeft, PlusCircle } from 'lucide-react';

interface NotFoundPageProps {
  onBackHome: () => void;
  onCreateCard: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackHome,
  onCreateCard,
}) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4 space-y-5">
      <div className="w-16 h-16 rounded-3xl bg-blue-600/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">Card not found.</h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Halaman atau kartu identitas yang Anda cari tidak dapat ditemukan atau telah dihapus.
        </p>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <button
          onClick={onBackHome}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back Home</span>
        </button>

        <button
          onClick={onCreateCard}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Your Card</span>
        </button>
      </div>
    </div>
  );
};
