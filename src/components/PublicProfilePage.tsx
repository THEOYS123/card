import React, { useState, useEffect } from 'react';
import { CardModel } from '../types/card';
import { getPublicCardBySlug } from '../utils/storage';
import { downloadVCard } from '../utils/vcard';
import { generateQRCodeDataUrl } from '../utils/qrGenerator';
import { submitReport } from '../utils/adminStorage';
import {
  User,
  Phone,
  Mail,
  Globe,
  Share2,
  Download,
  AlertOctagon,
  Check,
  ShieldCheck,
  MapPin,
  ExternalLink,
  MessageSquare,
  QrCode,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Quote as QuoteIcon,
  Building,
  Users,
  PhoneCall,
  Wallet,
  Calendar,
  Sparkles,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  Send,
  FileText,
  Tag,
  AtSign,
} from 'lucide-react';

interface PublicProfilePageProps {
  slug: string;
  onNavigateHome: () => void;
  onCreateCard: () => void;
}

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({
  slug,
  onNavigateHome,
  onCreateCard,
}) => {
  const [card, setCard] = useState<CardModel | null>(null);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<'spam' | 'impersonation' | 'abuse' | 'inappropriate' | 'other'>('spam');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  useEffect(() => {
    const loaded = getPublicCardBySlug(slug);
    setCard(loaded);

    if (loaded) {
      document.title = `${loaded.personal.fullName || 'Card'} — MYID Digital Card`;
      
      // Update meta robots
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', loaded.allowSearchEngine ? 'index, follow' : 'noindex, nofollow');

      // Generate QR
      generateQRCodeDataUrl(window.location.href, { width: 220, color: '#0f172a' }).then(
        (url) => setQrUrl(url)
      );
    } else {
      document.title = 'Card Not Found — MYID';
    }
  }, [slug]);

  if (!card) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Card Not Found</h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Kartu digital dengan link "/p/{slug}" tidak ditemukan atau telah dikembalikan ke mode Private oleh pemiliknya.
          </p>
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={onNavigateHome}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Kembali ke Beranda
          </button>
          <button
            onClick={onCreateCard}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition"
          >
            Buat Kartu Anda
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${card.personal.fullName} — MYID`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSendReport = () => {
    submitReport({
      cardSlug: slug,
      cardTitle: card.personal.fullName || 'Digital Profile',
      reason: reportReason,
      details: reportDetails,
    });
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
    }, 2000);
  };

  // Extract skills into array
  const skillsList = card.profile.skills
    ? card.profile.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const hobbiesList = card.profile.hobbies
    ? card.profile.hobbies.split(',').map((h) => h.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ke Website MYID</span>
          </button>

          <span className="text-[11px] font-mono text-slate-500">
            ID: {card.personal.cardIdNumber || 'MYID'}
          </span>
        </div>

        {/* Digital Profile Container Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Header Banner */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90" />

          {/* Profile Main Header */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-3 pt-6">
            {card.photoUrl ? (
              <img
                src={card.photoUrl}
                alt={card.personal.fullName}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-slate-900 shadow-2xl"
              />
            ) : (
              <div className="w-28 h-28 rounded-3xl bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl">
                {card.personal.fullName ? card.personal.fullName.charAt(0) : 'U'}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2 flex-wrap gap-y-1">
                <h1 className="text-2xl font-bold text-white">
                  {card.personal.fullName}
                </h1>
                {card.personal.nickname && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                    ({card.personal.nickname})
                  </span>
                )}
                <span className="text-blue-400 text-xs px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 font-semibold">
                  MYID VERIFIED
                </span>
              </div>

              {(card.personal.title || card.profile.profession || card.profile.company) && (
                <p className="text-sm font-semibold text-blue-400">
                  {card.personal.title || card.profile.profession}
                  {card.profile.company ? ` at ${card.profile.company}` : ''}
                </p>
              )}

              {/* Badges row for Domicile, Gender, Pronouns */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-1 text-[11px] text-slate-400">
                {card.personal.domicile && (
                  <span className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{card.personal.domicile}{card.personal.city ? `, ${card.personal.city}` : ''}</span>
                  </span>
                )}
                {card.personal.pronouns && (
                  <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                    {card.personal.pronouns}
                  </span>
                )}
                {card.personal.gender && (
                  <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                    {card.personal.gender}
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            {card.profile.bio && (
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed pt-2 px-2 italic">
                "{card.profile.bio}"
              </p>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <button
              onClick={() => downloadVCard(card.personal, card.profile, card.emergency)}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center space-x-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Simpan Kontak (.vcf)</span>
            </button>

            <button
              onClick={handleShare}
              className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-2xl border border-slate-700 transition flex items-center justify-center space-x-2 active:scale-95"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Link'}</span>
            </button>
          </div>

          {/* SECTION 1: PROFIL & BIOGRAFI LENGKAP */}
          {(card.profile.aboutMe || card.profile.quote || skillsList.length > 0 || hobbiesList.length > 0) && (
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/90 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Tentang Saya & Keahlian</span>
              </h3>

              {card.profile.quote && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-amber-200 text-xs flex items-start space-x-2">
                  <QuoteIcon className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="italic">"{card.profile.quote}"</p>
                </div>
              )}

              {card.profile.aboutMe && (
                <p className="text-xs text-slate-300 leading-relaxed">
                  {card.profile.aboutMe}
                </p>
              )}

              {/* Skills badges */}
              {skillsList.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Keahlian & Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hobbies badges */}
              {hobbiesList.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Hobi & Minat
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hobbiesList.map((hobby, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: PENDIDIKAN & KARIR */}
          {(card.profile.profession || card.profile.company || card.profile.education || card.profile.university || card.profile.community) && (
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/90 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Karir & Pendidikan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {card.profile.profession && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Profesi</p>
                    <p className="font-semibold text-slate-200 mt-0.5">{card.profile.profession}</p>
                  </div>
                )}

                {card.profile.company && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Perusahaan / Kantor</p>
                    <p className="font-semibold text-slate-200 mt-0.5">{card.profile.company}</p>
                  </div>
                )}

                {(card.profile.education || card.profile.university) && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 sm:col-span-2">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Pendidikan & Kampus</p>
                    <p className="font-semibold text-slate-200 mt-0.5">
                      {card.profile.education}{card.profile.university ? ` — ${card.profile.university}` : ''}
                    </p>
                  </div>
                )}

                {card.profile.community && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 sm:col-span-2">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Organisasi / Komunitas</p>
                    <p className="font-semibold text-slate-200 mt-0.5">{card.profile.community}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 3: INFORMASI PRIBADI LENGKAP */}
          {(card.personal.birthPlace || card.personal.birthDate || card.personal.address || card.personal.city || card.personal.postalCode) && (
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/90 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span>Detail Identitas & Alamat</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {(card.personal.birthPlace || card.personal.birthDate) && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Tempat / Tanggal Lahir</p>
                    <p className="font-semibold text-slate-200 mt-0.5">
                      {card.personal.birthPlace ? card.personal.birthPlace : ''}
                      {card.personal.birthPlace && card.personal.birthDate ? ', ' : ''}
                      {card.personal.birthDate ? card.personal.birthDate : ''}
                    </p>
                  </div>
                )}

                {card.personal.address && (
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 sm:col-span-2">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Alamat Lengkap</p>
                    <p className="font-semibold text-slate-200 mt-0.5 leading-snug">{card.personal.address}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 4: KONTAK & SOCIAL MEDIA */}
          <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/90 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Kontak & Social Media</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {card.personal.phone && (
                <a
                  href={`tel:${card.personal.phone}`}
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">TELEPON</p>
                      <p className="font-semibold truncate">{card.personal.phone}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.whatsapp && (
                <a
                  href={`https://wa.me/${card.personal.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">WHATSAPP</p>
                      <p className="font-semibold truncate">{card.personal.whatsapp}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.email && (
                <a
                  href={`mailto:${card.personal.email}`}
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">EMAIL</p>
                      <p className="font-semibold truncate">{card.personal.email}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.website && (
                <a
                  href={card.personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Globe className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">WEBSITE</p>
                      <p className="font-semibold truncate">{card.personal.website}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.portfolio && (
                <a
                  href={card.personal.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">PORTFOLIO</p>
                      <p className="font-semibold truncate">{card.personal.portfolio}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {/* Socials */}
              {card.personal.instagram && (
                <a
                  href={`https://instagram.com/${card.personal.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">INSTAGRAM</p>
                      <p className="font-semibold truncate">{card.personal.instagram}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.tiktok && (
                <a
                  href={`https://tiktok.com/@${card.personal.tiktok.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <AtSign className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">TIKTOK</p>
                      <p className="font-semibold truncate">{card.personal.tiktok}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.linkedin && (
                <a
                  href={card.personal.linkedin.startsWith('http') ? card.personal.linkedin : `https://linkedin.com/in/${card.personal.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Linkedin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">LINKEDIN</p>
                      <p className="font-semibold truncate">{card.personal.linkedin}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.github && (
                <a
                  href={`https://github.com/${card.personal.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Github className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">GITHUB</p>
                      <p className="font-semibold truncate">{card.personal.github}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.telegram && (
                <a
                  href={`https://t.me/${card.personal.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800/80 rounded-xl border border-slate-800 flex items-center justify-between transition text-slate-200"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Send className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] text-slate-500 font-semibold">TELEGRAM</p>
                      <p className="font-semibold truncate">{card.personal.telegram}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                </a>
              )}

              {card.personal.discord && (
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center space-x-2.5">
                  <AtSign className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <div className="truncate">
                    <p className="text-[9px] text-slate-500 font-semibold">DISCORD</p>
                    <p className="font-semibold truncate">{card.personal.discord}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: CUSTOM FIELDS TAMBAHAN */}
          {card.customFields && card.customFields.length > 0 && (
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/90 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Tag className="w-4 h-4 text-purple-400" />
                <span>Informasi Tambahan (Custom Fields)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {card.customFields.map((cf) => (
                  <div key={cf.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">{cf.label}</p>
                    <p className="font-semibold text-slate-200 mt-0.5">{cf.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: KONTAK DARURAT */}
          {card.emergency && card.emergency.phone && (
            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <PhoneCall className="w-4 h-4" />
                <span>Kontak Darurat (Emergency Contact)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-[10px] text-rose-300/70 font-semibold">NAMA & HUBUNGAN</p>
                  <p className="font-bold text-rose-200">{card.emergency.name} ({card.emergency.relationship || 'Keluarga'})</p>
                </div>
                <div>
                  <p className="text-[10px] text-rose-300/70 font-semibold">NOMOR TELEPON</p>
                  <a href={`tel:${card.emergency.phone}`} className="font-bold text-rose-300 underline">
                    {card.emergency.phone}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 7: MODE KARTU DOMPET */}
          {card.wallet && card.wallet.isWalletMode && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl space-y-1.5 text-xs text-emerald-300">
              <div className="flex items-center space-x-2 font-bold uppercase tracking-wider text-emerald-400">
                <Wallet className="w-4 h-4" />
                <span>Kartu Mode Dompet Aktif</span>
              </div>
              <p className="text-slate-300 leading-snug">
                {card.wallet.foundMessage || 'Jika Anda menemukan kartu/dompet ini, silakan hubungi nomor di atas.'}
              </p>
            </div>
          )}

          {/* QR Code Section */}
          {qrUrl && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Scan QR Code untuk Membuka Kartu Digital Ini
              </span>
              <img src={qrUrl} alt="QR Code" className="w-32 h-32 rounded-2xl p-1.5 bg-white" />
            </div>
          )}

          {/* Disclaimer & Report Link */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>MYID Personal Identity Card</span>
            <button
              onClick={() => setShowReportModal(true)}
              className="text-rose-400 hover:text-rose-300 underline"
            >
              Laporkan Profil Ini
            </button>
          </div>

        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <AlertOctagon className="w-5 h-5 text-rose-500" />
              <span>Laporkan Profil Ini</span>
            </h3>

            {reportSuccess ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-semibold text-center">
                Laporan berhasil dikirim ke Admin. Terima kasih.
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Alasan Laporan</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="spam">Spam / Iklan Terlarang</option>
                    <option value="impersonation">Penipuan / Penyerupaan Identitas (Impersonation)</option>
                    <option value="abuse">Pelecehan / Penyalahgunaan (Abuse)</option>
                    <option value="inappropriate">KONTEN Tidak Layak</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Keterangan Tambahan</label>
                  <textarea
                    rows={3}
                    placeholder="Berikan detail penjelasan..."
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSendReport}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl"
                  >
                    Kirim Laporan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

