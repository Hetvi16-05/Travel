CREATE TABLE IF NOT EXISTS checklist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  label       VARCHAR(300) NOT NULL,
  category    VARCHAR(50) NOT NULL DEFAULT 'misc',
  is_done     BOOLEAN NOT NULL DEFAULT FALSE,
  order_index INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_checklist_trip ON checklist_items(trip_id);
