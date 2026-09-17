import React, { useState } from 'react';
import { CardModel, CustomField } from '../../types/card';
import { ImageCropperModal } from '../ImageCropperModal';
import {
  User,
  Briefcase,
  PhoneCall,
  Wallet,
  Plus,
  Trash2,
  Camera,
  Globe,
  Share2,
  HelpCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface FormDataSidebarProps {
  card: CardModel;
  onChange: (updatedCard: CardModel) => void;
}

export const FormDataSidebar: React.FC<FormDataSidebarProps> = ({ card, onChange }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'profile' | 'emergency' | 'wallet' | 'custom' | 'images'>('personal');
  const [cropperModal, setCropperModal] = useState<{
    isOpen: boolean;
    title: string;
    targetField: 'photoUrl' | 'backPhotoUrl' | 'logoUrl' | 'bgImage';
  }>({
    isOpen: false,
    title: '',
    targetField: 'photoUrl',
  });

  // Updates personal subfield
  const updatePersonal = (field: string, val: string) => {
    onChange({
      ...card,
      personal: {
        ...card.personal,
        [field]: val,
      },
    });
  };

  // Updates profile subfield
  const updateProfile = (field: string, val: string) => {
    onChange({
      ...card,
      profile: {
        ...card.profile,
        [field]: val,
      },
    });
  };

  // Updates emergency contact
  const updateEmergency = (field: string, val: any) => {
    onChange({
      ...card,
      emergency: {
        ...card.emergency,
        [field]: val,
      },
    });
  };

  // Updates wallet info
  const updateWallet = (field: string, val: any) => {
    onChange({
      ...card,
      wallet: {
        ...card.wallet,
        [field]: val,
      },
    });
  };

  // Custom field helpers
  const addCustomField = () => {
    const newField: CustomField = {
      id: 'cf_' + Date.now(),
      label: 'Label Custom',
      value: 'Nilai',
    };
    onChange({
      ...card,
      customFields: [...card.customFields, newField],
    });
  };

  const updateCustomField = (id: string, label: string, value: string) => {
    const updated = card.customFields.map((cf) =>
      cf.id === id ? { ...cf, label, value } : cf
    );
    onChange({ ...card, customFields: updated });
  };

  const removeCustomField = (id: string) => {
    const updated = card.customFields.filter((cf) => cf.id !== id);
    onChange({ ...card, customFields: updated });
  };

  const openCropper = (
    title: string,
    targetField: 'photoUrl' | 'backPhotoUrl' | 'logoUrl' | 'bgImage'
  ) => {
    setCropperModal({ isOpen: true, title, targetField });
  };

  const handleCroppedImage = (dataUrl: string) => {
    if (cropperModal.targetField === 'photoUrl') {
      onChange({ ...card, photoUrl: dataUrl });
    } else if (cropperModal.targetField === 'backPhotoUrl') {
      onChange({ ...card, backPhotoUrl: dataUrl });
    } else if (cropperModal.targetField === 'logoUrl') {
      onChange({ ...card, logoUrl: dataUrl });
    } else if (cropperModal.targetField === 'bgImage') {
      onChange({
        ...card,
        frontDesign: {
          ...card.frontDesign,
          bgType: 'image',
          bgImage: dataUrl,
        },
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col space-y-4 h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <User className="w-4 h-4 text-blue-400" />
          <span>Form Data Kartu</span>
        </h3>
        <span className="text-[10px] text-slate-400">Semua field opsional kecuali nama</span>
      </div>

      {/* Internal Sub-tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-[11px] font-medium">
        <button
          onClick={() => setActiveTab('personal')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'personal'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Pribadi
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Profil
        </button>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'emergency'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Darurat
        </button>
        <button
          onClick={() => setActiveTab('wallet')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'wallet'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Dompet
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'custom'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Custom
        </button>
        <button
          onClick={() => setActiveTab('images')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'images'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Foto
        </button>
      </div>

      {/* TAB CONTENT AREAS */}
      <div className="space-y-4 overflow-y-auto pr-1 max-h-[580px] text-xs">
        
        {/* 1. DATA PRIBADI */}
        {activeTab === 'personal' && (
          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Nama Lengkap <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="mis. Rendi Muhammad"
                value={card.personal.fullName}
                onChange={(e) => updatePersonal('fullName', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  placeholder="mis. Rendi"
                  value={card.personal.nickname || ''}
                  onChange={(e) => updatePersonal('nickname', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Sebutan / Title</label>
                <input
                  type="text"
                  placeholder="mis. Web Developer"
                  value={card.personal.title || ''}
                  onChange={(e) => updatePersonal('title', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Pronouns</label>
                <input
                  type="text"
                  placeholder="mis. he/him"
                  value={card.personal.pronouns || ''}
                  onChange={(e) => updatePersonal('pronouns', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Jenis Kelamin</label>
                <input
                  type="text"
                  placeholder="mis. Laki-laki / Perempuan"
                  value={card.personal.gender || ''}
                  onChange={(e) => updatePersonal('gender', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tempat Lahir</label>
                <input
                  type="text"
                  placeholder="mis. Bandung"
                  value={card.personal.birthPlace || ''}
                  onChange={(e) => updatePersonal('birthPlace', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  value={card.personal.birthDate || ''}
                  onChange={(e) => updatePersonal('birthDate', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Domisili / Negara</label>
                <input
                  type="text"
                  placeholder="mis. Indonesia"
                  value={card.personal.domicile || ''}
                  onChange={(e) => updatePersonal('domicile', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  placeholder="mis. Bandung"
                  value={card.personal.city || ''}
                  onChange={(e) => updatePersonal('city', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Alamat Lengkap</label>
              <textarea
                rows={2}
                placeholder="Jl. Dago Asri No. 42"
                value={card.personal.address || ''}
                onChange={(e) => updatePersonal('address', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  placeholder="081234567890"
                  value={card.personal.phone || ''}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">WhatsApp</label>
                <input
                  type="text"
                  placeholder="081234567890"
                  value={card.personal.whatsapp || ''}
                  onChange={(e) => updatePersonal('whatsapp', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={card.personal.email || ''}
                onChange={(e) => updatePersonal('email', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Website</label>
                <input
                  type="text"
                  placeholder="https://contoh.com"
                  value={card.personal.website || ''}
                  onChange={(e) => updatePersonal('website', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Portfolio</label>
                <input
                  type="text"
                  placeholder="https://portfolio.com"
                  value={card.personal.portfolio || ''}
                  onChange={(e) => updatePersonal('portfolio', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Social Media Grid */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Social Media Handles
              </span>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Instagram (@username)"
                  value={card.personal.instagram || ''}
                  onChange={(e) => updatePersonal('instagram', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="TikTok (@username)"
                  value={card.personal.tiktok || ''}
                  onChange={(e) => updatePersonal('tiktok', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="GitHub (username)"
                  value={card.personal.github || ''}
                  onChange={(e) => updatePersonal('github', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="LinkedIn (username)"
                  value={card.personal.linkedin || ''}
                  onChange={(e) => updatePersonal('linkedin', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Telegram (@username)"
                  value={card.personal.telegram || ''}
                  onChange={(e) => updatePersonal('telegram', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Discord (username)"
                  value={card.personal.discord || ''}
                  onChange={(e) => updatePersonal('discord', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFIL & KARIR */}
        {activeTab === 'profile' && (
          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Bio Singkat</label>
              <textarea
                rows={2}
                placeholder="Penjelasan ringkas tentang diri Anda..."
                value={card.profile.bio || ''}
                onChange={(e) => updateProfile('bio', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Profesi / Pekerjaan</label>
                <input
                  type="text"
                  placeholder="mis. Software Engineer"
                  value={card.profile.profession || ''}
                  onChange={(e) => updateProfile('profession', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Perusahaan / Kantor</label>
                <input
                  type="text"
                  placeholder="mis. Tech Studio"
                  value={card.profile.company || ''}
                  onChange={(e) => updateProfile('company', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Keahlian (Skills)</label>
              <input
                type="text"
                placeholder="mis. React, TypeScript, UI/UX"
                value={card.profile.skills || ''}
                onChange={(e) => updateProfile('skills', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Pendidikan / Gelar</label>
                <input
                  type="text"
                  placeholder="mis. S1 Teknik Informatika"
                  value={card.profile.education || ''}
                  onChange={(e) => updateProfile('education', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Universitas / Sekolah</label>
                <input
                  type="text"
                  placeholder="mis. Unikom"
                  value={card.profile.university || ''}
                  onChange={(e) => updateProfile('university', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Organisasi / Komunitas</label>
                <input
                  type="text"
                  placeholder="mis. Google Developer Group"
                  value={card.profile.community || ''}
                  onChange={(e) => updateProfile('community', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Hobi / Keterampilan</label>
                <input
                  type="text"
                  placeholder="mis. Fotografi, Musik"
                  value={card.profile.hobbies || ''}
                  onChange={(e) => updateProfile('hobbies', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Quote Favorit</label>
              <input
                type="text"
                placeholder="mis. Stay hungry, stay foolish."
                value={card.profile.quote || ''}
                onChange={(e) => updateProfile('quote', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        )}

        {/* 3. KONTAK DARURAT */}
        {activeTab === 'emergency' && (
          <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-semibold text-white flex items-center space-x-1.5">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Emergency Contact</span>
              </span>
              <label className="flex items-center space-x-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={card.emergency.showOnCard}
                  onChange={(e) => updateEmergency('showOnCard', e.target.checked)}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="text-slate-300 font-medium">Tampilkan pada kartu</span>
              </label>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Nama Kontak Darurat</label>
              <input
                type="text"
                placeholder="mis. Budi Santoso"
                value={card.emergency.name}
                onChange={(e) => updateEmergency('name', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Hubungan / Relasi</label>
                <input
                  type="text"
                  placeholder="mis. Orang Tua / Keluarga"
                  value={card.emergency.relationship}
                  onChange={(e) => updateEmergency('relationship', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  placeholder="081987654321"
                  value={card.emergency.phone}
                  onChange={(e) => updateEmergency('phone', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. WALLET CARD SETTINGS */}
        {activeTab === 'wallet' && (
          <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-semibold text-white flex items-center space-x-1.5">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Wallet Card Mode</span>
              </span>
              <label className="flex items-center space-x-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={card.wallet.isWalletMode}
                  onChange={(e) => updateWallet('isWalletMode', e.target.checked)}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="text-slate-300 font-medium">Mode Kartu Dompet</span>
              </label>
            </div>

            <p className="text-[11px] text-slate-400">
              Dioptimalkan untuk kartu fisik yang diselipkan di dalam dompet. Jika dompet hilang, orang yang menemukan dapat langsung menghubungi pemilik.
            </p>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Pesan Jika Kartu/Dompet Ditemukan</label>
              <textarea
                rows={3}
                placeholder="Jika Anda menemukan kartu/dompet ini, silakan hubungi pemilik."
                value={card.wallet.foundMessage}
                onChange={(e) => updateWallet('foundMessage', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* 5. CUSTOM FIELDS */}
        {activeTab === 'custom' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold">Field Tambahan Sendiri</span>
              <button
                type="button"
                onClick={addCustomField}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Field</span>
              </button>
            </div>

            {card.customFields.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic text-center py-4">
                Belum ada field custom. Klik "+ Tambah Field" untuk menambahkan label sendiri seperti Golongan Darah, Status Vaksin, Discord, dll.
              </p>
            ) : (
              <div className="space-y-2">
                {card.customFields.map((cf) => (
                  <div key={cf.id} className="flex items-center space-x-2 bg-slate-800 p-2 rounded-xl border border-slate-700">
                    <input
                      type="text"
                      placeholder="Label (mis. Golongan Darah)"
                      value={cf.label}
                      onChange={(e) => updateCustomField(cf.id, e.target.value, cf.value)}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Isi (mis. O+)"
                      value={cf.value}
                      onChange={(e) => updateCustomField(cf.id, cf.label, e.target.value)}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomField(cf.id)}
                      className="p-1 text-rose-400 hover:text-rose-300 rounded hover:bg-slate-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. FOTO & LOGO UPLOADS */}
        {activeTab === 'images' && (
          <div className="space-y-4">
            
            {/* Foto Profil */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-white block">Foto Profil / Kartu</span>
              <div className="flex items-center space-x-3">
                {card.photoUrl ? (
                  <img
                    src={card.photoUrl}
                    alt="Foto Profil"
                    className="w-14 h-14 rounded-xl object-cover border border-blue-500"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                    <Camera className="w-6 h-6" />
                  </div>
                )}
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => openCropper('Upload Foto Profil', 'photoUrl')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-[11px]"
                  >
                    {card.photoUrl ? 'Ganti Foto' : 'Upload Foto'}
                  </button>
                  {card.photoUrl && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...card, photoUrl: '' })}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg text-[11px]"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Transparan */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-white block">Logo Personal / Brand</span>
              <div className="flex items-center space-x-3">
                {card.logoUrl ? (
                  <img
                    src={card.logoUrl}
                    alt="Logo"
                    className="w-14 h-14 rounded-xl object-contain bg-slate-900 border border-slate-700"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                    <Globe className="w-6 h-6" />
                  </div>
                )}
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => openCropper('Upload Logo', 'logoUrl')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium text-[11px]"
                  >
                    {card.logoUrl ? 'Ganti Logo' : 'Upload Logo'}
                  </button>
                  {card.logoUrl && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...card, logoUrl: '' })}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 rounded-lg text-[11px]"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Background Image Upload */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-white block">Background Image Custom</span>
              <button
                type="button"
                onClick={() => openCropper('Upload Custom Background', 'bgImage')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs flex items-center justify-center space-x-2"
              >
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Pilih Gambar Latar Belakang</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Image Cropper Modal Instance */}
      <ImageCropperModal
        isOpen={cropperModal.isOpen}
        title={cropperModal.title}
        onClose={() => setCropperModal({ ...cropperModal, isOpen: false })}
        onCropComplete={handleCroppedImage}
      />

    </div>
  );
};
