CREATE TABLE IF NOT EXISTS saved_destinations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city_id    UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  saved_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, city_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_dest_user ON saved_destinations(user_id);
