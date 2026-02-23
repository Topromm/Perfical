<img width="1920" height="480" alt="perficalbanner" src="https://github.com/user-attachments/assets/b756f8df-0dac-4e9e-a68b-49ce0b13824d" />

# Perfical
A personal financial calendar that helps you track income, expenses, and upcoming payments at a glance. Fully offline, fast, and built for everyday clarity.

## From Spreadsheet to App: Why I Built This
I've always been a highly analytical person, and for years I tracked my finances in Excel using custom formulas and conditional logic. It worked, but it left a lot to be desired. I wanted something that's more secure, offline, structured, and actually enjoyable to use.

Perfical is the result: a Personal Financial Calendar designed to make it effortless to see your spending, balance changes, and upcoming payments at a glance.

---
## Installation
Coming soon - I'm currently deep into [Phase 3 of the roadmap](#phase-3--transactions-system-expansion-next-step).  
Once that's complete, Perfical will enter open beta with an installer.

## Features
- Visual calendar view of income and expenses
- Color‑coded entries for income/expenses
- Fast desktop performance via Tauri
- Clean UI with smooth animations
- Local database using Dexie.js (IndexedDB)
- Fully offline, no internet connection required

---

## Tech Stack
- **React** (functional components + hooks)  
- **Vite** (lightning‑fast dev/build)  
- **Tauri** (desktop wrapper)  
- **IndexedDB via Dexie.js** *(planned)*  
- **SQLite** *(future upgrade)*  

---

## Roadmap

### **Phase 1 — Core UI (Completed)**
- Shared layout system (sidebar, balance, navigation)  
- Home page with calendar  
- Transactions page (list view + add modal)  
- Settings page (basic)  
- Splash screen + animations  
- Theme foundation (colors, typography)  

---

### **Phase 2 — Local Database Integration (Completed)**
Perfical will move from simple JSON-based local storage to a structured local database using **Dexie.js (IndexedDB)**.

This enables:
- persistent transaction storage  
- recurring income/expense rules  
- date‑based events  
- fast querying  
- editing, deleting, copying entries  
- archiving old data  
- future migration to SQLite  

**(SQLite planned)** for a later phase once the data model stabilizes.

---

### **Phase 3 — Transactions System Expansion (Next Step)**
- Edit transaction modal  
- Delete / duplicate / copy / paste entries  
- Add date field to each entry  
- Mark calendar days with income/expense dots  
- Auto‑apply income/expenses to balance on the correct day  
- Auto‑remove or archive entries older than 30 days  
- Repeating rules:  
  - daily  
  - weekly  
  - monthly  
  - annually  
  - repeat recurringly (X times)  
  - repeat recurringly (until date)  

---

### **Phase 4 — Calendar Enhancements**
- Zoom levels: 1 month, 3 months, 6 months  
- Hover a day → preview events  
- Click a day → open modal with full list  
- Add/edit/delete events directly from the calendar  
- Colored dots:  
  - green = income  
  - red = expense  
  - yellow = mixed  

---

### **Phase 5 — Settings & Personalization**
- Theme selection (light/dark/custom)  
- Skip splash screen option  
- Layout customization  
- Currency settings  
- Backup/export options (JSON)  
- Optional future cloud sync  

---

### **Phase 6 — Future Database Upgrade (Optional)**
Perfical may later migrate to **SQLite via Tauri’s Rust backend** for:
- multi‑device sync  
- encrypted storage  
- larger datasets  
- advanced queries  

This will be built on top of the Dexie‑based data model.

---

## License
© Copyright 2026 Topromm. All rights reserved.
