# Browtiful by Emma - Website Premium

Site de prezentare premium pentru salon de cosmetică & sprâncene.

## 🚀 Deploy pe GitHub Pages

### Pași pentru publicare:
1. Creează un repository nou pe GitHub
2. Uploadează toate fișierele din acest folder
3. Settings → Pages → Source: `main` branch → Save
4. Site-ul va fi live la: `https://username.github.io/repo-name`

---

## ✏️ CUM EDITEZI CONȚINUTUL (Fără cod!)

### 📝 Editare texte și imagini via `content.json`

Toate textele și imaginile site-ului sunt în fișierul **`content.json`**. 
Poți edita direct pe GitHub:

1. Deschide repository-ul pe GitHub.com
2. Click pe `content.json`
3. Click pe iconița 🖊️ (Edit this file)
4. Modifică ce dorești
5. Click **Commit changes**
6. Site-ul se actualizează automat în ~1 minut!

### 📸 Adăugare imagini noi:

1. Pe GitHub, navighează la `assets/gallery/`
2. Click **Add file** → **Upload files**
3. Trage imaginile (denumite: `pensat-1.jpg`, `stilizare-2.jpg`, etc.)
4. Click **Commit changes**
5. Actualizează căile în `content.json` dacă e cazul

---

## 📁 Structura Proiectului

```
Browtifull/
├── index.html          # Pagina principală
├── styles.css          # Stiluri CSS
├── script.js           # JavaScript
├── content.json        # ⭐ EDITEAZĂ AICI - toate textele și imaginile
├── assets/             
│   └── gallery/        # Imaginile pentru galerii
│       ├── pensat-1.jpg ... pensat-8.jpg
│       ├── stilizare-1.jpg ... stilizare-8.jpg
│       ├── laminare-sprancene-1.jpg ... 
│       ├── laminare-gene-1.jpg ...
│       └── epilare-1.jpg ...
└── README.md           
```

---

## 📋 Ce poți edita în `content.json`:

### 🏠 Informații generale (`site`):
```json
"site": {
  "phone": "0730854190",        ← Numărul tău
  "whatsapp": "40730854190",    ← Pentru link WhatsApp
  "instagram": "...",           ← Link Instagram
  "facebook": "..."             ← Link Facebook
}
```

### 💅 Servicii (`services`):
```json
{
  "id": "pensat",
  "title": "Pensat sprâncene",           ← Titlul serviciului
  "description": "...",                   ← Descrierea
  "duration": "~15-20 min",               ← Durata
  "price": "Preț: la consultare",         ← Sau "50 RON"
  "images": ["assets/gallery/..."]        ← Lista imaginilor
}
```

### ⭐ Testimoniale (`testimonials`):
```json
{
  "rating": 5,
  "text": "Textul review-ului...",
  "name": "Andreea M.",
  "role": "Clientă",
  "avatar": "A"                           ← Prima literă
}
```

### ❓ Întrebări frecvente (`faq`):
```json
{
  "question": "Cât durează?",
  "answer": "Depinde de serviciu..."
}
```

---

## 🎨 Personalizare avansată

### Schimbă culorile (în `styles.css`):
```css
:root {
    --color-ivory: #F8F5F1;      /* Fundal principal */
    --color-nude: #E7D3C7;       /* Accent secundar */
    --color-rose-dust: #D7A6A6;  /* Accent principal */
    --color-espresso: #2A1E1B;   /* Text */
    --color-gold: #C7A36A;       /* Accent gold */
}
```

### Fonturile (în `index.html` <head>):
- **Playfair Display** - pentru titluri
- **Poppins** - pentru text

---

## 📱 Verificare înainte de publicare

- [ ] Număr telefon corect
- [ ] Link WhatsApp funcțional  
- [ ] Imagini uploadate în `assets/gallery/`
- [ ] Testimoniale actualizate
- [ ] Prețuri/durate corecte

---

## 🆘 Probleme frecvente

**Imaginile nu se afișează?**
- Verifică că numele fișierului e exact (case-sensitive)
- Asigură-te că e `.jpg` nu `.jpeg` sau `.png`

**Textul nu s-a schimbat?**
- Verifică că JSON-ul e valid (fără virgule lipsă)
- Așteaptă 1-2 minute pentru propagare GitHub

**Site-ul arată stricat?**
- Verifică că nu ai șters ghilimele `"` sau acolade `{}`
3. Click pe "Distribuie" → "Încorporează o hartă"
4. Copiază codul iframe
5. În `index.html`, găsește secțiunea `.contact__map` și înlocuiește `<div class="map-placeholder">...</div>` cu iframe-ul copiat

### 6. Imagini

#### Hero Background
- Fișier: `assets/hero.jpg`
- Dimensiune recomandată: 1920x1080px sau mai mare
- Stil: Imagine soft, feminină (close-up sprâncene, textură, produse)
- În `styles.css`, decomentează și actualizează:
```css
.hero__background {
    background-image: url('assets/hero.jpg');
}
```

#### Fotografie "Despre mine"
- Fișier: `assets/emma.jpg`
- Dimensiune recomandată: 800x1000px (format portrait)
- În `index.html`, secțiunea `.despre__image`, înlocuiește placeholder-ul cu:
```html
<img src="assets/emma.jpg" alt="Emma - Specialist cosmetică" class="despre__img" loading="lazy">
```

#### Favicon
- Fișier: `assets/favicon.png`
- Dimensiune: 32x32px sau 64x64px
- În `index.html`, decomentează linia:
```html
<link rel="icon" type="image/png" href="assets/favicon.png">
```

## 📱 Responsive Design

Site-ul este optimizat pentru:
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

## 🚀 Cum lansezi site-ul

### Opțiunea 1: Găzduire simplă
1. Încarcă toate fișierele pe un serviciu de hosting (ex: Netlify, Vercel, sau orice hosting clasic)
2. Asigură-te că `index.html` este în rădăcina site-ului

### Opțiunea 2: GitHub Pages (gratuit)
1. Creează un repository pe GitHub
2. Încarcă fișierele
3. Activează GitHub Pages din Settings

### Opțiunea 3: Netlify Drop (cel mai simplu)
1. Mergi pe [netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop folderul `Browtifull`
3. Site-ul este live în câteva secunde!

## 🎯 Culori folosite (Paleta A)

| Culoare | Cod | Utilizare |
|---------|-----|-----------|
| Ivory | #F8F5F1 | Background principal |
| Nude | #E7D3C7 | Elemente secundare, carduri |
| Rose-dust | #D7A6A6 | Accent feminin |
| Espresso | #2A1E1B | Text, butoane principale |
| Gold | #C7A36A | Accent premium, CTA, highlights |

## 📞 Suport

Pentru modificări avansate sau personalizări suplimentare, contactează-mă.

---

© 2024 Browtiful by Emma. Website creat cu ❤️
