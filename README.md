# Mithila Job — मिथिला की नौकरियाँ 💼

मिथिला क्षेत्र (दरभंगा, मधुबनी, समस्तीपुर, सीतामढ़ी, मुज़फ़्फ़रपुर, बेगूसराय, सहरसा, जनकपुर) के लिए बनाया गया **मुफ़्त जॉब पोर्टल**।

## ✨ Features

- 🏠 **Home Page** — Hero search, स्थानीय आँकड़े, श्रेणियाँ और ताज़ा नौकरियाँ
- 🔍 **Job Search & Filters** — खोज, जिला, श्रेणी और नौकरी के प्रकार से फ़िल्टर
- 📄 **Job Details Modal** — सैलरी, योग्यता, विवरण के साथ पूरी जानकारी
- 📞 **Direct Contact** — एक क्लिक में Call या WhatsApp
- ➕ **Post a Job (Free)** — नियोक्ता मुफ़्त में नौकरी पोस्ट कर सकते हैं (localStorage में सेव)
- 📱 **Fully Responsive** — मोबाइल और डेस्कटॉप दोनों के लिए
- 🎨 **Mithila-inspired Design** — मधुबनी रंगों से प्रेरित थीम
- 📲 **PWA (Installable App)** — मोबाइल/डेस्कटॉप में App की तरह Install करें, ऑफ़लाइन काम करता है

## 📲 PWA — App की तरह Install करें

यह प्रोजेक्ट अब एक **Progressive Web App (PWA)** है, यानी इसे बिना Play Store/App Store के सीधे ब्राउज़र से मोबाइल/डेस्कटॉप में "App" की तरह Install किया जा सकता है।

- **Android/Chrome/Edge**: साइट खोलें → ऊपर "App Install करें" बटन दबाएँ (या ब्राउज़र के मेन्यू में "Install App" / "Add to Home screen" चुनें)
- **iPhone/iPad (Safari)**: साइट खोलें → नीचे Share बटन दबाएँ → "Add to Home Screen" चुनें
- **Offline Support**: एक बार खोलने के बाद Service Worker पेज को cache कर लेता है, इसलिए धीमे/बिना इंटरनेट में भी होम पेज और पहले देखी गई नौकरियाँ खुलती हैं
- Install होने के बाद App अपने खुद के आइकॉन, स्प्लैश और बिना ब्राउज़र bar के standalone window में खुलती है

### PWA फ़ाइलें
- `manifest.json` — App नाम, थीम रंग, आइकन और shortcuts
- `sw.js` — Service Worker (caching + offline support + auto-update)
- `offline.html` — नेटवर्क न होने पर दिखने वाला fallback पेज
- `icons/` — 16px से 512px तक सभी ज़रूरी आइकन साइज़ (including maskable icons)
- `js/pwa.js` — Service worker registration + install prompt की logic

## 🗂 Project Structure

```
webapp/
├── index.html         # Main single-page app (Home, Jobs, Post, About)
├── manifest.json       # PWA manifest (name, icons, theme, shortcuts)
├── sw.js               # Service worker (offline caching, auto-update)
├── offline.html         # Offline fallback page
├── icons/               # PWA icons (72px → 512px + maskable)
├── css/
│   └── style.css       # Custom styles & Mithila theme
└── js/
    ├── data.js         # Locations, categories & sample jobs
    ├── app.js          # App logic (search, filters, post job, modal)
    └── pwa.js           # Service worker registration & install prompt
```

## 🚀 Run Locally

```bash
cd webapp
python3 -m http.server 8000
# Open http://localhost:8000
```

## 🛠 Tech Stack

- HTML5 + Tailwind CSS (CDN)
- Vanilla JavaScript (no framework)
- Font Awesome icons, Google Fonts (Noto Sans Devanagari)
- localStorage for user-posted jobs
- Progressive Web App (Web App Manifest + Service Worker)

## 📌 Notes

- Sample jobs demo data हैं — फ़ोन नंबर placeholder हैं।
- User-posted jobs browser के localStorage में सेव होती हैं (backend नहीं है अभी)।
- भविष्य में backend (D1/API) जोड़कर jobs को सबके लिए shared किया जा सकता है।
