# ESOGÜ E-Spor Kulübü — Resmi Web Sitesi

[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status)](https://app.netlify.com/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://github.com/sefepolat/esoguespor-website)
[![Tech Stack](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange)](https://github.com/sefepolat/esoguespor-website)
[![License: MIT](https://img.shields.io/badge/License-MIT%20%2B%20Brand%20Reserved-blue.svg)](LICENSE)

Eskişehir Osmangazi Üniversitesi E-Spor Kulübü'nün resmi web sitesi. **League of Legends**, **VALORANT** ve **Teamfight Tactics** odaklı rekabetçi oyuncu topluluğumuzu, turnuvalarımızı, duyurularımızı ve kurumsal iş birliklerimizi tek bir modern merkezde buluşturur.

Ağır framework'ler veya derleme (build) bağımlılıkları yerine; **saf HTML5, modern CSS3 ve Vanilla ES6+ JavaScript** mimarisiyle, en yüksek performans ve erişilebilirlik standartlarında geliştirilmiştir. [Netlify](https://www.netlify.com/) üzerinde statik olarak yayınlanır.

---

## ✨ Öne Çıkan Özellikler

### 🎨 Tasarım & Espor Kimliği
- **Mimari Renk Paleti:** Resmi kulüp kimliğine dayanan Gece Laciverti (`#090c19`), Kulüp Mavisi (`#19256E`), Buz Turkuazı (`#68B6BA`) ve Enerjik Turuncu (`#F4A261`).
- **3D Taktil Push Butonlar:** Gerçek fizik mekanizması hissi veren basılabilir katmanlı 3D şasili butonlar (`.btn-3d`).
- **Sonsuz Parallax Izgara:** Sayfa kaydırıldıkça donanım hızlandırmalı yumuşak bir derinlik sunan ve sayfa altında asla kesilmeyen ızgara katmanı (`.bg-grid-parallax`).

### 🕹️ Mikro Etkileşimler & Animasyonlar
- **3D Hero Logo Tilt:** En üstteki kulüp logosunun imleç hareketini 3 boyutlu derinlikle takip etmesi.
- **Manyetik Buton (Magnetic Pull):** "Aramıza Katıl" butonunun fare imlecini fiziksel olarak kendine doğru çekmesi.
- **Ritmik Text Scramble (Şifre Çözücü):** Bölüm başlıkları ekrana girdiğinde harflerin soldan sağa dalga halinde şifreli gibi çözülerek açılması.
- **Spotlight Kartlar:** Kart ve paneller üzerinde gezinen imleci takip eden fütüristik radyal ışık hüzmesi (Linear / Vercel tarzı).
- **Akıcı Duyuru Slider'ı:** Dokunmatik kaydırma (touch swipe), klavye gezintisi ve otomatik geçiş destekli slider.

### 🔤 Çok Katmanlı Tipografi
Tüm yazı tipleri harici CDN gecikmelerini önlemek amacıyla yerel `.woff2` olarak sunulur:
- **Marka & Hero Başlığı:** `Clash Display` (Cesur ve heykelsi stüdyo kimliği)
- **Bölüm Başlıkları & 3D Butonlar:** `Syne` (Geniş açılı, fütüristik espor karakteri)
- **Teknik HUD, Sayılar & Etiketler:** `Space Mono` (`// 01`, `Kayıtlar Açık`, tarih kutuları)
- **Gövde & Okuma Metinleri:** `Plus Jakarta Sans` (Yüksek okunabilirlik ve modern geometrik anatomi)

### 🚀 SEO, Güvenlik & Performans
- **Sıfır Bağımlılık (Zero Dependencies):** Paket yöneticisi (`npm`/`yarn`) veya devasa `node_modules` bağımlılığı olmadan anında açılış.
- **Sosyal Medya & SEO:** Open Graph (`og:image`, `og:title`), Twitter Card (`summary_large_image`), `sitemap.xml`, `robots.txt` ve Schema.org JSON-LD arama motoru yapısal verisi.
- **Güvenlik Başlıkları:** `_headers` dosyasıyla CSP, HSTS, X-Frame-Options ve agresif statik önbellekleme optimizasyonu.
- **Erişilebilirlik (a11y):** Ekran okuyucu etiketleri (`aria-*`), atlama bağlantısı (`skip to content`) ve tam klavye kontrolü.

---

## 📁 Proje Yapısı

```
.
├── netlify.toml        # Netlify yayın yapılandırması (publish = "site")
├── .gitignore          # Sadece site/ ve ana yapılandırma dosyalarını repoya dahil eder
├── README.md           # Proje dokümantasyonu
├── LICENSE             # Telif ve lisans bilgileri
└── site/               # Canlıya çıkan üretim dizini
    ├── index.html      # Ana sayfa (Semantik HTML5 & SEO)
    ├── style.css       # Tasarım sistemi, CSS değişkenleri ve animasyonlar
    ├── script.js       # Mikro etkileşimler, slider ve animasyon motoru
    ├── data.js         # Duyurular ve etkinlik veri tabanı (JSON mantığı)
    ├── 404.html        # Özel 404 sayfası
    ├── _headers        # Netlify güvenlik ve önbellekleme kuralları
    ├── robots.txt      # Arama motoru indeksleme rehberi
    ├── sitemap.xml     # Site haritası
    ├── fonts/          # Yerel font dosyaları (.woff2)
    └── img/            # Logo, afiş ve optimize edilmiş oyun görselleri
```

---

## 💻 Yerelde Çalıştırma

Projede derleme adımı yoktur. Doğrudan `site/index.html` dosyasını çift tıklayarak tarayıcınızda açabilirsiniz.

Yerel bir web sunucusuyla çalıştırmak isterseniz:

```bash
# Node.js ile
npx serve site

# veya Python 3 ile
python -m http.server 8000 --directory site
```

---

## ✍️ İçerik Nasıl Güncellenir?

Duyurular ve etkinlikler tek bir merkezden, `site/data.js` dosyasından yönetilir. **HTML koduna dokunmanıza gerek yoktur.**

### Yeni Duyuru Eklemek (`ANNOUNCEMENTS`)

`site/data.js` dosyasındaki diziye yeni bir nesne eklemeniz yeterlidir:

```javascript
{
  tag: "Kayıtlar Açık",                       // Rozet etiketi
  title: "Aktif üye alımları başladı!",       // Duyuru başlığı
  text: "Aramıza katılmak için formu doldur.", // Açıklama metni
  image: "img/kayit.png",                     // Önerilen boyut: 1600x640 px
  alt: "Duyuru görseli açıklaması",
  link: "https://forms.gle/...",              // Tıklama linki (opsiyonel)
  linkText: "Forma Git"                       // 3D buton metni (opsiyonel)
}
```

> **Görsel İpucu:** Duyuru görsellerini `site/img/` klasörüne ekleyin. Dosya adlarında boşluk ve Türkçe karakter kullanmamaya özen gösterin.

### Yeni Etkinlik Eklemek (`EVENTS`)

```javascript
{
  date: "2026-12-15T19:00",
  title: "Kampüs İçi VALORANT Turnuvası",
  game: "VALORANT",
  place: "Online (Discord)",
  link: "https://discord.gg/J4FfApZ74g"
}
```

*Not: `EVENTS` listesinde en az bir etkinlik varsa "Etkinlikler" bölümü ve menü bağlantısı otomatik olarak görünür; liste boş olduğunda bölüm kendiliğinden gizlenir.*

---

## 🚀 Canlıya Alma (Netlify Deployment)

Depo doğrudan Netlify CI/CD hattına bağlıdır. `main` dalına push edilen her commit otomatik olarak test edilir ve 30-40 saniye içinde canlıya alınır:

```bash
git add site/ README.md
git commit -m "feat: yeni duyuru ve etkinlikler eklendi"
git push origin main
```

**Netlify Dağıtım Parametreleri:**
- **Base directory:** *(Boş)*
- **Build command:** *(Boş)*
- **Publish directory:** `site`

---

## 📚 Kullanılan Kaynaklar

- **Yazı Tipleri:**
  - [Clash Display](https://www.fontshare.com/fonts/clash-display) (Indian Type Foundry / Fontshare)
  - [Syne](https://fonts.google.com/specimen/Syne) (Lucas Descroix / Bonjour Monde)
  - [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Tokotype)
  - [Space Mono](https://fonts.google.com/specimen/Space+Mono) (Colophon Foundry)
- **İkonlar:** [Lucide Icons](https://lucide.dev/) (ISC Lisansı)
- **Oyun Markaları:** League of Legends, VALORANT ve Teamfight Tactics, Riot Games, Inc. şirketinin tescilli ticari markalarıdır.

---

## 📄 Lisans & Telif Hakları

- **Kaynak Kodlar:** Kaynak kod altyapısı [MIT Lisansı](LICENSE) kapsamında korunmaktadır.
- **Marka & Medya:** ESOGÜ E-Spor Kulübü logosu, üniversiteye ait isimler, görsel tasarımlar ve metin içerikleri ESOGÜ E-Spor Kulübü'ne aittir; izinsiz kopyalanamaz ve ticari amaçla kullanılamaz.

---

## 📬 İletişim & Topluluk

- **Resmi E-Posta:** [espor.esogu@gmail.com](mailto:espor.esogu@gmail.com)
- **Discord Sunucusu:** [discord.gg/J4FfApZ74g](https://discord.gg/J4FfApZ74g)
- **Instagram:** [@esogu_espor](https://www.instagram.com/esogu_espor/)
- **LinkedIn:** [ESOGÜ E-Spor Kulübü](https://www.linkedin.com/company/esoguespor/)
- **Üniversite:** Eskişehir Osmangazi Üniversitesi (ESOGÜ), Eskişehir / Türkiye
