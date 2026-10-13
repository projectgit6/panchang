# Surya Chandra Vedic Jyotish - Astronomical Ephemeris & Panchang Suite

A comprehensive, production-grade Vedic Jyotish platform and ephemeris calculation engine delivering authentic Drik Siddhanta calculations, Daily Panchangam, Monthly Hindu Calendar with Graha Gochar transits, 36 Guna Kundli Milan matchmaking, Hindu Festivals & Vrat Directory with step-by-step Shodashopachara Puja Vidhi, and an enterprise Admin CMS with regional city overrides, astronomical engine calibration, and cache orchestration.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were skipped; the application is proceeding with the recommended full-fidelity architecture aligned with the provided screens and Drik Ganita standards.

- **Primary Landing Screen**: Defaulting to the **Daily Panchang** featuring the dynamic Sun and Moon solar arc telemetry, 5 limbs of Panchang, Shubh/Ashubh intervals, and real-time Day & Night Choghadiya tables.
- **Top Navigation & Screen Routing**: Persistent, responsive navigation between all 6 primary sections:
  1. `Daily Panchang`
  2. `Monthly Calendar`
  3. `Muhurat & Choghadiya`
  4. `Kundli Matching`
  5. `Festivals`
  6. `Admin CMS` (with 5 sub-modules: Festival Catalog, Puja Vidhi Editor, Regional City Directory, Astronomical Ephemeris Settings, Automation & Cache)
- **Horoscope Chart Rendering**: Both North Indian (diamond) and South Indian (grid) chart visualizations with instant interactive toggle in Kundli Matching.
- **Astronomical Precision & Geographic Adaptability**: Interactive location selector (New Delhi, Varanasi, Ujjain, Mumbai, London, New York, Rameshwaram, etc.) and date selector (`Today`, `Yesterday`, `Tomorrow`, and custom date picker) dynamically updating solar midday, sunrise/sunset, tithi, and muhurat spans.

---

## 1. Overview & Core Concept

**Surya Chandra Vedic Jyotish** unites timeless Sanskrit astronomical tradition (Drik Ganita per Lahiri/Chitrapaksha Ayanamsha) with modern astronomical ephemeris computing. It provides astrologers, temples, priests, and everyday practitioners with pinpoint celestial timings and sacred ceremonial guidance.

### Key Capabilities
1. **Dainik Panchangam (Daily Ephemeris)**:
   - Dynamic SVG solar and lunar arc telemetry (Sunrise, Sunset, Solar Noon, Day Length, Moonrise, Moonset, Lunar illumination index).
   - The 5 Limbs: Tithi, Nakshatra, Yoga, Karana, and Vara with progress bars, end times, deities, and ruling planets.
   - Auspicious (Abhijit, Amrit, Brahma, Vijaya, Godhuli) and Inauspicious (Rahu Kaalam, Yamaganda, Gulika, Dur Muhurat, Varjyam) intervals.
   - Interactive 8-Fold Choghadiya table with Day (Divasa) and Night (Ratri) tabs, indicating ruling planets and recommended activities.
   - Disha Shool direction prohibitions, Tara Bala, and daily deity/mantra sadhana.
2. **Monthly Calendar & Planetary Transits**:
   - Monthly grid & list views with era headers (Vikram Samvat 2081, Shaka 1946, Dakshinayana, Hemanta Ritu).
   - System switch between **Purnimanta (North India)** and **Amanta (South & Western India)**.
   - Interactive category filter chips (All Events, Major Festivals, Ekadashi Vrats, Purnima/Amavasya, Pradosh, Sankranti/Gochar).
   - Vrat & Muhurat Spotlight (Diwali Lakshmi Puja, Devutthana Ekadashi, Dev Deepawali).
   - Graha Gochar (Planetary Transits) card tracking Sun, Venus, Saturn, and Jupiter transits.
3. **Kundli Milan & Ashtakoota 36 Guna Matching**:
   - Dual birth details for Var (Boy) and Kanya (Girl) with quick profile swap.
   - 36 Guna Ashtakoota scorecard across all 8 Kootas: Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi.
   - Circular score dial gauge (28/36 Uttam Milan) with Shadvarga diagnostic verdict.
   - Side-by-side Lagna and Navamsha charts supporting both North Indian diamond and South Indian box representations.
   - In-depth Manglik Dosha evaluation with classical cancellation rules (Dosha Bhanga).
   - Comparative planetary position table and specific Vedic Upaye (mantras, daana, and gemstones).
4. **Hindu Festivals & Vrat Directory**:
   - Month and category filtered festival index with search and Vrat-only toggle.
   - Detailed festival spotlight (Diwali Lakshmi Puja) with high-definition sacred imagery.
   - Precise Shubh Muhurat intervals (Pradosh Kaal, Maha Nishita Kaal, Choghadiya).
   - Comprehensive 6-step Shodashopachara Puja Vidhi, Sanskrit stotram recitations, Samagri checklist tags, and fasting rules (Vrat Niyam).
5. **Admin CMS & Ephemeris Calculation Console**:
   - **Festival Catalog & Muhurat Schedules**: Master-detail editor for Shastric annotations and regional city overrides.
   - **Puja Vidhi & Mantra Editor**: Drag-and-drop ritual steps builder.
   - **Regional City Directory & Geolocation**: Manage 4,520 cities, bulk CSV import/export panel, and interactive Add City modal.
   - **Astronomical Ephemeris Settings**: Configure Swiss Ephemeris (SE1), Surya Siddhanta, Lahiri Ayanamsha DMS offset, solar disc refraction models, and node motions (True vs Mean Rahu/Ketu) with live diagnostic sandbox.
   - **Automation, Redis Cache & Cron Orchestration**: Redis cluster metrics, TTL policies, automated 00:00 IST midnight cron pipeline, and predictive festival pre-warm telemetry.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Design Constitution**: Follows the **Vedic Celestial Luminary** system specified in the design guidelines.
- **Palette**:
  - `Canvas / Surface`: `#faf8ff` (luminous parchment white with subtle atmospheric indigo-amber glow).
  - `Primary (Solar Saffron & Gold)`: `#8d4b00` (deep sacred amber), `#b15f00` (primary container), `#ffdcc3` (primary fixed highlight).
  - `Secondary (Akasha Indigo)`: `#5b598c`, `#131b2e` (deep temple indigo for astronomical solemnity).
  - `Tertiary (Amrit Jade)`: `#006948`, `#85f8c4` (auspicious Shubh & Abhijit indicators).
  - `Error / Inauspicious (Sindoor Red)`: `#ba1a1a`, `#ffdad6` (Rahu Kaalam, Yamaganda, and critical warnings).
- **Typography**:
  - Display & Headlines: `Playfair Display` (regal Roman serif for festival headers and divine titles).
  - Body & Data: `Plus Jakarta Sans` with `tabular-nums` for precise degree coordinates, time spans, and astronomical DMS offsets.
- **Layout Rhythm**: Responsive 12-column desktop grid with generous padding (`2rem`), 1px hairline borders (`rgba(136, 115, 100, 0.2)`), soft ambient halos, and mobile drawer/responsive collapse.

---

## 3. Key Product Decisions & Trade-Offs

1. **Deterministic Astronomical Calculations**:
   - *Decision*: Implement mathematical astronomical calculation routines for Tithi, Nakshatra, Sunrise/Sunset, Choghadiya, and Ashtakoota compatibility with preset ephemeris values calibrated to the standard dates in the mockups (October 24, 2024; November 1, 2024; November 15, 2024).
   - *Why*: Delivers an authentic, high-precision experience that feels like a live C-library backend without requiring heavy server compilation or native binaries.
2. **Unified Single-Page Tab Architecture**:
   - *Decision*: Single-page React state orchestration managing active top-level routes (`daily-panchang`, `monthly-calendar`, `muhurat-and-choghadiya`, `kundli-matching`, `festivals`, `admin-cms`) and Admin CMS sub-tabs.
   - *Why*: Instant transitions without page reloads, preserving user selections (e.g., active city, selected festival, chart style) seamlessly across tabs.
3. **Comprehensive Sample & Interactive Data**:
   - *Decision*: Provide rich, realistic data for 142 festivals, regional city overrides (Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Varanasi, Ujjain, London, New York, etc.), and editable forms in the CMS.
   - *Why*: Ensures every single screen and modal from the user's screenshots is fully populated, interactive, and visually faithful.

---

## 4. Technical Architecture & Component Tree

```
+-----------------------------------------------------------------------------------+
|                           Surya Chandra Vedic Jyotish App                         |
| +-------------------------------------------------------------------------------+ |
| | Global Header: Logo, City Selector, Date Navigator, Era Indicator, Profile    | |
| | Primary Navigation: Daily Panchang | Monthly Calendar | Muhurat | Kundli ...  | |
| +-------------------------------------------------------------------------------+ |
|                                       |                                           |
|  +--------------------+---------------------+------------------+----------------+ |
|  |                    |                     |                  |                | |
|  v                    v                     v                  v                v |
| [Daily Panchang]  [Monthly Calendar]  [Kundli Matching]   [Festivals]      [Admin CMS] |
| - Solar/Moon Arcs - Purnimanta/Amanta - 36 Guna Scorecard - Vrat Directory - Sub-Nav   |
| - 5 Limbs Grid    - 7x5 Matrix Grid - North/South Chart - Puja Vidhi PDF - Ephemeris   |
| - Shubh/Ashubh    - Vrat Spotlight  - Manglik Check     - Samagri Tags   - City Overrides
| - Choghadiya Day/ - Graha Gochar    - Vedic Upaye       - Fasting Niyam  - Cache/Cron  |
|   Night Table                                                               - Add City Modal
|                                       |                                           |
| +-------------------------------------------------------------------------------+ |
| | Global Footer: Ephemeris Specs, Lahiri Ayanamsha Note, Shastric Copyright     | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 5. Execution Steps

1. **Setup Assets & Design System**:
   - Ensure Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, Material Symbols Outlined) and Tailwind classes are configured with the specified palette in `index.html` and `src/index.css`.
2. **Build Data Stores & Astronomical Ephemeris Utilities**:
   - Define TypeScript interfaces and datasets for Panchang limbs, cities, planetary transits, festival directory, Puja Vidhi steps, and Kundli match data (`src/types/jyotish.ts` and `src/data/mockData.ts`).
   - Implement astrological helpers for Choghadiya calculations, Ashtakoota scoring, and Manglik checks.
3. **Build Core Navigation & Header**:
   - Create responsive top bar with real-time location switcher dropdown, date stepper (`Yesterday`, `Today`, `Tomorrow`, `Select Date`), and Samvat indicator.
4. **Build Primary Screen Modules**:
   - `DailyPanchangView.tsx`: Solar arc SVG, lunar phase, five limbs, Shubh/Ashubh timing cards, day/night Choghadiya tables, Disha Shool.
   - `MonthlyCalendarView.tsx`: November 2024 matrix, Purnimanta/Amanta toggle, event filter pills, Vrat spotlight cards, Graha Gochar table.
   - `MuhuratChoghadiyaView.tsx`: Dedicated Muhurat finder and full day/night Choghadiya schedule.
   - `KundliMatchingView.tsx`: Dual profile inputs, 28/36 circular gauge, Ashtakoota scorecard table, North/South Indian charts SVG, Manglik cancellation analysis, and remedies.
   - `FestivalsView.tsx`: Searchable festival directory, Diwali Lakshmi Puja showcase, 6-step Shodashopachara Vidhi, Samagri checklist, and fasting rules.
   - `AdminCmsView.tsx`: Sub-tabs covering Festival Catalog, Puja Vidhi Editor, Regional City Directory (with 4,520 cities table, Bulk Import/Export, and Add City modal), Astronomical Ephemeris Settings (with live diagnostic sandbox), and Redis Cache/Cron automation.
5. **Interactive Testing & Build Verification**:
   - Verify all modal dialogs, tab transitions, filter chips, chart switches, and calculations.
   - Run `compile_applet` and verify zero TypeScript or build errors.
