-- Migration 020: Trip scores — computed after any trip mutation
CREATE TABLE IF NOT EXISTS trip_scores (
  trip_id           UUID PRIMARY KEY REFERENCES trips(id) ON DELETE CASCADE,
  budget_score      NUMERIC(4,2),
  variety_score     NUMERIC(4,2),
  pace_score        NUMERIC(4,2),
  feasibility_score NUMERIC(4,2),
  overall_score     NUMERIC(4,2),
  warnings          JSONB,
  tips              JSONB,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
