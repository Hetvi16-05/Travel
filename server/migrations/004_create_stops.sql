CREATE TABLE IF NOT EXISTS stops (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_id     UUID REFERENCES cities(id) ON DELETE SET NULL,
  day_number  INT NOT NULL DEFAULT 1,
  order_index INT NOT NULL DEFAULT 0,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stops_trip_id ON stops(trip_id);
