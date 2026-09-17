import React, { useEffect, useState, useRef } from 'react';
import {
  CardModel,
  CardDesignConfig,
} from '../types/card';
import { generateQRCodeDataUrl, downloadQRCodePNG } from '../utils/qrGenerator';
import {
  exportElementAsPNG,
  exportElementAsJPG,
  exportElementAsPDF,
} from '../utils/exportCard';
import { exportCardBackup } from '../utils/storage';
import { downloadVCard } from '../utils/vcard';
import {
  Download,
  FileText,
  QrCode,
  UserCheck,
  ShieldAlert,
  Printer,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Share2,
} from 'lucide-react';

interface CardPreviewProps {
  card: CardModel;
  onSideChange?: (side: 'front' | 'back') => void;
  onOpenPrintSheet?: () => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  onSideChange,
  onOpenPrintSheet,
}) => {
  const [activeSide, setActiveSide] = useState<'front' | 'back' | 'full-profile'>(card.activeSide || 'front');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const design: CardDesignConfig = activeSide === 'back' ? card.backDesign : card.frontDesign;

  // Sync side state
  useEffect(() => {
    if (card.activeSide && card.activeSide !== activeSide && activeSide !== 'full-profile') {
      setActiveSide(card.activeSide);
    }
  }, [card.activeSide]);

  // Generate QR Code URL
  useEffect(() => {
    async function updateQR() {
      let targetText = `${window.location.origin}/p/${card.slug || 'myid-card'}`;
      if (design.qrContent === 'website' && card.personal.website) {
        targetText = card.personal.website;
      } else if (design.qrContent === 'whatsapp' && card.personal.whatsapp) {
        targetText = `https://wa.me/${card.personal.whatsapp.replace(/\D/g, '')}`;
      } else if (design.qrContent === 'instagram' && card.personal.instagram) {
        const handle = card.personal.instagram.replace('@', '');
        targetText = `https://instagram.com/${handle}`;
      } else if (design.qrContent === 'custom' && design.qrCustomUrl) {
        targetText = design.qrCustomUrl;
      }

      const url = await generateQRCodeDataUrl(targetText, {
        color: design.qrColor || '#ffffff',
        bgColor: design.qrBgColor || '#00000000',
        width: 180,
      });
      setQrDataUrl(url);
    }
    updateQR();
  }, [
    design.qrContent,
    design.qrCustomUrl,
    design.qrColor,
    design.qrBgColor,
    card.slug,
    card.personal.website,
    card.personal.whatsapp,
    card.personal.instagram,
  ]);

  const toggleSide = (side: 'front' | 'back' | 'full-profile') => {
    setActiveSide(side);
    if (side !== 'full-profile' && onSideChange) onSideChange(side);
  };

  // Physical Ratio calculation (Width / Height)
  const widthVal = design.width || 85.6;
  const heightVal = design.height || 53.98;
  const aspectRatio = widthVal / heightVal;

  // Shadow class mapping
  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm shadow-black/20',
    md: 'shadow-md shadow-black/30',
    lg: 'shadow-xl shadow-black/40',
    xl: 'shadow-2xl shadow-blue-500/10',
  }[design.shadowIntensity || 'md'];

  // Border radius style
  const borderRadiusStyle = `${design.borderRadius || 12}px`;

  // Background style computation
  const getCardBackgroundStyle = (): React.CSSProperties => {
    if (design.bgType === 'gradient') {
      const angle = design.gradientAngle || 135;
      const endColor = design.bgGradientEnd || '#1e293b';
      return {
        background: `linear-gradient(${angle}deg, ${design.bgColor}, ${endColor})`,
      };
    }
    return {
      backgroundColor: design.bgColor || '#0f172a',
    };
  };

  const handleExportPNG = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await exportElementAsPNG(
        cardRef.current,
        `${card.personal.fullName || 'card'}-${activeSide}.png`
      );
    } catch (err) {
      alert('Gagal mengekspor kartu ke PNG.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJPG = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await exportElementAsJPG(
        cardRef.current,
        `${card.personal.fullName || 'card'}-${activeSide}.jpg`
      );
    } catch (err) {
      alert('Gagal mengekspor kartu ke JPG.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      await exportElementAsPDF(
        cardRef.current,
        design,
        `${card.personal.fullName || 'card'}-${activeSide}.pdf`
      );
    } catch (err) {
      alert('Gagal mengekspor kartu ke PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-2xl mx-auto py-2 px-2">
      
      {/* Front, Back & Full Profile View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 shadow-md gap-2">
        <div className="flex items-center space-x-1 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => toggleSide('front')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSide === 'front'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            SISI DEPAN
          </button>
          <button
            onClick={() => toggleSide('back')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSide === 'back'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            SISI BELAKANG
          </button>
          <button
            onClick={() => toggleSide('full-profile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
              activeSide === 'full-profile'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'text-emerald-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEMUA DATA DIGITAL</span>
          </button>
        </div>

        <div className="text-[11px] font-medium text-slate-400 pr-2 hidden md:block">
          {design.width} × {design.height} {design.unit} ({design.dimensionPreset})
        </div>
      </div>

      {/* FULL DIGITAL PROFILE VIEW MODE */}
      {activeSide === 'full-profile' ? (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 text-xs shadow-2xl max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Ringkasan Seluruh Data Terisi ({card.personal.fullName || 'User'})</span>
            </h3>
            <a
              href={`/p/${card.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:underline font-semibold"
            >
              Buka Web Profil (/p/{card.slug})
            </a>
          </div>

          {/* Personal Info */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="font-bold text-blue-400 text-[11px] uppercase tracking-wider block">1. Data Pribadi</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div><span className="text-slate-500 block">Nama Lengkap:</span> <strong className="text-slate-200">{card.personal.fullName || '-'}</strong></div>
              <div><span className="text-slate-500 block">Nama Panggilan:</span> <strong className="text-slate-200">{card.personal.nickname || '-'}</strong></div>
              <div><span className="text-slate-500 block">Sebutan / Title:</span> <strong className="text-slate-200">{card.personal.title || '-'}</strong></div>
              <div><span className="text-slate-500 block">Pronouns:</span> <strong className="text-slate-200">{card.personal.pronouns || '-'}</strong></div>
              <div><span className="text-slate-500 block">Jenis Kelamin:</span> <strong className="text-slate-200">{card.personal.gender || '-'}</strong></div>
              <div><span className="text-slate-500 block">Tempat / Tgl Lahir:</span> <strong className="text-slate-200">{card.personal.birthPlace || ''} {card.personal.birthDate || '-'}</strong></div>
              <div><span className="text-slate-500 block">Domisili / Kota:</span> <strong className="text-slate-200">{card.personal.domicile || ''} {card.personal.city || '-'}</strong></div>
              <div><span className="text-slate-500 block">Alamat:</span> <strong className="text-slate-200">{card.personal.address || '-'}</strong></div>
              <div><span className="text-slate-500 block">Telepon / WA:</span> <strong className="text-slate-200">{card.personal.phone || card.personal.whatsapp || '-'}</strong></div>
              <div><span className="text-slate-500 block">Email:</span> <strong className="text-slate-200">{card.personal.email || '-'}</strong></div>
            </div>
          </div>

          {/* Profile & Career */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="font-bold text-indigo-400 text-[11px] uppercase tracking-wider block">2. Profil, Karir & Pendidikan</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div><span className="text-slate-500 block">Profesi:</span> <strong className="text-slate-200">{card.profile.profession || '-'}</strong></div>
              <div><span className="text-slate-500 block">Perusahaan:</span> <strong className="text-slate-200">{card.profile.company || '-'}</strong></div>
              <div><span className="text-slate-500 block">Pendidikan:</span> <strong className="text-slate-200">{card.profile.education || card.profile.university || '-'}</strong></div>
              <div><span className="text-slate-500 block">Komunitas:</span> <strong className="text-slate-200">{card.profile.community || '-'}</strong></div>
              <div><span className="text-slate-500 block">Keahlian (Skills):</span> <strong className="text-slate-200">{card.profile.skills || '-'}</strong></div>
              <div><span className="text-slate-500 block">Hobi:</span> <strong className="text-slate-200">{card.profile.hobbies || '-'}</strong></div>
            </div>
            {card.profile.bio && <p className="text-[11px] text-slate-300 pt-1 italic">Bio: "{card.profile.bio}"</p>}
            {card.profile.quote && <p className="text-[11px] text-amber-300 italic">Quote: "{card.profile.quote}"</p>}
          </div>

          {/* Social Media Handles */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="font-bold text-cyan-400 text-[11px] uppercase tracking-wider block">3. Social Media & Tautan</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px]">
              {card.personal.website && <div>Website: <span className="text-blue-300 font-medium">{card.personal.website}</span></div>}
              {card.personal.portfolio && <div>Portfolio: <span className="text-blue-300 font-medium">{card.personal.portfolio}</span></div>}
              {card.personal.instagram && <div>Instagram: <span className="text-pink-300 font-medium">{card.personal.instagram}</span></div>}
              {card.personal.tiktok && <div>TikTok: <span className="text-cyan-300 font-medium">{card.personal.tiktok}</span></div>}
              {card.personal.github && <div>GitHub: <span className="text-slate-300 font-medium">{card.personal.github}</span></div>}
              {card.personal.linkedin && <div>LinkedIn: <span className="text-blue-300 font-medium">{card.personal.linkedin}</span></div>}
              {card.personal.telegram && <div>Telegram: <span className="text-sky-300 font-medium">{card.personal.telegram}</span></div>}
              {card.personal.discord && <div>Discord: <span className="text-indigo-300 font-medium">{card.personal.discord}</span></div>}
            </div>
          </div>

          {/* Emergency & Wallet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            {card.emergency.phone && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-300">
                <strong>Kontak Darurat:</strong> {card.emergency.name} ({card.emergency.relationship}) — {card.emergency.phone}
              </div>
            )}
            {card.wallet.isWalletMode && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-300">
                <strong>Wallet Mode:</strong> {card.wallet.foundMessage}
              </div>
            )}
          </div>

          {/* Custom Fields */}
          {card.customFields && card.customFields.length > 0 && (
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1.5">
              <span className="font-bold text-purple-400 text-[11px] uppercase tracking-wider block">4. Field Custom Tambahan</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {card.customFields.map((cf) => (
                  <div key={cf.id} className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block">{cf.label}:</span>
                    <strong className="text-slate-200">{cf.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      ) : (
        /* PHYSICAL CARD CANVAS STAGE */
        <div className="relative w-full flex items-center justify-center py-4 bg-slate-950/60 rounded-3xl border border-slate-800/80 shadow-inner overflow-hidden min-h-[320px] sm:min-h-[360px]">
          
          {/* Card Canvas Node */}
          <div
            ref={cardRef}
            id="myid-card-canvas"
            className={`relative overflow-hidden transition-all duration-300 ${shadowClasses}`}
            style={{
              width: '100%',
              maxWidth: '460px',
              aspectRatio: `${aspectRatio}`,
              borderRadius: borderRadiusStyle,
              borderWidth: `${design.borderWidth || 1}px`,
              borderColor: design.borderColor || '#334155',
              fontFamily: design.fontFamily || 'Plus Jakarta Sans',
              color: design.textColor || '#f8fafc',
              boxSizing: 'border-box',
              ...getCardBackgroundStyle(),
            }}
          >
            {/* Custom Background Image Overlay */}
            {design.bgType === 'image' && design.bgImage && (
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `url(${design.bgImage})`,
                  opacity: (design.bgOpacity ?? 100) / 100,
                  filter: `blur(${design.bgBlur || 0}px)`,
                }}
              />
            )}

            {/* Glassmorphism Tint Overlay */}
            {design.isGlassmorphism && (
              <div
                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 pointer-events-none"
                style={{ borderRadius: borderRadiusStyle }}
              />
            )}

            {/* Safe Area & Bleed Guidelines */}
            {design.showSafeArea && (
              <div className="absolute inset-2 border border-emerald-500/40 border-dashed pointer-events-none z-30 flex items-start justify-end p-1 text-[8px] text-emerald-400 font-mono opacity-80">
                SAFE AREA
              </div>
            )}
            {design.showBleed && (
              <div className="absolute inset-0 border-2 border-rose-500/40 border-dashed pointer-events-none z-30 flex items-end justify-start p-1 text-[8px] text-rose-400 font-mono opacity-80">
                BLEED 3mm
              </div>
            )}

            {/* CARD INNER CONTAINER */}
            <div
              className="relative z-10 w-full h-full flex flex-col justify-between p-4 sm:p-5"
              style={{
                padding: `${design.padding || 16}px`,
                gap: `${design.gap || 8}px`,
              }}
            >
              {/* FRONT SIDE LAYOUT */}
              {activeSide === 'front' ? (
                <div className="w-full h-full flex flex-col justify-between">
                  
                  {/* Header Row: Badge & Logo */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border"
                        style={{
                          color: design.accentColor || '#38bdf8',
                          borderColor: `${design.accentColor}40`,
                          backgroundColor: `${design.accentColor}15`,
                        }}
                      >
                        PERSONAL ID
                      </span>
                    </div>

                    {/* Logo or MYID ID Tag */}
                    {card.logoUrl ? (
                      <img
                        src={card.logoUrl}
                        alt="Logo"
                        className="h-5 sm:h-6 max-w-[80px] object-contain"
                      />
                    ) : (
                      <span
                        className="font-mono text-[10px] tracking-wider opacity-75 font-semibold"
                        style={{ color: design.secondaryTextColor || '#94a3b8' }}
                      >
                        ID: {card.personal.cardIdNumber || 'MYID-8291'}
                      </span>
                    )}
                  </div>

                  {/* Main Content Body */}
                  <div className="flex items-center space-x-3 my-auto">
                    {/* Photo Frame */}
                    {card.photoUrl && (
                      <div
                        className="flex-shrink-0 overflow-hidden border"
                        style={{
                          width: `${design.photoSize || 64}px`,
                          height: `${design.photoSize || 64}px`,
                          borderRadius:
                            design.photoShape === 'circle'
                              ? '9999px'
                              : design.photoShape === 'rounded'
                              ? '12px'
                              : '2px',
                          borderColor: design.photoBorder ? design.accentColor || '#38bdf8' : 'transparent',
                          borderWidth: design.photoBorder ? '2px' : '0px',
                        }}
                      >
                        <img
                          src={card.photoUrl}
                          alt={card.personal.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h2
                        className="font-bold leading-tight truncate"
                        style={{
                          fontSize: `${design.nameFontSize || 16}px`,
                          color: design.textColor || '#ffffff',
                        }}
                      >
                        {card.personal.fullName || 'Nama Lengkap'}
                      </h2>

                      {(card.personal.title || card.profile.profession || card.profile.company) && (
                        <p
                          className="font-medium truncate"
                          style={{
                            fontSize: `${(design.textFontSize || 11) + 1}px`,
                            color: design.accentColor || '#38bdf8',
                          }}
                        >
                          {card.personal.title || card.profile.profession}
                          {card.profile.company ? ` • ${card.profile.company}` : ''}
                        </p>
                      )}

                      {card.personal.domicile && (
                        <p
                          className="text-[10px] truncate"
                          style={{ color: design.secondaryTextColor || '#94a3b8' }}
                        >
                          Domisili: {card.personal.domicile}{card.personal.city ? `, ${card.personal.city}` : ''}
                        </p>
                      )}

                      {/* Contact snippet */}
                      <div className="pt-1 space-y-0.5 text-[10px]">
                        {card.personal.phone && (
                          <p className="truncate opacity-90">Tel/WA: {card.personal.phone}</p>
                        )}
                        {card.personal.email && (
                          <p className="truncate opacity-90">Email: {card.personal.email}</p>
                        )}
                      </div>
                    </div>

                    {/* QR Code element on Front */}
                    {qrDataUrl && (
                      <div className="flex-shrink-0 flex flex-col items-center justify-center p-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                        <img
                          src={qrDataUrl}
                          alt="QR Code"
                          style={{
                            width: `${design.qrSize || 44}px`,
                            height: `${design.qrSize || 44}px`,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Footer Notes / Wallet Message */}
                  <div
                    className="pt-1.5 border-t text-[9px] flex items-center justify-between opacity-80"
                    style={{ borderColor: `${design.borderColor || '#334155'}80` }}
                  >
                    <p className="truncate max-w-[280px]" style={{ color: design.secondaryTextColor || '#94a3b8' }}>
                      {card.wallet.isWalletMode
                        ? card.wallet.foundMessage || 'Jika ditemukan, mohon hubungi pemilik.'
                        : card.personal.website || 'MYID Personal Digital Card'}
                    </p>
                    <span className="font-mono text-[8px] opacity-60">MYID DIGITAL CARD</span>
                  </div>

                </div>
              ) : (
                /* BACK SIDE LAYOUT - RICH EXPANDED DETAILS */
                <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                  
                  {/* Back Header */}
                  <div className="flex items-center justify-between w-full border-b pb-1" style={{ borderColor: `${design.borderColor}80` }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: design.accentColor || '#38bdf8' }}>
                      KONTAK & INFORMASI LENGKAP
                    </span>
                    <span className="font-mono text-[9px] opacity-75" style={{ color: design.secondaryTextColor }}>
                      ID: {card.personal.cardIdNumber || 'MYID-8291'}
                    </span>
                  </div>

                  {/* Back Content Grid */}
                  <div className="grid grid-cols-2 gap-2 my-auto text-[9px] overflow-y-auto max-h-[140px] pr-0.5">
                    {/* Left Column: Web, Socials, Company, Education */}
                    <div className="space-y-0.5">
                      {card.personal.website && (
                        <p className="truncate"><strong className="opacity-75">Web:</strong> {card.personal.website.replace('https://', '')}</p>
                      )}
                      {card.personal.instagram && (
                        <p className="truncate"><strong className="opacity-75">IG:</strong> {card.personal.instagram}</p>
                      )}
                      {card.personal.tiktok && (
                        <p className="truncate"><strong className="opacity-75">TikTok:</strong> {card.personal.tiktok}</p>
                      )}
                      {card.personal.github && (
                        <p className="truncate"><strong className="opacity-75">GitHub:</strong> {card.personal.github}</p>
                      )}
                      {card.personal.linkedin && (
                        <p className="truncate"><strong className="opacity-75">LinkedIn:</strong> {card.personal.linkedin}</p>
                      )}
                      {card.personal.telegram && (
                        <p className="truncate"><strong className="opacity-75">Telegram:</strong> {card.personal.telegram}</p>
                      )}
                      {card.profile.education && (
                        <p className="truncate"><strong className="opacity-75">Edu:</strong> {card.profile.education}</p>
                      )}
                      {/* All Custom Fields */}
                      {card.customFields.map((cf) => (
                        <p key={cf.id} className="truncate">
                          <strong className="opacity-75">{cf.label}:</strong> {cf.value}
                        </p>
                      ))}
                    </div>

                    {/* Right Column: Skills, Emergency & Wallet Note */}
                    <div className="space-y-1 bg-black/20 p-1.5 rounded-lg border border-white/10">
                      {card.profile.skills && (
                        <div>
                          <p className="font-bold text-[8px] uppercase tracking-wider text-blue-400">KEAHLIAN</p>
                          <p className="truncate opacity-90 text-[8.5px]">{card.profile.skills}</p>
                        </div>
                      )}

                      {card.emergency.showOnCard && card.emergency.phone && (
                        <div className="pt-0.5 border-t border-white/10">
                          <p className="font-bold text-[8px] uppercase tracking-wider text-amber-400">
                            KONTAK DARURAT
                          </p>
                          <p className="truncate font-semibold text-[8.5px]">{card.emergency.name} ({card.emergency.phone})</p>
                        </div>
                      )}

                      {card.wallet.isWalletMode && card.wallet.foundMessage && (
                        <div className="pt-0.5 border-t border-white/10">
                          <p className="text-[8px] leading-tight opacity-80">
                            {card.wallet.foundMessage}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back Footer with QR */}
                  <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: `${design.borderColor}80` }}>
                    <p className="text-[8px] opacity-70 truncate max-w-[280px]" style={{ color: design.secondaryTextColor }}>
                      Scan QR untuk profil digital lengkap & simpan vCard
                    </p>
                    {qrDataUrl && (
                      <img
                        src={qrDataUrl}
                        alt="QR"
                        style={{ width: '26px', height: '26px' }}
                      />
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Action Bar (Download PNG, JPG, PDF, QR, vCard, Print Sheet) */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h4 className="text-xs font-semibold text-slate-200 flex items-center space-x-1.5">
            <Download className="w-4 h-4 text-blue-400" />
            <span>Ekspor & Unduh Kartu</span>
          </h4>
          <span className="text-[10px] text-slate-400">
            {isExporting ? 'Memproses...' : 'Siap diunduh'}
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <button
            disabled={isExporting}
            onClick={handleExportPNG}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-medium border border-slate-700 flex flex-col items-center justify-center space-y-1 transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>PNG</span>
          </button>

          <button
            disabled={isExporting}
            onClick={handleExportJPG}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-medium border border-slate-700 flex flex-col items-center justify-center space-y-1 transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>JPG</span>
          </button>

          <button
            disabled={isExporting}
            onClick={handleExportPDF}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-medium border border-slate-700 flex flex-col items-center justify-center space-y-1 transition active:scale-95 disabled:opacity-50"
          >
            <FileText className="w-4 h-4 text-rose-400" />
            <span>PDF (85x54)</span>
          </button>

          <button
            onClick={() => downloadQRCodePNG(qrDataUrl, `${card.slug}-qr.png`)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-medium border border-slate-700 flex flex-col items-center justify-center space-y-1 transition active:scale-95"
          >
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>QR Code</span>
          </button>

          <button
            onClick={() => downloadVCard(card.personal, card.profile, card.emergency)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-medium border border-slate-700 flex flex-col items-center justify-center space-y-1 transition active:scale-95"
          >
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <span>vCard (.vcf)</span>
          </button>

          <button
            onClick={() => exportCardBackup(card)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-medium border border-slate-700 flex flex-col items-center justify-center space-y-1 transition active:scale-95"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Backup .myid</span>
          </button>
        </div>

        {/* Print Multiple Sheet Action */}
        {onOpenPrintSheet && (
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Ingin mencetak beberapa kartu dalam 1 lembar A4?</span>
            <button
              onClick={onOpenPrintSheet}
              className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600/30 transition flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet (A4 Grid)</span>
            </button>
          </div>
        )}
      </div>

      {/* Legal Non-KTP Reminder Notice */}
      <div className="flex items-start space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-300/90 w-full">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-snug">
          Kartu ini adalah kartu identitas pribadi & kontak digital milik pengguna. Tidak memiliki kekuatan hukum sebagai identitas pemerintah (KTP).
        </p>
      </div>

    </div>
  );
};
