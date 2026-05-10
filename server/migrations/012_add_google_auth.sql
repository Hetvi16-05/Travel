-- Add Google OAuth support to users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE,
  ALTER COLUMN password_hash DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
