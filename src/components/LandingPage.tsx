import React from 'react';
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle,
  Download,
  QrCode,
  Printer,
  Sparkles,
  ArrowRight,
  UserCheck,
  Layers,
  Lock,
  Globe,
  Share2,
} from 'lucide-react';

interface LandingPageProps {
  onStartBuilder: () => void;
  onExploreTemplates: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilder,
  onExploreTemplates,
}) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Digital Identity Card Builder — 100% GRATIS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Your Identity. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Your Card.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Buat kartu identitas pribadi dan kartu nama digital yang bisa dicetak, disimpan, dan dibagikan. Bebas biaya tanpa registrasi akun wajib.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartBuilder}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>BUAT KARTU SEKARANG</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreTemplates}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition"
          >
            LIHAT CONTOH & TEMPLATE
          </button>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left text-xs max-w-3xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-slate-300 font-medium">Bukan KTP / Resmi</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center space-x-2.5">
            <Lock className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="text-slate-300 font-medium">Private Local Storage</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center space-x-2.5">
            <Printer className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span className="text-slate-300 font-medium">Siap Cetak 85.6x54mm</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center space-x-2.5">
            <QrCode className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <span className="text-slate-300 font-medium">Dynamic QR Code</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: APA ITU MYID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              KONSEP UTAMA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Apa Itu MYID?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              MYID adalah platform pembuat <strong className="text-white">Personal Digital Identity Card</strong> independen. Berbeda dengan kartu nama bisnis konvensional, MYID dirancang agar Anda dapat membuat kartu identitas versi pribadi yang multifungsi.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dapat diselipkan ke dalam dompet sebagai tanda pemilik barang, disimpan sebagai file kontak darurat, atau dibagikan dalam bentuk URL profil digital responsif.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-inner">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
              <CheckCircle className="w-4 h-4" />
              <span>Privasi Terjamin & Tanpa Akun Wajib</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Data Anda secara default tersimpan aman di peramban (browser) lokal Anda. Tidak ada paksaan publikasi data pribadi ke server kecuali jika Anda memilih untuk membagikan URL publik.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTOH PENGGUNAAN (12 Pengguna) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Contoh Penggunaan Kartu
          </h2>
          <p className="text-sm text-slate-400">
            Satu alat sederhana untuk berbagai kebutuhan identitas pribadi sehari-hari.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: '1. Kartu Informasi Pribadi', desc: 'Identitas ringkas serbaguna' },
            { title: '2. Kartu Nama Digital', desc: 'Kontak cepat & link sosial' },
            { title: '3. Pemilik Barang / Dompet', desc: 'Diselipkan di dalam dompet' },
            { title: '4. Kartu Kontak Darurat', desc: 'Kontak keluarga jika terjadi kegawatan' },
            { title: '5. Kartu Profil Pribadi', desc: 'Ringkasan biodata & profesi' },
            { title: '6. Kartu Komunitas', desc: 'Identitas keanggotaan klub' },
            { title: '7. Kartu Freelancer', desc: 'Sertakan keahlian & jasa' },
            { title: '8. Kartu Portfolio', desc: 'Tautan proyek karya terbaik' },
            { title: '9. Kartu Bisnis', desc: 'Profil usaha & kontak usaha' },
            { title: '10. Kartu Organisasi', desc: 'Peran & jabatan organisasi' },
            { title: '11. Kartu Event / Pass', desc: 'Akses acara atau seminar' },
            { title: '12. Kartu Custom', desc: 'Sesuaikan label field sendiri' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 p-4 rounded-2xl transition space-y-1"
            >
              <h3 className="text-xs font-bold text-white">{item.title}</h3>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PILIHAN UKURAN */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Pilihan Ukuran & Presets
          </h2>
          <p className="text-sm text-slate-400">
            Mendukung standar fisik ISO, dompet internasional, hingga kustomisasi ukuran mm/cm/px.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-blue-400">BUSINESS CARD</span>
            <p className="text-lg font-extrabold text-white">90 × 55 mm</p>
            <p className="text-[11px] text-slate-400">Standar kartu nama komersial.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-emerald-400">WALLET / CREDIT CARD</span>
            <p className="text-lg font-extrabold text-white">85.60 × 53.98 mm</p>
            <p className="text-[11px] text-slate-400">Pas persis masuk ke slot dompet.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-amber-400">MINI CARD / ID CARD</span>
            <p className="text-lg font-extrabold text-white">80 × 50 mm</p>
            <p className="text-[11px] text-slate-400">Ringkas dan hemat ruang.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-cyan-400">A6 / A7 / CUSTOM</span>
            <p className="text-lg font-extrabold text-white">Bebas Custom</p>
            <p className="text-[11px] text-slate-400">Atur mm, cm, inch, atau px sesukamu.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: CARA KERJA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Cara Kerja Mudah
          </h2>
          <p className="text-sm text-slate-400">3 langkah sederhana tanpa ribet.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-extrabold text-base flex items-center justify-center">
              1
            </div>
            <h3 className="text-base font-bold text-white">Isi Data Pribadi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Masukkan nama, kontak, foto profil, emergency contact, atau field kustom. Hanya isi data yang Anda inginkan.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 font-extrabold text-base flex items-center justify-center">
              2
            </div>
            <h3 className="text-base font-bold text-white">Pilih & Sesuaikan Desain</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gunakan template Formal, Minimal, Dark, atau Wallet mode. Sesuaikan warna, font, background, dan QR Code.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 font-extrabold text-base flex items-center justify-center">
              3
            </div>
            <h3 className="text-base font-bold text-white">Unduh, Cetak, atau Bagikan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unduh hasil dalam bentuk PNG, JPG, PDF ukuran fisik mm, simpan file kontak .vcf, atau bagikan link publik.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
            <h3 className="font-bold text-white text-sm">Apakah kartu ini KTP resmi pemerintah?</h3>
            <p className="text-slate-400 leading-relaxed">
              Bukan. Kartu yang dibuat melalui MYID adalah kartu informasi pribadi dan kartu nama digital buatan Anda sendiri. Jangan pernah menggunakannya untuk meniru dokumen resmi kependudukan.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
            <h3 className="font-bold text-white text-sm">Apakah layanan ini benar-benar gratis?</h3>
            <p className="text-slate-400 leading-relaxed">
              Ya, 100% gratis digunakan baik untuk pembuatan kartu pribadi lokal maupun publikasi kartu online. Tidak memerlukan sistem pembayaran atau langganan.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
            <h3 className="font-bold text-white text-sm">Bagaimana jika saya ingin mencetak di printer rumah/kantor?</h3>
            <p className="text-slate-400 leading-relaxed">
              Gunakan fitur <strong className="text-white">"Print Sheet (A4 Grid)"</strong>. Sistem akan menyusun beberapa salinan kartu Anda pada kertas A4 lengkap dengan garis potong (crop marks) siap cetak.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mulai Buat Kartu Identitas Digital Anda
          </h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            Hanya butuh 2 menit untuk membuat kartu pribadi yang rapi, profesional, dan dapat diselipkan di dompet Anda.
          </p>
          <button
            onClick={onStartBuilder}
            className="px-8 py-3.5 bg-white text-blue-600 hover:bg-slate-100 font-extrabold rounded-2xl text-sm shadow-xl transition active:scale-95"
          >
            BUAT KARTU SEKARANG — GRATIS
          </button>
        </div>
      </section>

    </div>
  );
};
