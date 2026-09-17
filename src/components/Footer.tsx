import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'builder' | 'my-cards' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Important Disclaimer Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 text-xs sm:text-sm text-slate-300 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-semibold tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Pemberitahuan Resmi Identitas</span>
          </div>
          <p className="leading-relaxed">
            MYID adalah alat pembuatan <strong className="text-white">Kartu Informasi Pribadi, Kartu Dompet, & Digital Business Card</strong>.
            Kartu yang dihasilkan <strong className="text-white">BUKAN KTP, BUKAN dokumen resmi pemerintah</strong>, dan BUKAN bukti identitas kependudukan resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                MYID
              </div>
              <span className="text-lg font-bold text-white tracking-tight">MYID</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Personal Digital Identity Card Builder gratis. Buat, cetak, simpan, dan bagikan kartu profil pribadi & kartu nama digital dengan mudah dan aman tanpa akun wajib.
            </p>
            <p className="text-xs text-slate-500 pt-2">
              Hosted on Netlify • Fast & Privacy First
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Navigasi</p>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">Beranda</button>
              </li>
              <li>
                <button onClick={() => onNavigate('builder')} className="hover:text-white transition">Card Builder</button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-cards')} className="hover:text-white transition">Kartu Saya (Local)</button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition">Admin Panel</button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Fitur Utama</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Cetak Ukuran Dompet (85.6 x 53.98 mm)</li>
              <li>Ekspor PNG, JPG, PDF & vCard (.vcf)</li>
              <li>Kartu Kontak Darurat & Wallet Card</li>
              <li>Dynamic QR Code Generator</li>
              <li>Backup & Restore (.myid)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-2 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} MYID Personal Identity Builder. Gratis digunaan secara luas.
          </div>
          <div className="flex items-center space-x-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk kemudahan identitas digital pribadi</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
