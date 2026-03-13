-- seo_pages tablosu olustur (yoksa)
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type TEXT NOT NULL DEFAULT 'page',
  page_key TEXT NOT NULL UNIQUE,
  page_label TEXT NOT NULL,
  title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  keywords TEXT DEFAULT '',
  h1 TEXT DEFAULT '',
  h2 TEXT DEFAULT '',
  canonical_url TEXT DEFAULT '',
  robots TEXT DEFAULT 'index',
  include_sitemap BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS aktif et
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

-- RLS policies (hepsi icin izin ver)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'seo_pages' AND policyname = 'seo_pages_select') THEN
    EXECUTE 'CREATE POLICY seo_pages_select ON seo_pages FOR SELECT USING (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'seo_pages' AND policyname = 'seo_pages_insert') THEN
    EXECUTE 'CREATE POLICY seo_pages_insert ON seo_pages FOR INSERT WITH CHECK (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'seo_pages' AND policyname = 'seo_pages_update') THEN
    EXECUTE 'CREATE POLICY seo_pages_update ON seo_pages FOR UPDATE USING (true)';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'seo_pages' AND policyname = 'seo_pages_delete') THEN
    EXECUTE 'CREATE POLICY seo_pages_delete ON seo_pages FOR DELETE USING (true)';
  END IF;
END
$$;

-- Mevcut statik sayfalar icin SEO kayitlari
INSERT INTO seo_pages (page_type, page_key, page_label, title, meta_description, keywords, h1, h2, canonical_url, robots, include_sitemap)
VALUES
  ('page', '/', 'Ana Sayfa', 'Boyaplus | Premium Boya Markasi - Ic ve Dis Cephe Boyalari', 'Boyaplus ile mekanlariniza deger katin. Premium kalite ic cephe, dis cephe, ahsap ve metal boyalari. Turkiye geneli profesyonel boya cozumleri.', 'boya, boyaplus, ic cephe boya, dis cephe boya, premium boya, turk boya markasi', 'Duvarlariniza Hayat Verin', 'Premium Kalite Boya Cozumleri', 'https://www.boyaplus.com.tr/', 'index', true),
  ('page', '/urunler', 'Urunler', 'Boya Urunleri ve Cesitleri | Boyaplus', 'Ic cephe, dis cephe, ahsap ve metal boyalari. Tum Boyaplus urun yelpazesini kesfedin. Premium kalite, uygun fiyatlar.', 'boya urunleri, ic cephe boya, dis cephe boya, ahsap boya, metal boya, boya cesitleri, boya fiyatlari', 'Urunlerimiz', 'Tum Boya Cesitleri', 'https://www.boyaplus.com.tr/urunler', 'index', true),
  ('page', '/iletisim', 'Iletisim', 'Iletisim | Boyaplus', 'Boyaplus ile iletisime gecin. Telefon, e-posta ve adres bilgileri. Profesyonel boya danismanligi icin bize ulasin.', 'boyaplus iletisim, boya siparis, boya danismanligi, boyaplus telefon', 'Iletisim', 'Bize Ulasin', 'https://www.boyaplus.com.tr/iletisim', 'index', true)
ON CONFLICT (page_key) DO NOTHING;

-- Blog ana sayfasi
INSERT INTO seo_pages (page_type, page_key, page_label, title, meta_description, keywords, h1, h2, canonical_url, robots, include_sitemap)
VALUES
  ('page', '/blog', 'Blog', 'Boya Rehberi ve Blog | Boyaplus', 'Boya secimi, uygulama teknikleri, renk onerileri ve profesyonel ipuclari. Boyaplus blog ile evinizi boyama hakkinda her seyi ogrenin.', 'boya rehberi, boya blog, boyama ipuclari, renk secimi, ic cephe boya, dis cephe boya', 'Boya Rehberi ve Blog', 'Profesyonel Boya Ipuclari', 'https://www.boyaplus.com.tr/blog', 'index', true)
ON CONFLICT (page_key) DO NOTHING;

-- Blog yazilari
INSERT INTO seo_pages (page_type, page_key, page_label, title, meta_description, keywords, h1, h2, canonical_url, robots, include_sitemap)
VALUES
  ('page', '/blog/ic-cephe-boya-nasil-yapilir', 'Blog: Ic Cephe Boya Rehberi', 'Ic Cephe Boya Nasil Yapilir? Adim Adim Rehber | Boyaplus', 'Ic cephe boyama islemini adim adim ogrenin. Duvar hazirligi, boya secimi, rulo teknigi ve profesyonel ipuclari.', 'ic cephe boya, boyama teknikleri, duvar boyama, ev boyama, boya nasil yapilir', 'Ic Cephe Boya Nasil Yapilir?', 'Adim Adim Rehber', 'https://www.boyaplus.com.tr/blog/ic-cephe-boya-nasil-yapilir', 'index', true),
  ('page', '/blog/tek-kat-boya-yeterli-mi', 'Blog: Tek Kat Boya', 'Tek Kat Boya Gercekten Yeterli mi? | Boyaplus', 'Tek kat boya ne zaman yeterlidir, ne zaman yetersiz kalir? Boya katlarinin onemi ve dogru uygulama teknikleri.', 'tek kat boya, boya katlari, boya kalitesi, tasarruf, ortu gucu', 'Tek Kat Boya Gercekten Yeterli mi?', 'Boya Katlari ve Onemi', 'https://www.boyaplus.com.tr/blog/tek-kat-boya-yeterli-mi', 'index', true),
  ('page', '/blog/duvar-boyamadan-once-yapilmasi-gerekenler', 'Blog: Duvar Boyama Oncesi', 'Duvar Boyamadan Once Yapilmasi Gerekenler | Boyaplus', 'Duvar boyamadan once yapilmasi gereken hazirlik adimlari. Duvar temizligi, macunlama, astarlama teknikleri.', 'duvar hazirligi, boya oncesi, macunlama, astarlama, maskeleme', 'Duvar Boyamadan Once Yapilmasi Gerekenler', 'Hazirlik Rehberi', 'https://www.boyaplus.com.tr/blog/duvar-boyamadan-once-yapilmasi-gerekenler', 'index', true),
  ('page', '/blog/beyaz-boya-tonlari-arasindaki-farklar', 'Blog: Beyaz Boya Tonlari', 'Beyaz Boya Tonlari ve Aralarindaki Farklar | Boyaplus', 'Beyaz boya tonlari arasindaki farklari kesfet. Soguk beyaz, sicak beyaz, kirik beyaz. Mekaniniza uygun tonu secin.', 'beyaz boya, boya tonlari, renk secimi, ic mekan, sicak beyaz, soguk beyaz', 'Beyaz Boya Tonlari ve Farklar', 'Dogru Beyaz Tonu Secimi', 'https://www.boyaplus.com.tr/blog/beyaz-boya-tonlari-arasindaki-farklar', 'index', true),
  ('page', '/blog/kaliteli-boya-nasil-anlasilir', 'Blog: Kaliteli Boya', 'Kaliteli Boya Nasil Anlasilir? Usta Gorusu | Boyaplus', 'Kaliteli boyanin ozelliklerini ogrenin. Ortu gucu, kivam, koku, dayaniklilik ile kaliteyi anlama yollari.', 'boya kalitesi, boya secimi, profesyonel ipuclari, boya alirken, ortu gucu', 'Kaliteli Boya Nasil Anlasilir?', 'Usta Gozuyle Ipuclari', 'https://www.boyaplus.com.tr/blog/kaliteli-boya-nasil-anlasilir', 'index', true)
ON CONFLICT (page_key) DO NOTHING;
