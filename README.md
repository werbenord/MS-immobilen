# MS Immobilien – Website (HTML/CSS/JS)

Premium-Webseite für **MS Immobilien** (Deutschland) im klaren, modernen Stil.  
Umgesetzt mit **Vanilla HTML/CSS/JS** – ohne Frameworks – mit Fokus auf Performance, Lesbarkeit und saubere UI-Details.

---

## Tech-Stack

- **HTML5 / CSS3 / JavaScript (ES6)**
- **Font:** Mona Sans
- Keine Build-Tools nötig (läuft als statische Website)

---

## Design-System

### Typografie
- **Mona Sans** als globale Schrift (Headlines bold, Texte gut lesbar)

### Farben (Basis)
- **Seitenhintergrund:** `#F3F3F3`
- **Primäre Textfarbe (auf hell):** `#2F3336`
- **Dunkle Flächen (Header/Highlights):** `#2F3336` und `#0F1416`
- **Text auf dunklen Flächen:** `#FFFFFF`
- **Borders/Lines/Shadows:** neutral über `rgba(47,51,54, …)` (soft & premium)

### UI-Regeln
- Globaler Link-Reset (keine blauen/unterstrichenen Standard-Links)
- Button-Standard:
  - **Höhe:** `50px`
  - **Font-Size:** `16px`
- Runde Ecken: großzügig (Cards/Sections typ. `14px–26px`)
- Layout: viel Whitespace, klare Hierarchie, keine überladenen Effekte

---

## Seitenaufbau (Sections)

### 1) Hero (Bild + dunkler Overlay)
- Max-Width ca. **1650px**, Höhe ca. **960px**
- Hintergrund: Gebäude-Foto mit dunklem Verlauf
- Content unten (hero-bottom) zentriert, Breite ca. **85%**, `padding-bottom: 90px`

### 2) Header / Navigation (Nav-Pill im Hero)
- Im Hero platziert, als dunkle „Pill“
- Breite ca. **85%**, Höhe **102px**, Padding **25px**
- Hintergrund: `#2F3336`
- Menüschrift: `16px`
- Firmenname im Header entfernt → **Logo PNG Placeholder** (Link später austauschbar)

### 3) Hero-Stats (rechts)
- Oben: **25+ / 50+ / 500+**
- Unten: CTA „Kostenlose Beratung“ + Bewertung „4,9“ + „Kundenbewertungen“

### 4) Unsere Leistungen (Services)
- 4 Cards
- Hover: Card wechselt von heller Fläche zu Bild (Premium-Effekt)
- Typografie in Cards:
  - Titel: **20px**
  - Text: **16px**
  - Link: **16px** („Details ansehen“)
- Unterhalb: „4,9/5“, „Über 4.200 Bewertungen“, Link „Alle Leistungen ansehen“

### 5) Über MS Immobilien (About)
- Große Bildfläche links
- Rotierender Badge „REFERENZEN“ (JS Rotation)
- Rechts: 2 Info-Karten + Statistik-Zahlen mit Count-Up

### 6) Video Banner (Modal Video)
- Große Bild-Section mit Overlay
- „Video ansehen“ Pill + kreisförmiger Button (Text rotiert)
- Öffnet Video im `<dialog>` Modal (JS)

### 7) FAQ (Accordion)
- Links: Titel/CTA + Avatare
- Rechts: Accordion (immer nur ein Punkt offen)
- Open-State: dunkler Verlauf (premium)

### 8) Kundenstimmen (Testimonials)
- Titel + CTA
- Grid mit Cards (Desktop 3 / Tablet 2 / Mobile 1)
- Sterne-Icons, Quote-Icon, Avatar + Name/Rolle

---

## JavaScript-Funktionen

- **Rotierender Badge** (About)
- **Count-Up Zahlen** (Stats)
- **Video Modal** (open/close, Esc, Backdrop click, stop iframe)
- **FAQ Accordion** (aria-expanded + hidden, Single-open)

---

## Konfiguration / Austauschbare Inhalte

### Logo ersetzen
- Im Header: PNG Placeholder → durch echtes Logo ersetzen (src/link)

### Bilder ersetzen
- Hero-/Section-Bilder: URLs/Assets tauschen (empfohlen: lokal in `/assets/images`)

### Video-Link ersetzen
- In der Video-Section:
  ```js
  const VIDEO_EMBED_URL = "https://www.youtube.com/embed/DEIN_ID?autoplay=1&rel=0";
