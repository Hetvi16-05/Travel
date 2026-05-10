CREATE TABLE IF NOT EXISTS activity_catalog (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(200) NOT NULL,
  category    VARCHAR(50) NOT NULL,
  city_id     UUID REFERENCES cities(id) ON DELETE CASCADE,
  description TEXT,
  price_est   DECIMAL(10, 2),
  duration_hr DECIMAL(4, 1),
  image_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_catalog_city ON activity_catalog(city_id);
CREATE INDEX IF NOT EXISTS idx_activity_catalog_category ON activity_catalog(category);
