-- Migration 022: Add payment status to trips
ALTER TABLE trips ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'unpaid';
