CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('iPhones', 'Samsung', 'Airpods', 'Powerbanks', 'Smartwatches')),
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_products" ON products FOR DELETE
  TO authenticated USING (true);
