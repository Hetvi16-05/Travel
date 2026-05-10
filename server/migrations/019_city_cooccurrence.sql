-- Migration 019: Co-occurrence tables for "people who visited X also visited Y"

CREATE TABLE IF NOT EXISTS city_cooccurrence (
  city_a_id  UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  city_b_id  UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  frequency  INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (city_a_id, city_b_id)
);

CREATE TABLE IF NOT EXISTS popular_routes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_city   UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  dest_city     UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  frequency     INT DEFAULT 1,
  avg_days_stay NUMERIC(4,1) DEFAULT 3,
  UNIQUE (origin_city, dest_city)
);
