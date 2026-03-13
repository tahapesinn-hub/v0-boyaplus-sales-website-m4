CREATE TABLE IF NOT EXISTS services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'Paintbrush',
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

INSERT INTO services (title, slug, description, icon, sort_order) VALUES
  ('Ic Cephe Boya', 'ic-cephe-boya', 'Evinizin ic mekanlarini canlandirin. Premium ic cephe boyalari ile estetik ve dayanikli cozumler.', 'Home', 1),
  ('Dis Cephe Boya', 'dis-cephe-boya', 'Binanizin dis cephesini koruyun ve guzel gosterin. Her turlu hava kosuluna dayanikli boyalar.', 'Building2', 2),
  ('Ahsap Boyama', 'ahsap-boyama', 'Ahsap yuzeyler icin ozel formullu boyalar. Dogal guzellik, uzun omurlu koruma.', 'TreePine', 3),
  ('Metal Boyama', 'metal-boyama', 'Metal yuzeyler icin antipas ve dekoratif boyalar. Pas onleyici, dayanikli.', 'Wrench', 4),
  ('Dekoratif Boya', 'dekoratif-boya', 'Mekanlariniza karakter katin. Desenli, dokulu ve efektli dekoratif boya cozumleri.', 'Palette', 5)
ON CONFLICT (slug) DO NOTHING;
