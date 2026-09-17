import React, { useState } from 'react';
import { CardModel } from '../types/card';
import { generatePrintSheetPDF } from '../utils/exportCard';
import { Printer, X, Check, FileText } from 'lucide-react';

interface PrintSheetModalProps {
  isOpen: boolean;
  card: CardModel;
  onClose: () => void;
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  isOpen,
  card,
  onClose,
}) => {
  const [paperFormat, setPaperFormat] = useState<'a4' | 'a5' | 'letter'>('a4');
  const [includeCropMarks, setIncludeCropMarks] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateSheet = async () => {
    const canvas = document.getElementById('myid-card-canvas');
    if (!canvas) {
      alert('Gagal mengambil tampilan kartu.');
      return;
    }

    setIsGenerating(true);
    try {
      await generatePrintSheetPDF(
        canvas as HTMLElement,
        paperFormat,
        card.frontDesign.width || 85.6,
        card.frontDesign.height || 53.98,
        includeCropMarks
      );
      onClose();
    } catch (err) {
      alert('Gagal membuat file PDF lembar cetak.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Printer className="w-5 h-5 text-blue-400" />
            <span>Print Sheet (Multiple Cards)</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Sistem akan secara otomatis menyusun salinan kartu "{card.personal.fullName || 'Kartu'}" pada satu lembar kertas fisik untuk dicetak di printer rumah/kantor.
        </p>

        <div className="space-y-4 text-xs">
          
          {/* Paper Format */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Ukuran Kertas</label>
            <select
              value={paperFormat}
              onChange={(e) => setPaperFormat(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
            >
              <option value="a4">A4 (210 × 297 mm) — Rata-rata 8-10 Kartu</option>
              <option value="a5">A5 (148 × 210 mm) — Rata-rata 4 Kartu</option>
              <option value="letter">Letter (216 × 279 mm)</option>
            </select>
          </div>

          {/* Crop Marks */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCropMarks}
                onChange={(e) => setIncludeCropMarks(e.target.checked)}
                className="rounded text-blue-600 focus:ring-0"
              />
              <span className="font-semibold text-white">Sertakan Garis Potong (Crop Marks)</span>
            </label>
            <p className="text-[10px] text-slate-400 pl-6">
              Garis bantu potong di setiap sudut kartu memudahkan pengguntingan secara presisi.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Batal
          </button>
          <button
            disabled={isGenerating}
            onClick={handleGenerateSheet}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center space-x-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>{isGenerating ? 'Membuat PDF...' : 'Generate PDF Sheet'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
