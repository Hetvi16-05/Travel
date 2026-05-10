CREATE TABLE IF NOT EXISTS stop_activities (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stop_id      UUID NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
  activity_id  UUID REFERENCES activity_catalog(id) ON DELETE SET NULL,
  custom_name  VARCHAR(200),
  custom_note  TEXT,
  time_slot    TIME,
  order_index  INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stop_activities_stop ON stop_activities(stop_id);
