-- 1. seo_pages tablosu yoksa olustur
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type TEXT NOT NULL DEFAULT 'page',
  page_key TEXT NOT NULL,
  page_label TEXT NOT NULL DEFAULT '',
  title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  h1 TEXT DEFAULT '',
  h2 TEXT DEFAULT '',
  canonical_url TEXT DEFAULT '',
  robots TEXT DEFAULT 'index',
  include_sitemap BOOLEAN DEFAULT true,
  og_title TEXT DEFAULT '',
  og_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_key)
);

-- 2. Mevcut tabloya eksik kolonlari ekle (varsa hata vermez)
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS og_title TEXT DEFAULT '';
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS og_description TEXT DEFAULT '';
ALTER TABLE seo_pages ADD COLUMN IF NOT EXISTS og_image TEXT DEFAULT '';

-- 3. services tablosu
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT DEFAULT '',
  detail_description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Statik sayfalar icin varsayilan SEO kayitlari (zaten varsa atla)
INSERT INTO seo_pages (page_type, page_key, page_label, title, meta_description, keywords, h1, canonical_url, robots, include_sitemap)
VALUES
  ('page', '/', 'Ana Sayfa', 'Boyaplus | Premium Boya Markasi - Ic ve Dis Cephe Boyalari', 'Boyaplus ile mekanlariniza deger katin. Premium kalite ic cephe, dis cephe, ahsap ve metal boyalari.', 'boya, ic cephe boya, dis cephe boya, premium boya, boyaplus', 'Mekanlariniza Renk ve Hayat Katin', 'https://www.boyaplus.com.tr/', 'index', true),
  ('page', '/urunler', 'Urunler', 'Urunlerimiz | Boyaplus Premium Boya Cesitleri', 'Boyaplus premium ic cephe, dis cephe, ahsap ve metal boyalari. Tum urun cesitlerimizi inceleyin.', 'boya cesitleri, ic cephe, dis cephe, ahsap boya, metal boya', 'Urunlerimiz', 'https://www.boyaplus.com.tr/urunler', 'index', true),
  ('page', '/iletisim', 'Iletisim', 'Iletisim | Boyaplus', 'Boyaplus ile iletisime gecin. Teklif alin, sorularinizi sorun.', 'iletisim, teklif al, boyaplus iletisim', 'Iletisim', 'https://www.boyaplus.com.tr/iletisim', 'index', true),
  ('page', '/blog', 'Blog', 'Blog | Boyaplus Boya Rehberi ve Ipuclari', 'Boya secimi, uygulama teknikleri ve renk rehberleri. Boyaplus uzman ekibinden profesyonel ipuclari.', 'boya rehberi, boyama ipuclari, renk secimi, boya teknikleri', 'Blog', 'https://www.boyaplus.com.tr/blog', 'index', true),
  ('page', '/hizmetlerimiz', 'Hizmetlerimiz', 'Hizmetlerimiz | Boyaplus Profesyonel Boya Cozumleri', 'Boyaplus profesyonel boya uygulama, renk danismanligi ve proje yonetimi hizmetleri.', 'boya hizmeti, profesyonel boyama, renk danismanligi', 'Hizmetlerimiz', 'https://www.boyaplus.com.tr/hizmetlerimiz', 'index', true)
ON CONFLICT (page_key) DO NOTHING;

-- 5. Blog yazilari icin SEO kayitlari
INSERT INTO seo_pages (page_type, page_key, page_label, title, meta_description, keywords, h1, canonical_url, robots, include_sitemap)
VALUES
  ('blog', '/blog/ic-cephe-boya-nasil-yapilir', 'Ic Cephe Boya Rehberi', 'Ic Cephe Boya Nasil Yapilir? Adim Adim Rehber | Boyaplus', 'Ic cephe boyama islemini adim adim ogrenin. Duvar hazirligi, boya secimi ve profesyonel ipuclari.', 'ic cephe boya, boyama teknikleri, duvar boyama', 'Ic Cephe Boya Nasil Yapilir?', 'https://www.boyaplus.com.tr/blog/ic-cephe-boya-nasil-yapilir', 'index', true),
  ('blog', '/blog/tek-kat-boya-yeterli-mi', 'Tek Kat Boya Rehberi', 'Tek Kat Boya Gercekten Yeterli mi? | Boyaplus', 'Tek kat boya ne zaman yeterlidir? Boya katlarinin onemi ve dogru uygulama teknikleri.', 'tek kat boya, boya katlari, boya kalitesi', 'Tek Kat Boya Gercekten Yeterli mi?', 'https://www.boyaplus.com.tr/blog/tek-kat-boya-yeterli-mi', 'index', true),
  ('blog', '/blog/duvar-boyamadan-once-yapilmasi-gerekenler', 'Duvar Boyama Hazirligi', 'Duvar Boyamadan Once Yapilmasi Gerekenler | Boyaplus', 'Duvar boyamadan once yapilmasi gereken hazirlik adimlari. Temizlik, macunlama ve astarlama.', 'duvar hazirligi, boya oncesi, macunlama, astarlama', 'Duvar Boyamadan Once Yapilmasi Gerekenler', 'https://www.boyaplus.com.tr/blog/duvar-boyamadan-once-yapilmasi-gerekenler', 'index', true),
  ('blog', '/blog/beyaz-boya-tonlari-arasindaki-farklar', 'Beyaz Boya Tonlari', 'Beyaz Boya Tonlari ve Aralarindaki Farklar | Boyaplus', 'Beyaz boya tonlari arasindaki farklari kesfet. Mekaniniza uygun beyaz tonu nasil secersiniz?', 'beyaz boya, boya tonlari, renk secimi', 'Beyaz Boya Tonlari ve Aralarindaki Farklar', 'https://www.boyaplus.com.tr/blog/beyaz-boya-tonlari-arasindaki-farklar', 'index', true),
  ('blog', '/blog/kaliteli-boya-nasil-anlasilir', 'Kaliteli Boya Rehberi', 'Kaliteli Boya Nasil Anlasilir? | Boyaplus', 'Kaliteli boyanin ozelliklerini ogrenin. Ortu gucu, kivam ve dayaniklilik ile boyanin kalitesini anlayin.', 'boya kalitesi, boya secimi, profesyonel ipuclari', 'Usta Gozuyle Kaliteli Boya Nasil Anlasilir?', 'https://www.boyaplus.com.tr/blog/kaliteli-boya-nasil-anlasilir', 'index', true)
ON CONFLICT (page_key) DO NOTHING;

-- 6. Varsayilan hizmetler
INSERT INTO services (title, short_description, detail_description, icon, sort_order, is_active)
VALUES
  ('Profesyonel Boya Uygulama', 'Uzman ekibimizle ic ve dis cephe boya uygulama hizmeti.', 'Deneyimli usta kadromuz ile evinizin veya is yerinizin ic ve dis cephe boyama islemlerini profesyonel ekipmanlarla gerceklestiriyoruz. Malzeme seciminden renk danismanligina kadar tum surecte yaninizdayiz.', 'paintbrush', 1, true),
  ('Renk Danismanligi', 'Mekaniniza en uygun renk paletini birlikte belirleyelim.', 'Uzman renk danismanlarimiz, mekaninizin isik durumu, mobilya renkleri ve kisisel tercihlerinizi degerlendirerek size ozel renk paleti olusturur. Numune uygulamasi ile karari daha kolay vermenizi saglariz.', 'palette', 2, true),
  ('Dis Cephe Yalitim ve Boyama', 'Binanizin dis cephesini hem estetik hem fonksiyonel hale getirin.', 'Dis cephe isi yalitim uygulamasi sonrasi premium dis cephe boyalarimizla binaniza yeni bir gorunum kazandiriyoruz. UV korumasil, su itici ve nefes alabilen ozel formullerimiz uzun yillar dayaniklilik saglar.', 'building', 3, true),
  ('Proje Yonetimi', 'Buyuk olcekli projeleriniz icin bastan sona yonetim hizmeti.', 'Insaat sirketleri, oteller, AVM ve toplu konut projeleri icin ozel fiyat teklifleri ve proje yonetim hizmeti sunuyoruz. Malzeme tedarikindan uygulama takibine kadar tum sureci yonetiyoruz.', 'briefcase', 4, true),
  ('Dekoratif Boya Uygulamalari', 'Mekaniniza ozel dekoratif dokular ve efektler.', 'Saten, kadife, tas gorunumu, beton efekt gibi dekoratif boya tekniklerini uzman ekibimizle mekaniniza uyguluyoruz. Her mekan icin ozel doku ve renk calismalari yapilir.', 'sparkles', 5, true)
ON CONFLICT DO NOTHING;
