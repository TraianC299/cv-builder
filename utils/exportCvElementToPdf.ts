
import { jsPDF } from "jspdf";
import { toJpeg } from "html-to-image";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function mmToPx(mm: number, dpi = 96) {
  return Math.round((mm * dpi) / 25.4);
}

async function waitForImages(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) => {
      const el = img as HTMLImageElement;
      if (el.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        el.onload = () => resolve();
        el.onerror = () => resolve();
      });
    })
  );
}

export async function exportCvElementToPdf(
  element: HTMLElement,
  fileName = "cv.pdf"
) {
  // 1) Ensure images are loaded
  await waitForImages(element);

  // 2) Temporarily disable heavy visual effects (optional, helps size)
  const prevFilter = element.style.filter;
  const prevBoxShadow = (element.style as any).boxShadow;
  element.style.filter = "none";
  (element.style as any).boxShadow = "none";

  try {
    // Render at a controlled width close to A4 at ~150–200 DPI
    const targetDpi = 170; // lower (150) => smaller file, higher => sharper
    const pageWidthPx = mmToPx(A4_WIDTH_MM, targetDpi);

    const rect = element.getBoundingClientRect();
    const scale = pageWidthPx / rect.width;

    // Render the element to a single JPEG (controlled scale)
    const dataUrl = await toJpeg(element, {
      quality: 0.82, // 0.75–0.9
      backgroundColor: "#FFFFFF",
      pixelRatio: 1,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${rect.width}px`,
      },
      width: Math.round(rect.width * scale),
      height: Math.round(rect.height * scale),
    });

    // Load image to get exact pixel dimensions
    const img = new Image();
    img.src = dataUrl;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load rendered image"));
    });

    const imgWidthPx = img.naturalWidth;
    const imgHeightPx = img.naturalHeight;

    // Create A4 PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Paging math: map image px -> mm via width fit-to-page
    const imgWidthMm = A4_WIDTH_MM;
    const pxToMm = imgWidthMm / imgWidthPx;

    // How many image pixels fit into one A4 page height
    const pageHeightInPx = Math.floor(A4_HEIGHT_MM / pxToMm);

    // ✅ Fix blank last page caused by tiny leftover pixels
    const MIN_REMAINDER_PX = 30;

    let renderedPages = 0;

    for (let yPx = 0; yPx < imgHeightPx; yPx += pageHeightInPx) {
      const remainingPx = imgHeightPx - yPx;

      // If what's left is basically nothing, don't create a new page
      if (renderedPages > 0 && remainingPx <= MIN_REMAINDER_PX) break;

      if (renderedPages > 0) pdf.addPage();

      // Shift image up so the correct slice appears on current page
      const yMm = -(yPx * pxToMm);

      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        yMm,
        imgWidthMm,
        imgHeightPx * pxToMm,
        undefined,
        "FAST"
      );

      renderedPages++;
    }

    pdf.save(fileName);
  } finally {
    // restore styles
    element.style.filter = prevFilter;
    (element.style as any).boxShadow = prevBoxShadow;
  }
}