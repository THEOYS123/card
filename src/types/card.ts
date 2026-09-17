export type CardUnit = 'mm' | 'cm' | 'inch' | 'px';

export interface CardDimension {
  name: string;
  width: number;
  height: number;
  unit: CardUnit;
}

export type TemplateCategory =
  | 'FORMAL'
  | 'MINIMAL'
  | 'MODERN'
  | 'DARK'
  | 'LIGHT'
  | 'BUSINESS'
  | 'PERSONAL'
  | 'WALLET'
  | 'PORTFOLIO'
  | 'CREATIVE'
  | 'TECH'
  | 'CLASSIC';

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  whatsapp: string;
  showOnCard: boolean;
}

export interface WalletInfo {
  isWalletMode: boolean;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  domicile: string;
  foundMessage: string;
}

export interface CardPersonalData {
  fullName: string;
  nickname?: string;
  title?: string; // Sebutan / Pekerjaan
  pronouns?: string;
  birthDate?: string;
  birthPlace?: string;
  gender?: string;
  domicile?: string;
  city?: string;
  province?: string;
  country?: string;
  address?: string;
  postalCode?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  portfolio?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  threads?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
  discord?: string;
  youtube?: string;
  otherUrl?: string;
  cardIdNumber?: string; // e.g. MYID-X82K9
}

export interface CardProfileData {
  bio?: string;
  aboutMe?: string;
  profession?: string;
  skills?: string;
  company?: string;
  jobPosition?: string;
  education?: string;
  school?: string;
  university?: string;
  organization?: string;
  community?: string;
  hobbies?: string;
  languages?: string;
  quote?: string;
  notes?: string;
}

export type BackgroundType = 'solid' | 'gradient' | 'pattern' | 'image';

export interface CardDesignConfig {
  templateId: string;
  category: TemplateCategory;
  
  // Dimensions
  dimensionPreset: string;
  width: number;
  height: number;
  unit: CardUnit;
  
  // Colors
  bgColor: string;
  bgGradientEnd?: string;
  gradientAngle?: number;
  textColor: string;
  secondaryTextColor: string;
  accentColor: string;
  borderColor: string;
  cardOverlayColor: string;
  
  // Background style
  bgType: BackgroundType;
  bgPattern?: string; // 'dots' | 'grid' | 'waves' | 'lines' | 'none'
  bgImage?: string;
  bgOpacity: number; // 0 - 100
  bgBlur: number; // 0 - 20 px
  isGlassmorphism: boolean;

  // Typography
  fontFamily: string; // 'Inter' | 'Roboto' | 'Poppins' | 'Montserrat' | 'DM Sans' | 'Plus Jakarta Sans' | 'Nunito' | 'Space Grotesk'
  nameFontSize: number; // px
  textFontSize: number; // px
  
  // Photo settings
  photoSize: number; // px
  photoPositionX: number; // %
  photoPositionY: number; // %
  photoShape: 'circle' | 'rounded' | 'square';
  photoBorder: boolean;

  // Layout & Spacing
  padding: number; // px
  gap: number; // px
  margin: number; // px
  borderRadius: number; // px
  borderWidth: number; // px
  shadowIntensity: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // QR Code settings
  qrContent: 'cardUrl' | 'website' | 'whatsapp' | 'instagram' | 'custom';
  qrCustomUrl?: string;
  qrSize: number; // px
  qrMargin: number; // px
  qrColor: string;
  qrBgColor: string;
  
  // Guides
  showSafeArea: boolean;
  showBleed: boolean;
}

export interface CardModel {
  id: string;
  slug: string;
  isPublic: boolean;
  allowSearchEngine: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Side being edited/viewed
  activeSide: 'front' | 'back';
  
  // Data
  personal: CardPersonalData;
  profile: CardProfileData;
  emergency: EmergencyContact;
  wallet: WalletInfo;
  customFields: CustomField[];
  
  // Images
  photoUrl?: string;
  backPhotoUrl?: string;
  logoUrl?: string;
  
  // Designs
  frontDesign: CardDesignConfig;
  backDesign: CardDesignConfig;
}

export interface ReportItem {
  id: string;
  cardSlug: string;
  cardTitle: string;
  reason: 'spam' | 'impersonation' | 'abuse' | 'inappropriate' | 'other';
  details: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'dismissed';
}
