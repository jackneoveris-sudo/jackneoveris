// ============================================================
// reader.js — Custom PDF.js viewer wired to our toolbar
// Uses pdfjs-dist 5.3.93 viewer components.
// ============================================================

import * as pdfjsLib from "./pdfjs/build/pdf.min.mjs";
import {
  EventBus,
  PDFLinkService,
  PDFFindController,
  PDFViewer,
} from "./pdfjs/web/pdf_viewer.mjs";

// Tell the fail-loud guard in reader.html that the module loaded and ran.
// If the imports above fail (usually a .mjs MIME-type problem on the host),
// this line never executes, the flag stays false, and reader.html shows an
// explanation instead of hanging on "Opening the book…" forever.
window.__readerModuleStarted = true;

// --- Configuration --------------------------------------------------------

const PDF_URL = "creating-ethics.pdf";
const PDFJS_BASE = "pdfjs/";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_BASE + "build/pdf.worker.min.mjs";

const CMAP_URL = PDFJS_BASE + "cmaps/";
const STANDARD_FONT_URL = PDFJS_BASE + "standard_fonts/";

// --- DOM references -------------------------------------------------------

const $ = (id) => document.getElementById(id);

const container = $("viewer-container");
const viewerEl = $("viewer");
const root = $("reader-root");

const prevBtn = $("prev-page");
const nextBtn = $("next-page");
const pageInput = $("page-input");
const pageTotal = $("page-total");

const findToggleBtn = $("toggle-find");
const findBar = $("find-bar");
const findInput = $("find-input");
const findPrevBtn = $("find-prev");
const findNextBtn = $("find-next");
const findCloseBtn = $("find-close");
const findStatus = $("find-status");

const tocToggleBtn = $("toggle-toc");
const tocSidebar = $("toc-sidebar");
const tocList = $("toc-list");

const zoomSelect = $("zoom-select");
const zoomInBtn = $("zoom-in");
const zoomOutBtn = $("zoom-out");

const loadingOverlay = $("loading-overlay");
const loadingProgress = $("loading-progress");

// --- Core viewer setup ----------------------------------------------------

const eventBus = new EventBus();

const linkService = new PDFLinkService({ eventBus });

const findController = new PDFFindController({
  eventBus,
  linkService,
});

const pdfViewer = new PDFViewer({
  container,
  viewer: viewerEl,
  eventBus,
  linkService,
  findController,
  textLayerMode: 2, // ENABLE — gives us selectable text + find
  removePageBorders: false,
  pageColors: { background: "#fbf8ef", foreground: "#2a1f14" },
});

linkService.setViewer(pdfViewer);

// --- Load the PDF ---------------------------------------------------------

const loadingTask = pdfjsLib.getDocument({
  url: PDF_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: true,
  standardFontDataUrl: STANDARD_FONT_URL,
  pageColors: { background: "#fbf8ef", foreground: "#2a1f14" },
});

loadingTask.onProgress = ({ loaded, total }) => {
  if (total) {
    const pct = Math.min(100, (loaded / total) * 100);
    loadingProgress.style.width = pct + "%";
  }
};

loadingTask.promise
  .then((pdfDocument) => {
    pdfViewer.setDocument(pdfDocument);
    linkService.setDocument(pdfDocument, null);

    pageTotal.textContent = pdfDocument.numPages;
    pageInput.max = pdfDocument.numPages;

    // Build table of contents from the PDF's outline
    pdfDocument.getOutline().then(buildTOC);
  })
  .catch((err) => {
    console.error("PDF load failed:", err);
    loadingOverlay.querySelector("p").textContent =
      "The book could not be loaded. Please try refreshing.";
  });

// --- Viewer events --------------------------------------------------------

eventBus.on("pagesinit", () => {
  // Set initial zoom — auto fits to the container
  pdfViewer.currentScaleValue = "auto";
});

eventBus.on("pagesloaded", () => {
  loadingOverlay.classList.add("hidden");
  setTimeout(() => {
    loadingOverlay.style.display = "none";
  }, 500);
});

eventBus.on("pagechanging", ({ pageNumber }) => {
  pageInput.value = pageNumber;
  prevBtn.disabled = pageNumber <= 1;
  nextBtn.disabled = pageNumber >= pdfViewer.pagesCount;
});

eventBus.on("scalechanging", ({ scale, presetValue }) => {
  if (presetValue) {
    zoomSelect.value = presetValue;
  } else {
    // Custom scale — find nearest preset or show percentage
    const pctValue = scale.toFixed(2);
    const opt = Array.from(zoomSelect.options).find((o) => o.value === pctValue);
    if (opt) zoomSelect.value = pctValue;
  }
});

// Find result status feedback
eventBus.on("updatefindcontrolstate", ({ state, matchesCount }) => {
  updateFindStatus(state, matchesCount);
});
eventBus.on("updatefindmatchescount", ({ matchesCount }) => {
  updateFindStatus(0, matchesCount); // FOUND
});

function updateFindStatus(state, matchesCount) {
  const FOUND = 0, NOT_FOUND = 1, WRAPPED = 2, PENDING = 3;
  if (state === PENDING) {
    findStatus.textContent = "Searching…";
  } else if (state === NOT_FOUND) {
    findStatus.textContent = "Not found";
  } else if (matchesCount && matchesCount.total > 0) {
    findStatus.textContent = `${matchesCount.current} of ${matchesCount.total}`;
  } else {
    findStatus.textContent = "";
  }
}

// --- Page navigation ------------------------------------------------------

prevBtn.addEventListener("click", () => {
  if (pdfViewer.currentPageNumber > 1) {
    pdfViewer.currentPageNumber -= 1;
  }
});

nextBtn.addEventListener("click", () => {
  if (pdfViewer.currentPageNumber < pdfViewer.pagesCount) {
    pdfViewer.currentPageNumber += 1;
  }
});

pageInput.addEventListener("change", () => {
  const n = parseInt(pageInput.value, 10);
  if (Number.isFinite(n) && n >= 1 && n <= pdfViewer.pagesCount) {
    pdfViewer.currentPageNumber = n;
  } else {
    pageInput.value = pdfViewer.currentPageNumber;
  }
});

pageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    pageInput.blur(); // triggers change
  }
});

// --- Zoom controls --------------------------------------------------------

zoomSelect.addEventListener("change", () => {
  const v = zoomSelect.value;
  // Preset strings: auto, page-fit, page-width — pass as-is
  // Numeric strings: convert to float
  if (["auto", "page-fit", "page-width"].includes(v)) {
    pdfViewer.currentScaleValue = v;
  } else {
    pdfViewer.currentScale = parseFloat(v);
  }
});

zoomInBtn.addEventListener("click", () => {
  pdfViewer.currentScale = Math.min(4, pdfViewer.currentScale * 1.15);
});

zoomOutBtn.addEventListener("click", () => {
  pdfViewer.currentScale = Math.max(0.25, pdfViewer.currentScale / 1.15);
});

// --- Find (search) --------------------------------------------------------

function openFind() {
  findBar.hidden = false;
  findToggleBtn.classList.add("active");
  findInput.focus();
  findInput.select();
}

function closeFind() {
  findBar.hidden = true;
  findToggleBtn.classList.remove("active");
  // Clear any current search highlights
  eventBus.dispatch("find", {
    source: window,
    type: "",
    query: "",
    caseSensitive: false,
    entireWord: false,
    highlightAll: false,
    findPrevious: false,
  });
  findStatus.textContent = "";
}

findToggleBtn.addEventListener("click", () => {
  if (findBar.hidden) openFind();
  else closeFind();
});

findCloseBtn.addEventListener("click", closeFind);

let findTimeout = null;
findInput.addEventListener("input", () => {
  clearTimeout(findTimeout);
  findTimeout = setTimeout(() => {
    eventBus.dispatch("find", {
      source: window,
      type: "",
      query: findInput.value,
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
      findPrevious: false,
    });
  }, 200);
});

findInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    eventBus.dispatch("find", {
      source: window,
      type: "again",
      query: findInput.value,
      caseSensitive: false,
      entireWord: false,
      highlightAll: true,
      findPrevious: e.shiftKey,
    });
  } else if (e.key === "Escape") {
    closeFind();
  }
});

findNextBtn.addEventListener("click", () => {
  eventBus.dispatch("find", {
    source: window,
    type: "again",
    query: findInput.value,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: false,
  });
});

findPrevBtn.addEventListener("click", () => {
  eventBus.dispatch("find", {
    source: window,
    type: "again",
    query: findInput.value,
    caseSensitive: false,
    entireWord: false,
    highlightAll: true,
    findPrevious: true,
  });
});

// --- Table of Contents ----------------------------------------------------

function buildTOC(outline) {
  if (!outline || outline.length === 0) {
    tocList.innerHTML = '<p class="toc-empty">No table of contents in this document.</p>';
    return;
  }

  tocList.innerHTML = "";
  renderOutlineLevel(outline, 1, tocList);
}

function renderOutlineLevel(items, level, parent) {
  items.forEach((item) => {
    const link = document.createElement("a");
    link.href = "#";
    link.className = "toc-level-" + Math.min(level, 3);
    link.textContent = item.title;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (item.dest) {
        linkService.goToDestination(item.dest);
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 720) {
          closeTOC();
        }
      }
    });
    parent.appendChild(link);

    if (item.items && item.items.length > 0) {
      renderOutlineLevel(item.items, level + 1, parent);
    }
  });
}

function openTOC() {
  tocSidebar.hidden = false;
  root.classList.add("sidebar-open");
  tocToggleBtn.classList.add("active");
}

function closeTOC() {
  tocSidebar.hidden = true;
  root.classList.remove("sidebar-open");
  tocToggleBtn.classList.remove("active");
}

tocToggleBtn.addEventListener("click", () => {
  if (tocSidebar.hidden) openTOC();
  else closeTOC();
});

// --- Keyboard shortcuts ---------------------------------------------------

document.addEventListener("keydown", (e) => {
  // Skip if user is typing in an input
  if (e.target.matches("input, textarea")) return;

  switch (e.key) {
    case "ArrowLeft":
    case "PageUp":
      if (pdfViewer.currentPageNumber > 1) {
        pdfViewer.currentPageNumber -= 1;
      }
      e.preventDefault();
      break;
    case "ArrowRight":
    case "PageDown":
      if (pdfViewer.currentPageNumber < pdfViewer.pagesCount) {
        pdfViewer.currentPageNumber += 1;
      }
      e.preventDefault();
      break;
    case "Home":
      pdfViewer.currentPageNumber = 1;
      e.preventDefault();
      break;
    case "End":
      pdfViewer.currentPageNumber = pdfViewer.pagesCount;
      e.preventDefault();
      break;
    case "/":
    case "f":
      if (e.ctrlKey || e.metaKey || e.key === "/") {
        e.preventDefault();
        openFind();
      }
      break;
    case "Escape":
      if (!findBar.hidden) closeFind();
      else if (!tocSidebar.hidden) closeTOC();
      break;
  }
});

// --- Window resize re-flow ------------------------------------------------

let resizeTimeout = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Re-apply current scale to recompute auto-fit
    if (pdfViewer.currentScaleValue === "auto" ||
        pdfViewer.currentScaleValue === "page-fit" ||
        pdfViewer.currentScaleValue === "page-width") {
      const v = pdfViewer.currentScaleValue;
      pdfViewer.currentScaleValue = v;
    }
  }, 200);
});
