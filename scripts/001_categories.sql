CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "categories_all" ON categories;
CREATE POLICY "categories_all" ON categories FOR ALL USING (true) WITH CHECK (true);

INSERT INTO categories (name, slug) VALUES
  ('İç Cephe Boyaları', 'ic-cephe'),
  ('Dış Cephe Boyaları', 'dis-cephe'),
  ('Ahşap Boyaları', 'ahsap'),
  ('Metal Boyaları', 'metal')
ON CONFLICT (slug) DO NOTHING;
