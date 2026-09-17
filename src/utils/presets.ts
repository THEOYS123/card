import { CardDimension, CardDesignConfig, TemplateCategory } from '../types/card';

export const CARD_DIMENSION_PRESETS: Record<string, CardDimension> = {
  'BUSINESS CARD': { name: 'Business Card', width: 90, height: 55, unit: 'mm' },
  'WALLET CARD': { name: 'Wallet Card', width: 85.60, height: 53.98, unit: 'mm' },
  'CREDIT CARD SIZE': { name: 'Credit Card Size', width: 85.60, height: 53.98, unit: 'mm' },
  'MINI CARD': { name: 'Mini Card', width: 80, height: 50, unit: 'mm' },
  'ID CARD': { name: 'ID Card', width: 85.60, height: 54, unit: 'mm' },
  'A6': { name: 'A6', width: 105, height: 148, unit: 'mm' },
  'A7': { name: 'A7', width: 74, height: 105, unit: 'mm' },
  'CUSTOM': { name: 'Custom Size', width: 90, height: 55, unit: 'mm' },
};

export const SAFE_FONTS = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'DM Sans',
  'Plus Jakarta Sans',
  'Nunito',
  'Space Grotesk',
];

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'FORMAL',
  'MINIMAL',
  'MODERN',
  'DARK',
  'LIGHT',
  'BUSINESS',
  'PERSONAL',
  'WALLET',
  'PORTFOLIO',
  'CREATIVE',
  'TECH',
  'CLASSIC',
];

export const DEFAULT_DESIGN_CONFIG: CardDesignConfig = {
  templateId: 'modern-wallet-default',
  category: 'MODERN',
  
  dimensionPreset: 'WALLET CARD',
  width: 85.60,
  height: 53.98,
  unit: 'mm',
  
  bgColor: '#0f172a',
  bgGradientEnd: '#1e293b',
  gradientAngle: 135,
  textColor: '#f8fafc',
  secondaryTextColor: '#94a3b8',
  accentColor: '#3b82f6',
  borderColor: '#334155',
  cardOverlayColor: 'rgba(15, 23, 42, 0.75)',
  
  bgType: 'solid',
  bgPattern: 'none',
  bgOpacity: 100,
  bgBlur: 0,
  isGlassmorphism: false,

  fontFamily: 'Plus Jakarta Sans',
  nameFontSize: 16,
  textFontSize: 11,
  
  photoSize: 64,
  photoPositionX: 50,
  photoPositionY: 50,
  photoShape: 'rounded',
  photoBorder: true,

  padding: 16,
  gap: 8,
  margin: 0,
  borderRadius: 14,
  borderWidth: 1,
  shadowIntensity: 'md',
  
  qrContent: 'cardUrl',
  qrSize: 48,
  qrMargin: 2,
  qrColor: '#ffffff',
  qrBgColor: '#00000000',
  
  showSafeArea: false,
  showBleed: false,
};

export interface TemplatePreset {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  front: Partial<CardDesignConfig>;
  back: Partial<CardDesignConfig>;
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'formal-executive',
    name: 'Executive Formal',
    category: 'FORMAL',
    description: 'Rapi, bersih, dan profesional tanpa elemen KTP pemerintah.',
    front: {
      bgColor: '#1e293b',
      textColor: '#f8fafc',
      secondaryTextColor: '#cbd5e1',
      accentColor: '#38bdf8',
      borderColor: '#475569',
      fontFamily: 'Inter',
      borderRadius: 8,
      borderWidth: 1,
      photoShape: 'square',
    },
    back: {
      bgColor: '#0f172a',
      textColor: '#f8fafc',
      secondaryTextColor: '#94a3b8',
      accentColor: '#38bdf8',
      borderColor: '#334155',
      fontFamily: 'Inter',
      borderRadius: 8,
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'MINIMAL',
    description: 'Desain ringkas, fokus pada kejelasan informasi.',
    front: {
      bgColor: '#ffffff',
      textColor: '#0f172a',
      secondaryTextColor: '#64748b',
      accentColor: '#2563eb',
      borderColor: '#e2e8f0',
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: 12,
      borderWidth: 1,
      photoShape: 'circle',
    },
    back: {
      bgColor: '#f8fafc',
      textColor: '#0f172a',
      secondaryTextColor: '#64748b',
      accentColor: '#2563eb',
      borderColor: '#e2e8f0',
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: 12,
    }
  },
  {
    id: 'wallet-id-blue',
    name: 'Wallet ID Safe',
    category: 'WALLET',
    description: 'Dioptimalkan untuk disimpan dalam dompet fisik.',
    front: {
      bgColor: '#0284c7',
      bgGradientEnd: '#0f172a',
      gradientAngle: 120,
      bgType: 'gradient',
      textColor: '#ffffff',
      secondaryTextColor: '#e0f2fe',
      accentColor: '#38bdf8',
      borderColor: '#0369a1',
      fontFamily: 'DM Sans',
      borderRadius: 14,
      photoShape: 'rounded',
    },
    back: {
      bgColor: '#0f172a',
      textColor: '#f8fafc',
      secondaryTextColor: '#94a3b8',
      accentColor: '#38bdf8',
      borderColor: '#1e293b',
      fontFamily: 'DM Sans',
      borderRadius: 14,
    }
  },
  {
    id: 'tech-cyber-dark',
    name: 'Tech Cyber Dark',
    category: 'TECH',
    description: 'Aksen futuristik khusus developer dan tech enthusiast.',
    front: {
      bgColor: '#090d16',
      textColor: '#f1f5f9',
      secondaryTextColor: '#94a3b8',
      accentColor: '#10b981',
      borderColor: '#1e293b',
      fontFamily: 'Space Grotesk',
      borderRadius: 10,
      photoShape: 'rounded',
    },
    back: {
      bgColor: '#090d16',
      textColor: '#f1f5f9',
      secondaryTextColor: '#94a3b8',
      accentColor: '#10b981',
      borderColor: '#1e293b',
      fontFamily: 'Space Grotesk',
      borderRadius: 10,
    }
  },
  {
    id: 'creative-glass',
    name: 'Creative Glass',
    category: 'CREATIVE',
    description: 'Efek translucent glassmorphism dengan aksen modern.',
    front: {
      bgColor: '#1e1b4b',
      bgGradientEnd: '#312e81',
      gradientAngle: 135,
      bgType: 'gradient',
      textColor: '#ffffff',
      secondaryTextColor: '#c7d2fe',
      accentColor: '#a855f7',
      borderColor: '#4338ca',
      fontFamily: 'Poppins',
      isGlassmorphism: true,
      borderRadius: 16,
    },
    back: {
      bgColor: '#1e1b4b',
      textColor: '#ffffff',
      secondaryTextColor: '#c7d2fe',
      accentColor: '#a855f7',
      borderColor: '#4338ca',
      fontFamily: 'Poppins',
      isGlassmorphism: true,
      borderRadius: 16,
    }
  },
  {
    id: 'business-corporate',
    name: 'Business Pro',
    category: 'BUSINESS',
    description: 'Kartu nama & identitas bisnis dengan nuansa percaya diri.',
    front: {
      bgColor: '#0f172a',
      textColor: '#ffffff',
      secondaryTextColor: '#94a3b8',
      accentColor: '#f59e0b',
      borderColor: '#334155',
      fontFamily: 'Montserrat',
      borderRadius: 10,
      photoShape: 'circle',
    },
    back: {
      bgColor: '#1e293b',
      textColor: '#ffffff',
      secondaryTextColor: '#94a3b8',
      accentColor: '#f59e0b',
      borderColor: '#334155',
      fontFamily: 'Montserrat',
      borderRadius: 10,
    }
  }
];
