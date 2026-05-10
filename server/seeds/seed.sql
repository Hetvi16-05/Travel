-- Comprehensive Seed file for Travia (Real Images)
-- Run: psql $DATABASE_URL -f seeds/seed.sql

-- ─── Cities ─────────────────────────────────────────────────────────────────
INSERT INTO cities (name, country, description, lat, lng, image_url) VALUES
  ('Mumbai',    'India',   'The city of dreams — financial capital of India.',       19.0760,  72.8777, 'https://images.unsplash.com/photo-1570160897040-30430ef2218b?w=1200&q=80'),
  ('Delhi',     'India',   'India''s vibrant capital blending old and new.',          28.6139,  77.2090, 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80'),
  ('Goa',       'India',   'Beaches, nightlife, and Portuguese heritage.',            15.2993,  74.1240, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80'),
  ('Jaipur',    'India',   'The Pink City — palaces, forts, and bazaars.',           26.9124,  75.7873, 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80'),
  ('Paris',     'France',  'The city of light, love, and world-class cuisine.',      48.8566,   2.3522, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80'),
  ('Tokyo',     'Japan',   'Ultra-modern meets ancient tradition.',                  35.6762, 139.6503, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80'),
  ('Bali',      'Indonesia','Spiritual island paradise with rice terraces.',         -8.4095, 115.1889, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80'),
  ('London',    'UK',      'Historic capital with world-class museums.',             51.5074,  -0.1278, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80'),
  ('Ahmedabad', 'India',   'Manchester of the East — heritage and textiles.',        23.0225,  72.5714, 'https://images.unsplash.com/photo-1589136777351-fdc6c9380370?w=1200&q=80'),
  ('Santorini', 'Greece',  'Stunning white-washed buildings on volcanic cliffs.',    36.3932,  25.4615, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac542?w=1200&q=80'),
  ('Dubai',     'UAE',     'A city of superlatives, luxury, and futuristic architecture.', 25.2048, 55.2708, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80'),
  ('New York',  'USA',     'The cultural and financial hub of the world.',           40.7128, -74.0060, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80')
ON CONFLICT (id) DO NOTHING;

-- ─── Users ──────────────────────────────────────────────────────────────────
INSERT INTO users (id, name, email, password_hash, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Sneha Patel', 'sneha@travia.ai', '$2a$12$R.S7W.mYI0x.0zRjY.O/7.G6jI9pU9r1vW6kP8r0xW6kP8r0xW6kP', 'admin')
ON CONFLICT (id) DO NOTHING;

-- ─── Trips ──────────────────────────────────────────────────────────────────
INSERT INTO trips (id, user_id, title, destination, cover_image, start_date, end_date, budget, spent, status) VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Summer in Japan', 'Tokyo, Kyoto', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80', '2024-06-15', '2024-06-25', 150000, 120000, 'upcoming'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'Parisian Dream', 'Paris, France', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80', '2023-09-10', '2023-09-17', 200000, 210000, 'completed'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'Goa Beach Bash', 'Goa, India', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80', '2024-12-20', '2024-12-27', 50000, 0, 'planned')
ON CONFLICT (id) DO NOTHING;

-- ─── Stops ──────────────────────────────────────────────────────────────────
INSERT INTO stops (trip_id, city_id, day_number, order_index)
SELECT '11111111-1111-1111-1111-111111111111'::UUID, id, 1, 0 FROM cities WHERE name = 'Tokyo'
UNION ALL
SELECT '22222222-2222-2222-2222-222222222222'::UUID, id, 1, 0 FROM cities WHERE name = 'Paris'
UNION ALL
SELECT '33333333-3333-3333-3333-333333333333'::UUID, id, 1, 0 FROM cities WHERE name = 'Goa'
ON CONFLICT DO NOTHING;

-- ─── Saved Destinations ─────────────────────────────────────────────────────
INSERT INTO saved_destinations (user_id, city_id)
SELECT '00000000-0000-0000-0000-000000000001', id FROM cities WHERE name IN ('Bali', 'London', 'Ahmedabad', 'Delhi')
ON CONFLICT DO NOTHING;

-- ─── Activity Catalog ────────────────────────────────────────────────────────
INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id, image_url)
SELECT 'Shibuya Crossing Walk', 'sightseeing', 'Experience the world''s busiest pedestrian crossing.', 0, 1, id, 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80' FROM cities WHERE name = 'Tokyo'
UNION ALL
SELECT 'Eiffel Tower Picnic', 'food', 'Enjoy cheese and wine on the Champ de Mars.', 5000, 3, id, 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&q=80' FROM cities WHERE name = 'Paris'
UNION ALL
SELECT 'Scuba Diving at Grande Island', 'adventure', 'Explore the underwater world of the Arabian Sea.', 4500, 4, id, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' FROM cities WHERE name = 'Goa'
UNION ALL
SELECT 'Burj Khalifa View', 'sightseeing', 'Observation deck on the world''s tallest building.', 6500, 2, id, 'https://images.unsplash.com/photo-1582972236019-ea4af5faf521?w=800&q=80' FROM cities WHERE name = 'Dubai'
ON CONFLICT DO NOTHING;
