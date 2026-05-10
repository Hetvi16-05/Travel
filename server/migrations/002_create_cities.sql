CREATE TABLE IF NOT EXISTS cities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(150) NOT NULL,
  country     VARCHAR(100) NOT NULL,
  description TEXT,
  image_url   TEXT,
  lat         DECIMAL(10, 7),
  lng         DECIMAL(10, 7),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(LOWER(name));
CREATE INDEX IF NOT EXISTS idx_cities_country ON cities(LOWER(country));
