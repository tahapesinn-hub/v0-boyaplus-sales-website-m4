-- Boyaplus site veritabani semasi

-- Kategoriler tablosu
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Urunler tablosu
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  coverage TEXT,
  drying_time TEXT,
  price TEXT,
  colors TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site ayarlari tablosu (hero, contact, seo)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin kullanicilari tablosu
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS aktif et
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Kategoriler icin policy
CREATE POLICY "categories_select" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "categories_update" ON categories FOR UPDATE USING (true);
CREATE POLICY "categories_delete" ON categories FOR DELETE USING (true);

-- Urunler icin policy
CREATE POLICY "products_select" ON products FOR SELECT USING (true);
CREATE POLICY "products_insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "products_update" ON products FOR UPDATE USING (true);
CREATE POLICY "products_delete" ON products FOR DELETE USING (true);

-- Site ayarlari icin policy
CREATE POLICY "site_settings_select" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_insert" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "site_settings_update" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "site_settings_delete" ON site_settings FOR DELETE USING (true);

-- Admin kullanicilari icin policy
CREATE POLICY "admin_users_select" ON admin_users FOR SELECT USING (true);
CREATE POLICY "admin_users_insert" ON admin_users FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_users_update" ON admin_users FOR UPDATE USING (true);
CREATE POLICY "admin_users_delete" ON admin_users FOR DELETE USING (true);

-- Varsayilan kategorileri ekle
INSERT INTO categories (name, slug) VALUES
  ('İç Cephe Boyaları', 'ic-cephe'),
  ('Dış Cephe Boyaları', 'dis-cephe'),
  ('Ahşap Boyaları', 'ahsap'),
  ('Metal Boyaları', 'metal')
ON CONFLICT (slug) DO NOTHING;

-- Varsayilan admin kullanicisi
INSERT INTO admin_users (username, password, name, role) VALUES
  ('admin', 'boyaplusadmin', 'Ana Yönetici', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Varsayilan site ayarlari
INSERT INTO site_settings (id, data) VALUES
  ('hero', '{"title": "Duvarlarınıza Hayat Verin", "subtitle": "Premium kalite iç ve dış cephe boyaları ile mekanlarınızı dönüştürün. 25 yıllık tecrübe, binlerce mutlu müşteri.", "buttonText": "Ürünleri Keşfet", "buttonLink": "/urunler"}'),
  ('contact', '{"phone": "+90 212 555 0000", "whatsapp": "905321234567", "email": "info@boyaplus.com", "address": "Organize Sanayi Bölgesi, 1. Cadde No:15, Tuzla, İstanbul", "workingHours": "Pazartesi - Cumartesi: 08:00 - 18:00"}'),
  ('seo', '{"title": "Boyaplus | Premium Türk Boya Markası", "description": "Boyaplus ile duvarlarınıza hayat verin. Premium kalite iç ve dış cephe boyaları, profesyonel çözümler.", "keywords": "boya, türk boya, iç cephe, dış cephe, premium boya, boyaplus"}')
ON CONFLICT (id) DO NOTHING;
