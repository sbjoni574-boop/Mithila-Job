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

## 🗂 Project Structure

```
webapp/
├── index.html      # Main single-page app (Home, Jobs, Post, About)
├── css/
│   └── style.css   # Custom styles & Mithila theme
└── js/
    ├── data.js     # Locations, categories & sample jobs
    └── app.js      # App logic (search, filters, post job, modal)
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

## 📌 Notes

- Sample jobs demo data हैं — फ़ोन नंबर placeholder हैं।
- User-posted jobs browser के localStorage में सेव होती हैं (backend नहीं है अभी)।
- भविष्य में backend (D1/API) जोड़कर jobs को सबके लिए shared किया जा सकता है।
