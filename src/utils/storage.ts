import { CardModel } from '../types/card';
import { DEFAULT_DESIGN_CONFIG } from './presets';

const LOCAL_STORAGE_KEY = 'myid_cards_v1';
const PUBLIC_CARDS_KEY = 'myid_public_cards_v1';

export function createInitialDemoCard(): CardModel {
  return {
    id: 'demo-card-01',
    slug: 'rendi-muhammad',
    isPublic: false,
    allowSearchEngine: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeSide: 'front',
    personal: {
      fullName: 'Rendi Muhammad',
      nickname: 'Rendi',
      title: 'Web Developer & UI Specialist',
      pronouns: 'he/him',
      birthDate: '1998-05-14',
      birthPlace: 'Bandung',
      gender: 'Laki-laki',
      domicile: 'Indonesia',
      city: 'Bandung',
      province: 'Jawa Barat',
      country: 'Indonesia',
      address: 'Jl. Dago Asri No. 42',
      postalCode: '40135',
      phone: '081234567890',
      whatsapp: '081234567890',
      email: 'rendi@example.com',
      website: 'https://example.com',
      portfolio: 'https://example.com/portfolio',
      instagram: '@rendimuh',
      tiktok: '@rendimuh',
      github: 'rendimuh',
      linkedin: 'rendimuhammad',
      telegram: '@rendimuh',
      cardIdNumber: 'MYID-X82K9',
    },
    profile: {
      bio: 'Fokus pada pengembangan aplikasi web performa tinggi & desain interaktif.',
      aboutMe: 'Pengembang perangkat lunak berpengalaman 5+ tahun dalam ekosistem React, TypeScript, dan Cloud.',
      profession: 'Software Engineer',
      skills: 'React, TypeScript, Node.js, Tailwind CSS, UI/UX',
      company: 'Tech Studio Indonesia',
      jobPosition: 'Senior Frontend Engineer',
      education: 'S1 Teknik Informatika',
      university: 'Universitas Komputer Indonesia',
      quote: 'Simple things should be simple, complex things should be possible.',
      notes: 'Jika kartu/dompet ini ditemukan, silakan hubungi pemilik melalui kontak di atas.',
    },
    emergency: {
      name: 'Budi Santoso',
      relationship: 'Saudara / Keluarga',
      phone: '081987654321',
      whatsapp: '081987654321',
      showOnCard: true,
    },
    wallet: {
      isWalletMode: true,
      ownerName: 'Rendi Muhammad',
      phone: '081234567890',
      whatsapp: '081234567890',
      email: 'rendi@example.com',
      domicile: 'Indonesia',
      foundMessage: 'Jika Anda menemukan kartu/dompet ini, silakan hubungi pemilik melalui nomor kontak tertera.',
    },
    customFields: [
      { id: 'cf-1', label: 'Golongan Darah', value: 'O+' },
      { id: 'cf-2', label: 'Status Vaksin', value: 'Booster 2' },
      { id: 'cf-3', label: 'Discord', value: 'rendi#1234' },
    ],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    backPhotoUrl: '',
    logoUrl: '',
    frontDesign: { ...DEFAULT_DESIGN_CONFIG },
    backDesign: {
      ...DEFAULT_DESIGN_CONFIG,
      bgColor: '#0f172a',
      accentColor: '#38bdf8',
    },
  };
}

export function getAllCards(): CardModel[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const demoCard = createInitialDemoCard();
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([demoCard]));
      } catch (e) {
        console.error('Failed to save initial demo card:', e);
      }
      return [demoCard];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load cards from localStorage:', err);
    return [createInitialDemoCard()];
  }
}

export function getCardById(id: string): CardModel | null {
  const cards = getAllCards();
  return cards.find((c) => c.id === id) || null;
}

export function saveCard(card: CardModel): CardModel {
  const cards = getAllCards();
  const index = cards.findIndex((c) => c.id === card.id);
  const updatedCard = {
    ...card,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    cards[index] = updatedCard;
  } else {
    cards.unshift(updatedCard);
  }

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
    if (updatedCard.isPublic) {
      syncPublicCard(updatedCard);
    }
  } catch (err) {
    console.error('Failed to save card to localStorage:', err);
  }

  return updatedCard;
}

export function deleteCard(id: string): void {
  const cards = getAllCards();
  const filtered = cards.filter((c) => c.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete card:', err);
  }
}

export function duplicateCard(id: string): CardModel | null {
  const source = getCardById(id);
  if (!source) return null;

  const newId = 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  const newSlug = `${source.slug || 'card'}-${Math.floor(1000 + Math.random() * 9000)}`;

  const copy: CardModel = {
    ...source,
    id: newId,
    slug: newSlug,
    isPublic: false,
    personal: {
      ...source.personal,
      fullName: `${source.personal.fullName} (Copy)`,
      cardIdNumber: `MYID-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return saveCard(copy);
}

export function syncPublicCard(card: CardModel): void {
  try {
    const raw = localStorage.getItem(PUBLIC_CARDS_KEY);
    const publicList: CardModel[] = raw ? JSON.parse(raw) : [];
    const idx = publicList.findIndex((c) => c.slug === card.slug || c.id === card.id);

    if (card.isPublic) {
      if (idx >= 0) {
        publicList[idx] = card;
      } else {
        publicList.push(card);
      }
    } else if (idx >= 0) {
      publicList.splice(idx, 1);
    }

    localStorage.setItem(PUBLIC_CARDS_KEY, JSON.stringify(publicList));
  } catch (err) {
    console.error('Failed syncing public card:', err);
  }
}

export function getPublicCardBySlug(slug: string): CardModel | null {
  try {
    const raw = localStorage.getItem(PUBLIC_CARDS_KEY);
    if (!raw) {
      // Check local cards fallback
      const localCards = getAllCards();
      const match = localCards.find((c) => c.slug === slug && c.isPublic);
      return match || null;
    }
    const publicList: CardModel[] = JSON.parse(raw);
    const found = publicList.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    if (found) return found;

    // Check fallback in local cards
    const localCards = getAllCards();
    return localCards.find((c) => c.slug.toLowerCase() === slug.toLowerCase() && c.isPublic) || null;
  } catch (err) {
    console.error('Failed reading public card:', err);
    return null;
  }
}

// Export backup file (.myid or .json)
export function exportCardBackup(card: CardModel): void {
  const exportData = {
    app: 'MYID',
    version: '1.0',
    exportDate: new Date().toISOString(),
    card,
  };

  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${card.personal.fullName || 'card'}-myid-backup.myid`;
  a.download = fileName.toLowerCase().replace(/[^a-z0-9._-]/gi, '-');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import backup file
export async function importCardBackup(file: File): Promise<CardModel> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        
        let cardData: CardModel;
        if (parsed.card && parsed.app === 'MYID') {
          cardData = parsed.card;
        } else if (parsed.personal && parsed.frontDesign) {
          cardData = parsed;
        } else {
          throw new Error('Format file backup .myid tidak valid.');
        }

        // Generate new ID for imported card to prevent accidental overwrite
        cardData.id = 'imported_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        cardData.isPublic = false; // Import defaults to private
        cardData.slug = `${cardData.slug || 'imported'}-${Math.floor(1000 + Math.random() * 9000)}`;

        const saved = saveCard(cardData);
        resolve(saved);
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Gagal membaca file backup.'));
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file backup.'));
    reader.readAsText(file);
  });
}
