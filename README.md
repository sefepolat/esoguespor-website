# ESOGÜ E-Spor Kulübü Web Sitesi

Eskişehir Osmangazi Üniversitesi E-Spor Kulübü'nün resmi web sitesi. League of Legends ve VALORANT odaklı topluluğumuzun duyurularını, etkinliklerini ve iletişim kanallarını tek yerde toplar.

Site düz HTML, CSS ve JavaScript ile yazılmıştır. Derleme adımı, paket yöneticisi ya da framework gerektirmez. [Netlify](https://www.netlify.com/) üzerinde yayınlanır.

## Özellikler

- Duyuru slider'ı (görsel, bağlantı, dokunmatik kaydırma desteği)
- Hakkımızda ve odak oyunlar bölümleri
- Etkinlik listesi (etkinlik yoksa bölüm otomatik gizlenir)
- Katılım, sponsor ve iletişim bölümleri
- Mobil uyumlu tasarım, klavye ve ekran okuyucu erişilebilirliği
- SEO: Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`
- Özel 404 sayfası, güvenlik başlıkları ve önbellekleme (`_headers`)
- Kendi sunucusundan sunulan yazı tipleri (Inter, Space Grotesk)

## Proje yapısı

```
.
├── netlify.toml        # Netlify ayarı (publish = "site")
├── .gitignore          # Yalnızca site/ ve yapılandırma dosyaları repoya girer
└── site/
    ├── index.html      # Ana sayfa
    ├── style.css       # Stiller
    ├── script.js       # Slider, menü, etkinlik ve animasyon mantığı
    ├── data.js         # Duyuru ve etkinlik içerikleri
    ├── 404.html
    ├── _headers        # Netlify güvenlik ve önbellek başlıkları
    ├── robots.txt
    ├── sitemap.xml
    ├── fonts/          # Yazı tipi dosyaları (woff2)
    └── img/            # Logo ve duyuru görselleri
```

## Yerelde çalıştırma

Derleme gerekmez. `site/index.html` dosyasını tarayıcıda açmanız yeterlidir.

İsterseniz yerel bir sunucu da kullanabilirsiniz:

```bash
npx serve site
# veya
python -m http.server 8000 --directory site
```

## İçerik güncelleme

Duyuru ve etkinlikler `site/data.js` dosyasından yönetilir. HTML'e dokunmanız gerekmez.

### Duyuru eklemek

```js
{
  tag: "Yeni",                       // küçük etiket
  title: "Başlık",
  text: "Kısa açıklama",
  image: "img/duyuru.png",           // opsiyonel, önerilen boyut 1600x640 px
  alt: "Görselin açıklaması",
  link: "https://...",               // opsiyonel
  linkText: "Detaylar"               // opsiyonel
}
```

Görseli `site/img/` klasörüne koyun. Dosya adında Türkçe karakter ve boşluk kullanmayın.

### Etkinlik eklemek

```js
{
  date: "2026-12-15T19:00",
  title: "İlk Kampüs Turnuvası",
  game: "VALORANT",
  place: "Online (Discord)",
  link: "https://..."
}
```

`EVENTS` listesi doluysa "Etkinlikler" bölümü ve menü bağlantısı otomatik görünür.

## Yayınlama (Netlify)

Repo Netlify'a GitHub üzerinden bağlıdır. `main` dalına yapılan her push siteyi otomatik günceller.

```bash
git add .
git commit -m "Değişiklik açıklaması"
git push
```

Netlify ayarları:

| Ayar | Değer |
|---|---|
| Base directory | boş |
| Build command | boş |
| Publish directory | `site` |

Sitenin adresi değişirse `site/index.html` (canonical, Open Graph ve JSON-LD), `site/robots.txt` ve `site/sitemap.xml` içindeki adresi de güncelleyin.

## Kullanılan kaynaklar

- Yazı tipleri: [Inter](https://rsms.me/inter/) ve [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (SIL Open Font License)
- İkonlar: [Lucide](https://lucide.dev/) (ISC lisansı)

## İletişim

- E-posta: espor.esogu@gmail.com
- Instagram: [@esogu_espor](https://www.instagram.com/esogu_espor/)
- LinkedIn: [ESOGÜ E-Spor](https://www.linkedin.com/company/esoguespor/)
- Discord: [Sunucuya katıl](https://discord.gg/J4FfApZ74g)
