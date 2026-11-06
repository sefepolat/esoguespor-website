/*
 * Site içeriği burada. HTML'e dokunmadan duyuru ve etkinlik ekleyebilirsiniz.
 *
 * DUYURU alanları:
 *   tag      : Küçük etiket (görselsiz slaytta görünür)
 *   title    : Başlık
 *   text     : Açıklama (görselsiz slaytta görünür)
 *   image    : (opsiyonel) 1600x640 görsel yolu. Görsel varsa slaytta sadece görsel görünür.
 *   alt      : Görselin metni (ekran okuyucular ve görsel yüklenmezse için; görseldeki yazıyı yazın)
 *   link     : (opsiyonel) Tıklanınca gidilecek adres
 *   linkText : (opsiyonel) Bağlantı rozetinin yazısı
 *
 * ETKİNLİK alanları:
 *   date  : "YYYY-AA-GG" ya da "YYYY-AA-GGTSS:DD" (örn. "2026-12-15T19:00")
 *   title, game, place : metin
 *   link  : (opsiyonel) kayıt/bilgi bağlantısı
 *   Etkinlik listesi boşsa "Etkinlikler" bölümü ve menü bağlantısı gizlenir.
 */

const ANNOUNCEMENTS = [
  {
    tag: "Yeni",
    title: "Kulübümüz kuruldu!",
    text: "ESOGÜ E-Spor Kulübü olarak yola çıktık. Gelişmeler için bizi takip edin.",
    image: "img/genelduyuru.png",
    alt: "ESOGÜ E-Spor Kulübü duyurusu"
  },
  {
    tag: "Kayıtlar Açık",
    title: "Aktif üye alımları başladı!",
    text: "Aramıza katılmak için kayıt formunu doldur.",
    image: "img/kayit.png",
    alt: "ESOGÜ E-Spor Kulübü aktif üye alımları başladı",
    link: "https://forms.gle/2fVHPdiinXh5jq6TA",
    linkText: "Forma git"
  }
];

const EVENTS = [
  // Örnek:
  // { date: "2026-12-15T19:00", title: "İlk Kampüs Turnuvası", game: "VALORANT", place: "Online (Discord)", link: "https://..." }
];
