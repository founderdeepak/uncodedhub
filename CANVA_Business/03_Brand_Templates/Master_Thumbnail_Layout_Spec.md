# Uncoded Hub — Master Canva Thumbnail Layout Specification

This blueprint contains the exact pixel coordinates, layer stack, and Canva object properties to construct the master **1600 × 900 px** Uncoded Hub blog thumbnail template in Canva Business.

---

## 1. Canvas Dimensions & Ratios
- **Overall Dimensions**: `1600 px` width × `900 px` height (16:9 widescreen)
- **Resolution**: 300 DPI equivalent / Crisp Retina export
- **Split Ratio**: Vertical 60/40 Split

```
(0,0)                                                     (1600,0)
+------------------------------------------------------------+
|                                                            |
|                                                            |
|               LAYER 1: TOP ARTWORK FRAME                   |
|               X: 0, Y: 0, W: 1600, H: 540                  |
|                                                            |
|                                                            |
+------------------------------------------------------------+ (0,540)
|                                            |               |
|         LAYER 2: BOTTOM LEFT CARD          |   LAYER 3:    |
|         X: 0, Y: 540, W: 1120, H: 360      |  RIGHT PANEL  |
|                                            | X: 1120, Y:540|
|  [Eyebrow Tag]     (Y: 580)                | W: 480, H: 360|
|  [Article Title]   (Y: 620, W: 960)        | [SVG Icon]    |
|  [Reading Time]    (Y: 820)                | [Sub-Label]   |
|                                            |               |
+------------------------------------------------------------+ (1600,900)
                                             ^
                                       1px Divider Line
                                         (X: 1120 px)
```

---

## 2. Layer-by-Layer Coordinate Guide for Canva

### 🖼️ Layer 1: Top Artwork Frame (Top 60%)
- **Object Type**: Canva Image Grid / Frame (Rectangle)
- **Position**: `X: 0 px`, `Y: 0 px`
- **Size**: `Width: 1600 px`, `Height: 540 px`
- **Content**: Generated architectural maquette / tactile photograph.
- **Canva Setting**: Lock position once placed.

---

### 🔲 Layer 2: Bottom Editorial Split Card (Bottom 40%)
- **Object Type**: Shape (Rectangle)
- **Position**: `X: 0 px`, `Y: 540 px`
- **Size**: `Width: 1600 px`, `Height: 360 px`
- **Fill Color**: `#FBFBF9` (Limestone Off-White) or Niche Card Fill (e.g. `#F5F2EB` for Interior Design)
- **Border**: None

---

### 📏 Layer 3: 1px Vertical Divider Line
- **Object Type**: Line
- **Position**: `X: 1120 px`, `Y: 540 px`
- **Length**: `360 px` (vertical line extending to `Y: 900 px`)
- **Stroke**: `1 px` solid `#E5E5E0` (Hairline Divider)

---

### 🏷️ Layer 4: Eyebrow / Silo Category Tag
- **Object Type**: Text Box
- **Position**: `X: 80 px`, `Y: 580 px`
- **Width**: `960 px`
- **Font**: `Space Mono` (Bold) or `Montserrat` (Bold)
- **Size**: `16 px`
- **Letter Spacing**: `+160` (ALL CAPS)
- **Color**: Niche Accent Color (e.g., `#B8860B`)
- **Alignment**: Left
- **Example Content**: `INTERIOR ARCHITECTURE • HIGH-TICKET ACQUISITION`

---

### 📰 Layer 5: Article Headline
- **Object Type**: Text Box
- **Position**: `X: 80 px`, `Y: 620 px`
- **Width**: `960 px`
- **Font**: `Cormorant Garamond` (Bold)
- **Size**: `56 px – 64 px` (Auto-wrap up to 3 lines)
- **Line Spacing**: `1.15`
- **Letter Spacing**: `-20`
- **Color**: `#111111` (Matte Obsidian)
- **Alignment**: Left
- **Example Content**: `How Top Interior Designers Win $100K+ Projects With Precision Web Architecture`

---

### ⏱️ Layer 6: Read Time & Studio Stamp
- **Object Type**: Text Box
- **Position**: `X: 80 px`, `Y: 825 px`
- **Width**: `960 px`
- **Font**: `Inter` (Medium)
- **Size**: `18 px`
- **Letter Spacing**: `+30`
- **Color**: `#6B7280` (Architectural Stone Gray)
- **Alignment**: Left
- **Content**: `7 MIN READ  •  UNCODED HUB ARCHITECTURE`

---

### 🎨 Layer 7: Right-Panel Geometric Vector Icon
- **Object Type**: Custom SVG Vector (Uploaded from `CANVA_Business/10_Icons/`)
- **Position**: Center aligned horizontally in right panel (`X: 1360 px`), vertically at `Y: 690 px`
- **Size**: `120 px × 120 px`
- **Color Fill / Stroke**: Niche Accent Color or `#111111`
- **SVG File by Niche**:
  - Interior Design: `golden-ratio.svg`
  - Real Estate: `cadastral-grid.svg`
  - Dental Clinics: `medical-crosshair.svg`
  - Wedding Photographers: `aperture-blades.svg`
  - Home Renovation: `cabinet-joinery.svg`
  - Executive Coaches: `decision-matrix.svg`
  - Core Web Performance: `terminal-speed.svg`

---

### 🔤 Layer 8: Right-Panel Monospace Sub-Label
- **Object Type**: Text Box
- **Position**: Center aligned under icon (`X: 1360 px`), `Y: 795 px`
- **Font**: `Space Mono` (ALL CAPS)
- **Size**: `13 px`
- **Letter Spacing**: `+200`
- **Color**: `#6B7280`
- **Example Content**: `ARCH.GOLDEN-RATIO.V1`

---

## 3. How to Save as a Brand Template in Canva Business
1. Once assembled and aligned, click **Share** in the top right.
2. Select **More > Brand Template**.
3. Choose your Uncoded Hub Brand Kit folder.
4. Set edit permissions so team members can copy the template and replace text without disrupting the base grid.
