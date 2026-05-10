-- Migration 018: User events for behavior tracking
CREATE TABLE IF NOT EXISTS user_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type  VARCHAR(50) NOT NULL CHECK (event_type IN (
                'view_city','search_city','save_city','add_city_to_trip',
                'view_activity','add_activity','remove_activity',
                'view_trip','share_trip','search_query')),
  entity_id   UUID,
  entity_type VARCHAR(20) CHECK (entity_type IN ('city','activity','trip')),
  metadata    JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_events_user   ON user_events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_entity ON user_events(entity_id);
CREATE INDEX IF NOT EXISTS idx_events_type   ON user_events(event_type, created_at);
