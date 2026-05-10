-- Migration 017: Enrich activity_catalog with recommendation signals
ALTER TABLE activity_catalog
  ADD COLUMN IF NOT EXISTS tags              TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS best_for          TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS indoor            BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS booking_required  BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS view_count        INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS add_count         INT DEFAULT 0;
