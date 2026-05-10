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
  ('London',    'UK',      'Historic capital with world-class museums.',             51.5074,  -0.1278),
  -- Gujarat, India
  ('Ahmedabad', 'India',   'Manchester of the East — heritage and textiles.',        23.0225,  72.5714),
  ('Surat',     'India',   'The Diamond City — textiles and world-class snacks.',    21.1702,  72.8311),
  ('Vadodara',  'India',   'Cultural capital of Gujarat — palaces and gardens.',     22.3072,  73.1812),
  ('Rajkot',    'India',   'Heart of Saurashtra — rich in history and art.',         22.3039,  70.8022),
  ('Bhuj',      'India',   'Gateway to the Rann of Kutch white desert.',             23.2420,  69.6669),
  ('Dwarka',    'India',   'Ancient kingdom of Lord Krishna on the coast.',          22.2442,  68.9685),
  ('Somnath',   'India',   'Home to the first of twelve Jyotirlinga shrines.',       20.8880,  70.4012),
  ('Sasan Gir', 'India',   'The only home of the majestic Asiatic Lion.',            21.1594,  70.5035),
  ('Kevadia',   'India',   'Home to the Statue of Unity, world''s tallest statue.',  21.8380,  73.7191),
  -- Other Indian States
  ('Srinagar',  'India',   'Paradise on Earth — lakes, gardens, and houseboats.',    34.0837,  74.7973),
  ('Manali',    'India',   'Adventure hub in the snow-capped Himalayas.',            32.2432,  77.1892),
  ('Kochi',     'India',   'Queen of the Arabian Sea — colonial spice port.',        9.9312,   76.2673),
  ('Kolkata',   'India',   'City of Joy — cultural and intellectual capital.',       22.5726,  88.3639),
  ('Hyderabad', 'India',   'City of Pearls — blend of history and technology.',      17.3850,  78.4867),
  ('Amritsar',  'India',   'Spiritual center of Sikhism — The Golden Temple.',       31.6340,  74.8723),
  ('Rishikesh', 'India',   'Yoga Capital of the World on the holy Ganges.',          30.0869,  78.2676),
  ('Leh',       'India',   'High-altitude desert with stunning monasteries.',        34.1526,  77.5770),
  ('Munnar',    'India',   'Rolling tea gardens and misty hills of Kerala.',         10.0889,  77.0595),
  ('Pondicherry','India',  'French Riviera of the East — serene and spiritual.',     11.9416,  79.8083),
  ('Shimla',    'India',   'Summer capital of British India in the Himalayas.',      31.1048,  77.1734)
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

-- Gujarat Activities
INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Sabarmati Ashram Visit', 'culture', 'Mahatma Gandhi''s former residence and museum.', 0, 2, id FROM cities WHERE name = 'Ahmedabad'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Heritage Walk Old City', 'culture', 'Explore the pols and intricate architecture of Ahmedabad.', 200, 3, id FROM cities WHERE name = 'Ahmedabad'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Statue of Unity Observation Deck', 'sightseeing', 'Panoramic views from the world''s tallest statue.', 1500, 4, id FROM cities WHERE name = 'Kevadia'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Rann Utsav Experience', 'culture', 'White desert festival with folk music and crafts.', 5000, 24, id FROM cities WHERE name = 'Bhuj'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Laxmi Vilas Palace Tour', 'sightseeing', 'Grand Maratha palace 4 times the size of Buckingham Palace.', 200, 2, id FROM cities WHERE name = 'Vadodara'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Gir Lion Safari', 'nature', 'Open jeep safari to spot Asiatic lions.', 1000, 3, id FROM cities WHERE name = 'Sasan Gir'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Dumas Beach Stroll', 'nature', 'Famous black sand beach with legendary haunted tales.', 0, 2, id FROM cities WHERE name = 'Surat'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Somnath Temple Darshan', 'culture', 'Spiritual visit to the shore temple of Lord Shiva.', 0, 2, id FROM cities WHERE name = 'Somnath'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Dwarkadhish Temple Visit', 'culture', 'Ancient temple dedicated to Lord Krishna.', 0, 2, id FROM cities WHERE name = 'Dwarka'
ON CONFLICT DO NOTHING;

-- Other India Activities
INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Shikara Ride on Dal Lake', 'nature', 'Peaceful boat ride through floating gardens.', 800, 2, id FROM cities WHERE name = 'Srinagar'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Rohtang Pass Snow Adventure', 'adventure', 'High mountain pass with skiing and snow sports.', 2500, 6, id FROM cities WHERE name = 'Manali'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Golden Temple Visit', 'culture', 'The holiest shrine of Sikhism, stunning at night.', 0, 3, id FROM cities WHERE name = 'Amritsar'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Tea Plantation Walk', 'nature', 'Scenic stroll through Munnar''s emerald green tea estates.', 0, 3, id FROM cities WHERE name = 'Munnar'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Backwaters Houseboat Cruise', 'nature', 'Overnight stay in traditional Kerala houseboats.', 8000, 20, id FROM cities WHERE name = 'Kochi'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Charminar & Laad Bazaar', 'sightseeing', 'Historic monument and bangle shopping in old Hyderabad.', 100, 3, id FROM cities WHERE name = 'Hyderabad'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Victoria Memorial Visit', 'sightseeing', 'Grand marble building dedicated to Queen Victoria.', 50, 2, id FROM cities WHERE name = 'Kolkata'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Ganga Aarti & Yoga Session', 'culture', 'Spiritual experience in the world capital of Yoga.', 0, 3, id FROM cities WHERE name = 'Rishikesh'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Magnetic Hill Wonder', 'adventure', 'Gravity-defying phenomenon on the Leh-Kargil highway.', 0, 1, id FROM cities WHERE name = 'Leh'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'French Quarter Promenade', 'sightseeing', 'Colonial architecture and seaside cafes in Pondy.', 0, 2, id FROM cities WHERE name = 'Pondicherry'
ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, description, price_est, duration_hr, city_id)
SELECT 'Toy Train Ride', 'adventure', 'UNESCO heritage Kalka-Shimla mountain railway ride.', 500, 5, id FROM cities WHERE name = 'Shimla'
ON CONFLICT DO NOTHING;
