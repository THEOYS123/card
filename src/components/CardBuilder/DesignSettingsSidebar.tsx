import React, { useState } from 'react';
import {
  CardModel,
  CardDesignConfig,
  CardUnit,
} from '../../types/card';
import {
  CARD_DIMENSION_PRESETS,
  SAFE_FONTS,
  TEMPLATE_PRESETS,
} from '../../utils/presets';
import {
  Palette,
  Layout,
  Type,
  Maximize2,
  QrCode,
  Lock,
  Globe,
  Sliders,
  Sparkles,
  Check,
  AlertTriangle,
} from 'lucide-react';

interface DesignSettingsSidebarProps {
  card: CardModel;
  onChange: (updatedCard: CardModel) => void;
}

export const DesignSettingsSidebar: React.FC<DesignSettingsSidebarProps> = ({
  card,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<'template' | 'dimensions' | 'colors' | 'font' | 'layout' | 'qr' | 'privacy'>('template');
  const [showPublicConfirmModal, setShowPublicConfirmModal] = useState<boolean>(false);

  const activeSide = card.activeSide || 'front';
  const currentDesign: CardDesignConfig = activeSide === 'front' ? card.frontDesign : card.backDesign;

  // Updates current side design
  const updateDesign = (updates: Partial<CardDesignConfig>) => {
    if (activeSide === 'front') {
      onChange({
        ...card,
        frontDesign: {
          ...card.frontDesign,
          ...updates,
        },
      });
    } else {
      onChange({
        ...card,
        backDesign: {
          ...card.backDesign,
          ...updates,
        },
      });
    }
  };

  // Applies selected template preset
  const applyTemplate = (templateId: string) => {
    const found = TEMPLATE_PRESETS.find((t) => t.id === templateId);
    if (!found) return;

    onChange({
      ...card,
      frontDesign: {
        ...card.frontDesign,
        ...found.front,
        templateId: found.id,
        category: found.category,
      },
      backDesign: {
        ...card.backDesign,
        ...found.back,
        templateId: found.id,
        category: found.category,
      },
    });
  };

  // Select dimension preset
  const handleDimensionPresetChange = (presetName: string) => {
    const preset = CARD_DIMENSION_PRESETS[presetName];
    if (preset) {
      updateDesign({
        dimensionPreset: presetName,
        width: preset.width,
        height: preset.height,
        unit: preset.unit,
      });
    }
  };

  // Custom slug formatter
  const handleSlugChange = (val: string) => {
    const cleanSlug = val
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    onChange({
      ...card,
      slug: cleanSlug,
    });
  };

  const handleTogglePrivacy = (isPublicTarget: boolean) => {
    if (isPublicTarget) {
      setShowPublicConfirmModal(true);
    } else {
      onChange({
        ...card,
        isPublic: false,
      });
    }
  };

  const confirmPublicPublish = () => {
    onChange({
      ...card,
      isPublic: true,
    });
    setShowPublicConfirmModal(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col space-y-4 h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Palette className="w-4 h-4 text-blue-400" />
          <span>Pengaturan Desain</span>
        </h3>
        <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
          {activeSide === 'front' ? 'Mengedit: DEPAN' : 'Mengedit: BELAKANG'}
        </span>
      </div>

      {/* Sub-tabs */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-[10px] font-medium">
        <button
          onClick={() => setActiveTab('template')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'template' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Template
        </button>
        <button
          onClick={() => setActiveTab('dimensions')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'dimensions' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Ukuran
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'colors' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Warna
        </button>
        <button
          onClick={() => setActiveTab('font')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'font' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Font
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'layout' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Tata Letak
        </button>
        <button
          onClick={() => setActiveTab('qr')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'qr' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          QR Code
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'privacy' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Privasi
        </button>
      </div>

      {/* CONTROLS */}
      <div className="space-y-4 overflow-y-auto pr-1 max-h-[580px] text-xs">
        
        {/* 1. TEMPLATES */}
        {activeTab === 'template' && (
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Pilih Style Template
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TEMPLATE_PRESETS.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => applyTemplate(tmpl.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    currentDesign.templateId === tmpl.id
                      ? 'bg-blue-600/10 border-blue-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-xs">{tmpl.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-blue-400 font-mono">
                        {tmpl.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">{tmpl.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. UKURAN & PRESETS */}
        {activeTab === 'dimensions' && (
          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Preset Ukuran Kartu</label>
              <select
                value={currentDesign.dimensionPreset}
                onChange={(e) => handleDimensionPresetChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                {Object.keys(CARD_DIMENSION_PRESETS).map((key) => (
                  <option key={key} value={key}>
                    {key} ({CARD_DIMENSION_PRESETS[key].width} × {CARD_DIMENSION_PRESETS[key].height} {CARD_DIMENSION_PRESETS[key].unit})
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Dimensions Form */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-300 block">Kustomisasi Ukuran Fisik</span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Lebar (Width)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentDesign.width}
                    onChange={(e) => updateDesign({ width: parseFloat(e.target.value) || 90 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Tinggi (Height)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentDesign.height}
                    onChange={(e) => updateDesign({ height: parseFloat(e.target.value) || 55 })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Satuan Unit</label>
                  <select
                    value={currentDesign.unit}
                    onChange={(e) => updateDesign({ unit: e.target.value as CardUnit })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="inch">inch</option>
                    <option value="px">px</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Print Guides Toggle */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-300 block">Panduan Cetak (Print Guides)</span>
              <div className="space-y-1.5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentDesign.showSafeArea}
                    onChange={(e) => updateDesign({ showSafeArea: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="text-slate-300">Tampilkan Safe Area</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentDesign.showBleed}
                    onChange={(e) => updateDesign({ showBleed: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span className="text-slate-300">Tampilkan Bleed Area (3mm)</span>
                </label>
              </div>
              <p className="text-[10px] text-slate-500">Garis panduan ini hanya tampil saat preview editor dan otomatis disembunyikan saat di-download.</p>
            </div>
          </div>
        )}

        {/* 3. WARNA & BACKGROUND */}
        {activeTab === 'colors' && (
          <div className="space-y-3">
            
            {/* Background Type */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tipe Background</label>
              <select
                value={currentDesign.bgType}
                onChange={(e) => updateDesign({ bgType: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="image">Custom Image</option>
              </select>
            </div>

            {/* Colors Pickers Grid */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div>
                <label className="block text-slate-400 text-[10px] mb-1">Warna Background</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={currentDesign.bgColor || '#0f172a'}
                    onChange={(e) => updateDesign({ bgColor: e.target.value })}
                    className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 text-xs">{currentDesign.bgColor}</span>
                </div>
              </div>

              {currentDesign.bgType === 'gradient' && (
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Gradient End</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={currentDesign.bgGradientEnd || '#1e293b'}
                      onChange={(e) => updateDesign({ bgGradientEnd: e.target.value })}
                      className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                    />
                    <span className="font-mono text-slate-300 text-xs">{currentDesign.bgGradientEnd}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-400 text-[10px] mb-1">Warna Teks Utama</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={currentDesign.textColor || '#ffffff'}
                    onChange={(e) => updateDesign({ textColor: e.target.value })}
                    className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 text-xs">{currentDesign.textColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1">Warna Teks Sekunder</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={currentDesign.secondaryTextColor || '#94a3b8'}
                    onChange={(e) => updateDesign({ secondaryTextColor: e.target.value })}
                    className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 text-xs">{currentDesign.secondaryTextColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1">Warna Aksen</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={currentDesign.accentColor || '#38bdf8'}
                    onChange={(e) => updateDesign({ accentColor: e.target.value })}
                    className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 text-xs">{currentDesign.accentColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1">Warna Garis Tepi (Border)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={currentDesign.borderColor || '#334155'}
                    onChange={(e) => updateDesign({ borderColor: e.target.value })}
                    className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 text-xs">{currentDesign.borderColor}</span>
                </div>
              </div>
            </div>

            {/* Glassmorphism Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-300 font-medium">Efek Glassmorphism Transparan</span>
              <input
                type="checkbox"
                checked={currentDesign.isGlassmorphism}
                onChange={(e) => updateDesign({ isGlassmorphism: e.target.checked })}
                className="rounded text-blue-600 focus:ring-0 w-4 h-4"
              />
            </div>
          </div>
        )}

        {/* 4. FONT */}
        {activeTab === 'font' && (
          <div className="space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Pilihan Font Aman
            </span>

            <div className="space-y-1.5">
              {SAFE_FONTS.map((f) => (
                <div
                  key={f}
                  onClick={() => updateDesign({ fontFamily: f })}
                  className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    currentDesign.fontFamily === f
                      ? 'bg-blue-600/10 border-blue-500 text-white font-semibold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  style={{ fontFamily: f }}
                >
                  <span className="text-sm">{f}</span>
                  {currentDesign.fontFamily === f && <Check className="w-4 h-4 text-blue-400" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. TATA LETAK & SPACING */}
        {activeTab === 'layout' && (
          <div className="space-y-3">
            {/* Photo Shape & Size */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-300 block">Bentuk & Ukuran Foto</span>

              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                <button
                  onClick={() => updateDesign({ photoShape: 'circle' })}
                  className={`py-1.5 rounded-lg border ${
                    currentDesign.photoShape === 'circle' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Lingkaran
                </button>
                <button
                  onClick={() => updateDesign({ photoShape: 'rounded' })}
                  className={`py-1.5 rounded-lg border ${
                    currentDesign.photoShape === 'rounded' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Rounded
                </button>
                <button
                  onClick={() => updateDesign({ photoShape: 'square' })}
                  className={`py-1.5 rounded-lg border ${
                    currentDesign.photoShape === 'square' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Kotak
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Ukuran Foto</span>
                  <span>{currentDesign.photoSize || 64} px</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={currentDesign.photoSize || 64}
                  onChange={(e) => updateDesign({ photoSize: parseInt(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Typography Sliders */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-300 block">Ukuran Teks</span>

              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Ukuran Font Nama</span>
                  <span>{currentDesign.nameFontSize || 16} px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="28"
                  value={currentDesign.nameFontSize || 16}
                  onChange={(e) => updateDesign({ nameFontSize: parseInt(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Ukuran Font Teks Umum</span>
                  <span>{currentDesign.textFontSize || 11} px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="16"
                  value={currentDesign.textFontSize || 11}
                  onChange={(e) => updateDesign({ textFontSize: parseInt(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>

            {/* Border Radius & Shadow */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-semibold text-slate-300 block">Border Radius & Bayangan</span>

              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Sudut Melengkung (Radius)</span>
                  <span>{currentDesign.borderRadius || 12} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={currentDesign.borderRadius || 12}
                  onChange={(e) => updateDesign({ borderRadius: parseInt(e.target.value) })}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] mb-1">Intensitas Bayangan (Shadow)</label>
                <select
                  value={currentDesign.shadowIntensity}
                  onChange={(e) => updateDesign({ shadowIntensity: e.target.value as any })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                >
                  <option value="none">Tanpa Bayangan</option>
                  <option value="sm">Halus (Small)</option>
                  <option value="md">Sedang (Medium)</option>
                  <option value="lg">Besar (Large)</option>
                  <option value="xl">Glow Accent</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 6. QR CODE SETTINGS */}
        {activeTab === 'qr' && (
          <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="font-semibold text-slate-300 block">Isi Target QR Code</span>

            <select
              value={currentDesign.qrContent}
              onChange={(e) => updateDesign({ qrContent: e.target.value as any })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
            >
              <option value="cardUrl">URL Kartu Digital Digital Profile (/p/slug)</option>
              <option value="website">Website Pribadi</option>
              <option value="whatsapp">Nomor WhatsApp Direct</option>
              <option value="instagram">Instagram Profile</option>
              <option value="custom">Custom URL</option>
            </select>

            {currentDesign.qrContent === 'custom' && (
              <input
                type="text"
                placeholder="https://link-custom-anda.com"
                value={currentDesign.qrCustomUrl || ''}
                onChange={(e) => updateDesign({ qrCustomUrl: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            )}

            <div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>Ukuran QR</span>
                <span>{currentDesign.qrSize || 48} px</span>
              </div>
              <input
                type="range"
                min="32"
                max="80"
                value={currentDesign.qrSize || 48}
                onChange={(e) => updateDesign({ qrSize: parseInt(e.target.value) })}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        )}

        {/* 7. PRIVACY & PUBLIC SHARING */}
        {activeTab === 'privacy' && (
          <div className="space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-semibold text-white flex items-center space-x-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Mode Penyimpanan & Akses</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                card.isPublic ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {card.isPublic ? 'PUBLIC' : 'PRIVATE (LOKAL)'}
              </span>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="privacy"
                  checked={!card.isPublic}
                  onChange={() => handleTogglePrivacy(false)}
                  className="text-blue-600 focus:ring-0"
                />
                <div>
                  <span className="font-semibold text-white block">PRIVATE (Default)</span>
                  <span className="text-[10px] text-slate-400">
                    Kartu hanya disimpan secara lokal di browser Anda. Tidak dapat diakses dari internet.
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer pt-2 border-t border-slate-800/80">
                <input
                  type="radio"
                  name="privacy"
                  checked={card.isPublic}
                  onChange={() => handleTogglePrivacy(true)}
                  className="text-blue-600 focus:ring-0"
                />
                <div>
                  <span className="font-semibold text-white block">PUBLIC (Dapat Diberikan Link)</span>
                  <span className="text-[10px] text-slate-400">
                    Kartu memiliki URL publik yang dapat dibuka dan dibagikan ke orang lain.
                  </span>
                </div>
              </label>
            </div>

            {/* Custom URL Slug Setup */}
            {card.isPublic && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <label className="block text-slate-300 font-medium">Custom URL Slug Kartu</label>
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300">
                  <span className="text-slate-500 select-none">myid.netlify.app/p/</span>
                  <input
                    type="text"
                    value={card.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="bg-transparent text-white font-semibold focus:outline-none w-full pl-1"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Format: huruf kecil, angka, dan tanda hubung (-).
                </p>

                <div className="pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={card.allowSearchEngine}
                      onChange={(e) => onChange({ ...card, allowSearchEngine: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-0"
                    />
                    <span className="text-slate-300">Izinkan Mesin Pencari (Google) Mengindeks</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Confirmation Modal Before Publishing Public */}
      {showPublicConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <h3>Konfirmasi Publikasi Kartu</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Data pada kartu ini dapat diakses oleh siapa saja yang memiliki link. Anda dapat mengubah kembali status ke Private kapan saja."
            </p>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowPublicConfirmModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                onClick={confirmPublicPublish}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
              >
                Saya Setuju & Publikasikan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
