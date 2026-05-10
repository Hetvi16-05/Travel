-- Enhance trips table to support UI features
ALTER TABLE trips 
ADD COLUMN IF NOT EXISTS budget      DECIMAL(12, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS spent       DECIMAL(12, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS status      VARCHAR(20) DEFAULT 'planned',
ADD COLUMN IF NOT EXISTS destination VARCHAR(255);
