CREATE TABLE IF NOT EXISTS budget_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id     UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  category    VARCHAR(50) NOT NULL,
  label       VARCHAR(200) NOT NULL,
  amount      DECIMAL(12, 2) NOT NULL DEFAULT 0,
  currency    VARCHAR(10) NOT NULL DEFAULT 'INR',
  is_paid     BOOLEAN NOT NULL DEFAULT FALSE,
  paid_date   DATE,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_budget_items_trip ON budget_items(trip_id);
