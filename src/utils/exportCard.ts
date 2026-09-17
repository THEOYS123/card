import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { CardDesignConfig } from '../types/card';

/**
 * Downloads a DOM element as PNG image.
 */
export async function exportElementAsPNG(
  element: HTMLElement,
  filename = 'myid-card.png'
): Promise<void> {
  try {
    const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to export card as PNG:', err);
    throw err;
  }
}

/**
 * Downloads a DOM element as JPG image.
 */
export async function exportElementAsJPG(
  element: HTMLElement,
  filename = 'myid-card.jpg'
): Promise<void> {
  try {
    const dataUrl = await toJpeg(element, { cacheBust: true, quality: 0.95, pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to export card as JPG:', err);
    throw err;
  }
}

/**
 * Exports DOM element to PDF using real millimeter dimensions (e.g. 85.6mm x 53.98mm).
 */
export async function exportElementAsPDF(
  element: HTMLElement,
  design: CardDesignConfig,
  filename = 'myid-card.pdf'
): Promise<void> {
  try {
    const widthMm = design.unit === 'mm' ? design.width : 85.6;
    const heightMm = design.unit === 'mm' ? design.height : 53.98;
    const orientation = widthMm >= heightMm ? 'landscape' : 'portrait';

    const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 4 });

    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: [widthMm, heightMm],
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, widthMm, heightMm);
    pdf.save(filename);
  } catch (err) {
    console.error('Failed to export card as PDF:', err);
    throw err;
  }
}

/**
 * Generates an A4 / A5 / Letter print sheet PDF containing multiple card copies.
 */
export async function generatePrintSheetPDF(
  element: HTMLElement,
  paperFormat: 'a4' | 'a5' | 'letter' = 'a4',
  cardWidthMm = 85.6,
  cardHeightMm = 53.98,
  includeCropMarks = true
): Promise<void> {
  try {
    const imgDataUrl = await toPng(element, { cacheBust: true, pixelRatio: 3 });
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: paperFormat,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const marginX = 15;
    const marginY = 15;
    const gapX = 6;
    const gapY = 6;

    const availableW = pageWidth - marginX * 2;
    const availableH = pageHeight - marginY * 2;

    const cols = Math.floor((availableW + gapX) / (cardWidthMm + gapX));
    const rows = Math.floor((availableH + gapY) / (cardHeightMm + gapY));

    const totalWidth = cols * cardWidthMm + (cols - 1) * gapX;
    const totalHeight = rows * cardHeightMm + (rows - 1) * gapY;

    const startX = (pageWidth - totalWidth) / 2;
    const startY = (pageHeight - totalHeight) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * (cardWidthMm + gapX);
        const y = startY + r * (cardHeightMm + gapY);

        pdf.addImage(imgDataUrl, 'PNG', x, y, cardWidthMm, cardHeightMm);

        if (includeCropMarks) {
          pdf.setDrawColor(180, 180, 180);
          pdf.setLineWidth(0.2);
          // Crop lines
          pdf.line(x - 3, y, x, y);
          pdf.line(x, y - 3, x, y);
          pdf.line(x + cardWidthMm, y - 3, x + cardWidthMm, y);
          pdf.line(x + cardWidthMm, y, x + cardWidthMm + 3, y);
          pdf.line(x - 3, y + cardHeightMm, x, y + cardHeightMm);
          pdf.line(x, y + cardHeightMm, x, y + cardHeightMm + 3);
          pdf.line(x + cardWidthMm, y + cardHeightMm, x + cardWidthMm + 3, y + cardHeightMm);
          pdf.line(x + cardWidthMm, y + cardHeightMm, x + cardWidthMm, y + cardHeightMm + 3);
        }
      }
    }

    pdf.save(`myid-print-sheet-${paperFormat}.pdf`);
  } catch (err) {
    console.error('Failed generating print sheet:', err);
    throw err;
  }
}
