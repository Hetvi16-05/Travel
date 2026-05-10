-- Migration 015: User Preferences
-- Stores user travel preferences for personalized recommendations

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id          UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  preferred_budget VARCHAR(20) DEFAULT 'mid'
                   CHECK (preferred_budget IN ('budget','mid','luxury')),
  travel_style     TEXT[] DEFAULT ARRAY[]::TEXT[],
  preferred_group  VARCHAR(20) DEFAULT 'solo'
                   CHECK (preferred_group IN ('solo','couple','family','group')),
  home_country     VARCHAR(100),
  preferred_climate VARCHAR(20) DEFAULT 'any'
                   CHECK (preferred_climate IN ('tropical','temperate','cold','desert','any')),
  onboarding_done  BOOLEAN DEFAULT FALSE,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);
