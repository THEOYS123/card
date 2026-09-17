import React, { useState, useRef } from 'react';
import { CardModel } from '../types/card';
import {
  getAllCards,
  deleteCard,
  duplicateCard,
  exportCardBackup,
  importCardBackup,
  saveCard,
} from '../utils/storage';
import {
  Plus,
  Copy,
  Trash2,
  Edit,
  Download,
  Upload,
  Globe,
  Lock,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface MyCardsDashboardProps {
  onSelectCardToEdit: (card: CardModel) => void;
  onCreateNewCard: () => void;
}

export const MyCardsDashboard: React.FC<MyCardsDashboardProps> = ({
  onSelectCardToEdit,
  onCreateNewCard,
}) => {
  const [cards, setCards] = useState<CardModel[]>(() => getAllCards());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isImporting, setIsImporting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshCards = () => {
    setCards(getAllCards());
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kartu "${name}"?`)) {
      deleteCard(id);
      refreshCards();
    }
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicateCard(id);
    if (dup) {
      refreshCards();
    }
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const imported = await importCardBackup(file);
      alert(`Kartu "${imported.personal.fullName}" berhasil dipulihkan!`);
      refreshCards();
    } catch (err: any) {
      alert(err.message || 'Gagal mengimpor file backup .myid');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filteredCards = cards.filter(
    (c) =>
      c.personal.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.personal.title && c.personal.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-blue-400" />
            <span>Kartu Saya (My Cards)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola seluruh kartu identitas digital yang Anda buat. Disimpan lokal di peramban Anda.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Import Backup (.myid)</span>
          </button>

          <button
            onClick={onCreateNewCard}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 flex items-center space-x-1.5 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Kartu Baru</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".myid,.json"
        onChange={handleFileImport}
        className="hidden"
      />

      {/* Search & Stats Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kartu berdasarkan nama, gelar, atau slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <span className="text-xs text-slate-400">
          Total Kartu: <strong className="text-white">{cards.length}</strong>
        </span>
      </div>

      {/* Cards List Grid */}
      {filteredCards.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Belum Ada Kartu</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Anda belum membuat kartu identitas pribadi. Klik tombol di bawah untuk mulai membuat.
            </p>
          </div>
          <button
            onClick={onCreateNewCard}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition"
          >
            Buat Kartu Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((c) => (
            <div
              key={c.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between transition group"
            >
              <div className="space-y-3">
                
                {/* Header: Name & Privacy Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {c.photoUrl ? (
                      <img
                        src={c.photoUrl}
                        alt={c.personal.fullName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-base">
                        {c.personal.fullName ? c.personal.fullName.charAt(0) : 'M'}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition">
                        {c.personal.fullName || 'Tanpa Nama'}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {c.personal.title || c.profile.profession || 'Personal ID Card'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center space-x-1 ${
                      c.isPublic
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {c.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    <span>{c.isPublic ? 'PUBLIC' : 'PRIVATE'}</span>
                  </span>
                </div>

                {/* Info snippet */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1">
                  <p className="text-slate-300">
                    <strong className="text-slate-500">ID:</strong> {c.personal.cardIdNumber || 'MYID'}
                  </p>
                  {c.isPublic && (
                    <p className="text-slate-300 truncate">
                      <strong className="text-slate-500">URL:</strong> /p/{c.slug}
                    </p>
                  )}
                  <p className="text-slate-400 text-[10px]">
                    Diperbarui: {new Date(c.updatedAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-1 text-xs">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onSelectCardToEdit(c)}
                    className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition"
                    title="Edit Kartu"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDuplicate(c.id)}
                    className="p-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
                    title="Duplikat Kartu"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => exportCardBackup(c)}
                    className="p-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
                    title="Export Backup .myid"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  {c.isPublic && (
                    <a
                      href={`/p/${c.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition flex items-center space-x-1"
                      title="Buka Public Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => handleDelete(c.id, c.personal.fullName)}
                    className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                    title="Hapus Kartu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
