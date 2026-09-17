import QRCode from 'qrcode';

export async function generateQRCodeDataUrl(
  text: string,
  options?: {
    color?: string;
    bgColor?: string;
    margin?: number;
    width?: number;
  }
): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: options?.width || 256,
      margin: options?.margin ?? 1,
      color: {
        dark: options?.color || '#000000',
        light: options?.bgColor || '#ffffff00', // transparent by default if rgba
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed generating QR Code:', err);
    return '';
  }
}

export function downloadQRCodePNG(dataUrl: string, fileName = 'qr-code.png'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
