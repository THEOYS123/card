import { CardPersonalData, CardProfileData, EmergencyContact } from '../types/card';

export function generateVCard(
  personal: CardPersonalData,
  profile?: CardProfileData,
  emergency?: EmergencyContact
): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${personal.fullName || 'Kontak MYID'}`,
  ];

  if (personal.fullName) {
    const parts = personal.fullName.split(' ');
    const lastName = parts.length > 1 ? parts.pop() : '';
    const firstName = parts.join(' ');
    lines.push(`N:${lastName};${firstName};;;`);
  }

  if (personal.title) {
    lines.push(`TITLE:${personal.title}`);
  }

  if (profile?.company) {
    lines.push(`ORG:${profile.company}`);
  }

  if (personal.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE:${personal.phone}`);
  } else if (personal.whatsapp) {
    lines.push(`TEL;TYPE=CELL,VOICE:${personal.whatsapp}`);
  }

  if (personal.email) {
    lines.push(`EMAIL;TYPE=INTERNET,PREF:${personal.email}`);
  }

  if (personal.website) {
    lines.push(`URL:${personal.website}`);
  }

  if (personal.address || personal.city || personal.country) {
    const street = personal.address || '';
    const city = personal.city || '';
    const province = personal.province || '';
    const zip = personal.postalCode || '';
    const country = personal.country || personal.domicile || '';
    lines.push(`ADR;TYPE=HOME:;;${street};${city};${province};${zip};${country}`);
  }

  if (profile?.bio) {
    lines.push(`NOTE:${profile.bio.replace(/\n/g, ' ')}`);
  }

  // Add Emergency Contact as secondary phone note if available
  if (emergency?.showOnCard && emergency.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE;X-LABEL="Kontak Darurat (${emergency.name || 'Darurat'})":${emergency.phone}`);
  }

  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export function downloadVCard(
  personal: CardPersonalData,
  profile?: CardProfileData,
  emergency?: EmergencyContact
): void {
  const vcfContent = generateVCard(personal, profile, emergency);
  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = `${personal.fullName || 'kontak'}.vcf`
    .toLowerCase()
    .replace(/[^a-z0-9._-]/gi, '-');
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
