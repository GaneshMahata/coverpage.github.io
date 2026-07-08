# Academic Cover Page & GIPEDI Internship Report Designer

A professional, high-fidelity, interactive cover page designer optimized for academic, research, and corporate internship reports. Built using **React**, **Vite**, **TypeScript**, and styled with **Tailwind CSS**, this tool enables students and researchers to craft pixel-perfect, print-ready cover sheets directly within a live A4 layout.

---

## 🚀 Core Features

### 1. Unified Internship Details Table
*   **Invisible/Transparent Borders:** Retains the high-fidelity tabular formatting requested in traditional academic cover pages (such as IIT Delhi GIPEDI guidelines) without distracting table lines.
*   **Inline Editing & Customization:** Double-click or click-to-select table cells in the active layout to modify text natively.
*   **Cell-Level Font Decor (Bold/Regular):** Easily toggle bold attributes independently for labels (e.g., *Intern Name:*) and values (e.g., *Karuna Sharma*) via a dedicated row action panel.
*   **Draggable Row Ordering:** Effortlessly reorder rows, add new key-value parameters, or remove redundant attributes.

### 2. High-Fidelity A4 Layout Preview
*   **True-to-Scale Canvas:** Maintains perfect A4 vertical aspect ratio (210mm × 297mm) through dynamic resizing observers.
*   **Drag-and-Drop & Rotation Engines:** Direct interactive dragging with locking systems, smooth $\theta$-degree rotation selectors, and fine-tuning width sliders.
*   **Custom Vector Branding:** Pre-loaded with premium academic SVG vectors (including a custom red emblem representing the IIT Delhi design) and supports instant, custom high-resolution logo uploads.

### 3. Comprehensive Customization Sidebars
*   **Dynamic Data Syncing:** Form sidebars capture all metadata—including Intern ID, Mentor Name, Supervisor Name, Project Dates, and Department details—and automatically update the active template blocks.
*   **A4 Spacing Control:** Seamlessly switch between margins (None, Narrow, Normal, Wide) and parchment backing textures (pure white, soft cream, academic tint).
*   **Typography Controls:** Premium font pairings (Lora, Inter, Space Grotesk, JetBrains Mono, Playfair Display) with adjustable scale, alignment, line heights, and hex color values.

### 4. Direct Print & PDF Exports
*   Built-in high-fidelity CSS print targets optimize page breaks and hide interface elements (`no-print`), producing a pristine, single-page PDF with correct margin-collapsing behaviors.

---

## 🛠️ Technology Stack

*   **Framework:** React 18+ with TypeScript
*   **Build System:** Vite
*   **Styling:** Tailwind CSS (Modern `@import` layout syntax)
*   **Icons:** Lucide React
*   **Animations:** Smooth framer/motion animations for layout adjustments

---

## 📦 Directory Structure

```text
├── README.md               # Project documentation and details
├── package.json            # Active npm dependencies and build scripts
├── src/
│   ├── main.tsx            # Main application entry point
│   ├── App.tsx             # Master application root and state orchestrator
│   ├── index.css           # Global CSS variables, custom printing styles, and Tailwind
│   ├── types.ts            # Centralized TypeScript definitions (ElementType, PageElement, TableRow, etc.)
│   ├── data.ts             # Default parameters, custom SVG vectors, and IIT-Delhi GIPEDI templates
│   ├── components/
│   │   ├── A4Preview.tsx   # Core scaling interactive workspace and draggable table canvas
│   │   ├── FormSidebar.tsx # Left-hand template input sidebar (Metadata, Dates, Names)
│   │   ├── StyleSidebar.tsx# Right-hand layout formatting tools (Cell toggles, typography, colors)
│   │   └── Header.tsx      # Top controls, template presets selector, and printing triggers
```

---

## 🏃 Getting Started

### Prerequisites

*   **Node.js:** Ensure Node.js (v18+) is installed.

### Installation & Execution

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the local development server:**
    ```bash
    npm run dev
    ```

3.  **Build the production bundle:**
    ```bash
    npm run build
    ```

4.  **Start the compiled production app:**
    ```bash
    npm run start
    ```

---

## 💡 Print & PDF Generation Tips

To generate the perfect, boundary-free PDF from your web browser:
1. Click the **"Export PDF / Print"** button in the header toolbar.
2. In the Print Settings panel, set **Destination** as *Save as PDF*.
3. Change **Layout** to *Portrait*.
4. Under **More Settings**:
    *   Set **Paper Size** to *A4*.
    *   Set **Margins** to *None* (or *Default* since the template embeds its own native margin-padding system).
    *   Enable **Background graphics** to preserve parchment textures and custom vector colors.
