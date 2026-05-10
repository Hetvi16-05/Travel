-- Seed file for Traveloop
-- Run: psql $DATABASE_URL -f seeds/seed.sql

-- ─── Cities ─────────────────────────────────────────────────────────────────
INSERT INTO cities (name, country, description, lat, lng) VALUES
  ('Mumbai',    'India',   'The city of dreams — financial capital of India.',       19.0760,  72.8777),
  ('Delhi',     'India',   'India''s vibrant capital blending old and new.',          28.6139,  77.2090),
  ('Goa',       'India',   'Beaches, nightlife, and Portuguese heritage.',            15.2993,  74.1240),
  ('Jaipur',    'India',   'The Pink City — palaces, forts, and bazaars.',           26.9124,  75.7873),
  ('Varanasi',  'India',   'One of the world''s oldest cities on the Ganges.',        25.3176,  82.9739),
  ('Bengaluru', 'India',   'India''s tech hub with a thriving café culture.',         12.9716,  77.5946),
  ('Agra',      'India',   'Home to the iconic Taj Mahal.',                          27.1767,  78.0081),
  ('Udaipur',   'India',   'City of Lakes — the most romantic city in India.',       24.5854,  73.7125),
  ('Paris',     'France',  'The city of light, love, and world-class cuisine.',      48.8566,   2.3522),
  ('Tokyo',     'Japan',   'Ultra-modern meets ancient tradition.',                  35.6762, 139.6503),
  ('New York',  'USA',     'The city that never sleeps.',                            40.7128, -74.0060),
  ('Bali',      'Indonesia','Spiritual island paradise with rice terraces.',         -8.4095, 115.1889),
  ('Dubai',     'UAE',     'Futuristic skyline and luxury in the desert.',           25.2048,  55.2708),
  ('Singapore', 'Singapore','Garden city — spotless, efficient, and diverse.',        1.3521, 103.8198),
  ('London',    'UK',      'Historic capital with world-class museums.',             51.5074,  -0.1278)
ON CONFLICT DO NOTHING;

-- ─── Activity Catalog ────────────────────────────────────────────────────────
INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Gateway of India Visit', 'sightseeing', 'Iconic arch monument on the waterfront.', 0, 1.5, id FROM cities WHERE name = 'Mumbai'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Marine Drive Stroll', 'sightseeing', 'Evening walk along the Queen''s Necklace.', 0, 1, id FROM cities WHERE name = 'Mumbai'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Taj Mahal Sunrise Visit', 'sightseeing', 'Watch dawn break over the Taj Mahal.', 1300, 3, id FROM cities WHERE name = 'Agra'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Amber Fort Tour', 'culture', 'Majestic hill fort with elephant rides.', 500, 3, id FROM cities WHERE name = 'Jaipur'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Ganga Aarti at Dashashwamedh Ghat', 'culture', 'Nightly fire ritual on the holy river.', 0, 2, id FROM cities WHERE name = 'Varanasi'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Baga Beach Sunbathing', 'nature', 'Relax on Goa''s most popular beach.', 0, 4, id FROM cities WHERE name = 'Goa'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Eiffel Tower Visit', 'sightseeing', 'Iconic iron lattice tower with city views.', 2800, 2, id FROM cities WHERE name = 'Paris'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Tsukiji Outer Market Food Tour', 'food', 'Fresh sushi and street food at Tokyo''s famous market.', 1500, 2, id FROM cities WHERE name = 'Tokyo'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Burj Khalifa Sky View', 'sightseeing', 'Observation deck on the world''s tallest building.', 6500, 2, id FROM cities WHERE name = 'Dubai'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Gardens by the Bay', 'nature', 'Futuristic nature park with Supertree Grove.', 1200, 3, id FROM cities WHERE name = 'Singapore'
ON CONFLICT DO NOTHING;
