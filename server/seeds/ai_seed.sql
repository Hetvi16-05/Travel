-- ============================================================
-- AI Planner Seed — Cities + Activity Catalog
-- Run: psql $DATABASE_URL -f seeds/ai_seed.sql
-- ============================================================

-- ─── CITIES ──────────────────────────────────────────────────
INSERT INTO cities (name, country, description, image_url, lat, lng) VALUES
  ('Goa', 'India', 'India''s beach paradise with Portuguese heritage, vibrant nightlife, and laid-back vibes.', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 15.2993, 74.1240),
  ('Udaipur', 'India', 'The City of Lakes — romantic palaces, shimmering lakes, and Rajput grandeur.', 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', 24.5854, 73.7125),
  ('Manali', 'India', 'Snow-capped Himalayan retreat perfect for adventure, trekking, and river sports.', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', 32.2396, 77.1887),
  ('Jaipur', 'India', 'The Pink City — majestic forts, colourful bazaars, and royal Rajasthani culture.', 'https://images.unsplash.com/photo-1477587458883-47145ed31459?w=800', 26.9124, 75.7873),
  ('Kerala', 'India', 'God''s Own Country — backwaters, spice gardens, Ayurveda, and lush greenery.', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800', 10.8505, 76.2711),
  ('Rishikesh', 'India', 'The Yoga Capital of the World — riverside ashrams, white-water rafting, and spiritual retreats.', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', 30.0869, 78.2676),
  ('Coorg', 'India', 'Scotland of India — coffee plantations, misty hills, waterfalls, and tribal culture.', 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800', 12.3375, 75.8069),
  ('Spiti Valley', 'India', 'Remote Himalayan desert valley with ancient monasteries, dramatic landscapes, and starry skies.', 'https://images.unsplash.com/photo-1626016120824-5c0af2beac72?w=800', 32.2461, 78.0339),
  ('Varanasi', 'India', 'The spiritual heart of India — ancient ghats, dawn aarti, silk weaving, and timeless culture.', 'https://images.unsplash.com/photo-1561361058-c24e73f4e4c5?w=800', 25.3176, 82.9739),
  ('Andaman Islands', 'India', 'Crystal-clear waters, pristine beaches, coral reefs, and WWII history in the Bay of Bengal.', 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800', 11.7401, 92.6586),
  ('Darjeeling', 'India', 'Queen of the Hills — toy trains, tea gardens, Himalayan views, and colonial charm.', 'https://images.unsplash.com/photo-1544120285-d02c82789e9c?w=800', 27.0410, 88.2663),
  ('Hampi', 'India', 'UNESCO World Heritage ruins of the Vijayanagara Empire set amid giant boulder landscapes.', 'https://images.unsplash.com/photo-1590050751815-5a5b6982a78f?w=800', 15.3350, 76.4600)
ON CONFLICT DO NOTHING;

-- ─── ACTIVITY CATALOG ────────────────────────────────────────
-- We reference cities by name subquery for portability

-- GOA ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Beach Hopping — Anjuna & Vagator', 'Beach', id, 'Explore the rocky shores of Anjuna and the scenic Vagator beach. Grab lunch at Curlies beach shack.', 300, 4 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Sunset at Chapora Fort', 'Culture', id, 'Hike up the iconic Chapora Fort for a breathtaking panoramic sunset view over the Arabian Sea.', 0, 2 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Water Sports at Baga Beach', 'Adventure', id, 'Parasailing, jet skiing, banana boat rides, and windsurfing at Baga beach.', 1500, 3 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Old Goa Heritage Tour', 'Culture', id, 'Visit Basilica of Bom Jesus, Se Cathedral, and explore the Portuguese colonial quarter.', 200, 3 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Fontainhas Latin Quarter Walk', 'Culture', id, 'Wander through Panjim''s colourful heritage neighbourhood with its narrow lanes and colonial bungalows.', 0, 2 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Dudhsagar Waterfall Trek', 'Adventure', id, 'Epic day trip to India''s tallest waterfall deep in the Goa jungle. Includes jeep safari.', 800, 8 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Spice Plantation Tour', 'Nature', id, 'Tour an organic spice plantation, learn about tropical spices, and enjoy a traditional Goan lunch.', 600, 4 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Saturday Night Market', 'Food', id, 'Explore the Arpora night market — street food, handicrafts, live music, and shopping under the stars.', 500, 3 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Goan Seafood Feast', 'Food', id, 'Authentic Goan meal with prawn curry, fish thali, bebinca, and fresh coconut water at a local shack.', 700, 1.5 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'South Goa Beach Day — Palolem', 'Beach', id, 'Serene crescent beach with calm waters, perfect for swimming, kayaking, and dolphin spotting.', 400, 5 FROM cities WHERE name = 'Goa' ON CONFLICT DO NOTHING;

-- UDAIPUR ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'City Palace Tour', 'Culture', id, 'Explore the grand City Palace complex overlooking Lake Pichola — museums, terraces, and royal apartments.', 300, 3 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Lake Pichola Sunset Boat Ride', 'Relaxation', id, 'Romantic sunset boat cruise on Lake Pichola with views of Jag Mandir and the illuminated City Palace.', 700, 1.5 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Jagdish Temple Visit', 'Culture', id, 'Magnificent 17th-century Indo-Aryan temple dedicated to Lord Vishnu, with beautiful stone carvings.', 0, 1 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Bagore Ki Haveli Cultural Show', 'Culture', id, 'Evening folk dance and puppet show at this restored 18th-century mansion on the ghats of Lake Pichola.', 150, 2 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Saheliyon ki Bari Gardens', 'Nature', id, 'Ornate royal garden built for royal ladies — fountains, lotus pools, marble elephants, and peacocks.', 50, 1.5 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Vintage Car Museum', 'Culture', id, 'Rare collection of vintage automobiles, including Rolls Royces, Cadillacs, and royal transport vehicles.', 250, 1.5 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Rajasthani Thali Dinner', 'Food', id, 'Unlimited traditional Rajasthani thali at Natraj — dal baati churma, gatte ki sabzi, and laal maas.', 400, 1.5 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Haldi Ghati & Kumbhalgarh Day Trip', 'Adventure', id, 'Historic battle site and the second-longest wall in the world — spectacular Aravalli landscapes.', 1200, 8 FROM cities WHERE name = 'Udaipur' ON CONFLICT DO NOTHING;

-- MANALI ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Solang Valley Snow Adventure', 'Adventure', id, 'Skiing, snow tubing, and zorbing on the pristine slopes of Solang Valley.', 1500, 5 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Rohtang Pass Excursion', 'Adventure', id, 'Drive over the legendary Rohtang Pass (3978m) with panoramic Himalayan snow views.', 2000, 8 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Beas River Rafting', 'Adventure', id, 'White-water river rafting through Grade III-IV rapids on the roaring Beas River.', 800, 3 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Hadimba Devi Temple', 'Culture', id, 'Ancient wooden temple set in a cedar forest dedicated to Goddess Hadimba — stunning Himalayan backdrop.', 0, 1.5 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Old Manali Cafe Crawl', 'Food', id, 'Explore the bohemian cafes of Old Manali — try yak cheese pizza, Tibetan momos, and apple cider.', 600, 3 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Naggar Castle & Roerich Gallery', 'Culture', id, 'Medieval castle with stunning valley views and the legacy of Russian painter Nicholas Roerich.', 150, 3 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Paragliding over Manali Valley', 'Adventure', id, 'Tandem paragliding from Dobi with breathtaking aerial views over the Kullu-Manali valley.', 2500, 2 FROM cities WHERE name = 'Manali' ON CONFLICT DO NOTHING;

-- JAIPUR ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Amer Fort with Light & Sound Show', 'Culture', id, 'Explore the magnificent Amer Fort by day and watch the dramatic evening light and sound show.', 500, 5 FROM cities WHERE name = 'Jaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Hawa Mahal & City Palace', 'Culture', id, 'The iconic Palace of Winds and the royal City Palace museum — architecture photography paradise.', 250, 4 FROM cities WHERE name = 'Jaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Johari Bazaar Shopping', 'Culture', id, 'Hunt for gems, silver jewellery, block-print fabrics, blue pottery, and Rajasthani handicrafts.', 0, 3 FROM cities WHERE name = 'Jaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Jantar Mantar Observatory', 'Culture', id, 'World''s largest stone astronomical instruments — UNESCO World Heritage Site built by Maharaja Jai Singh.', 100, 1.5 FROM cities WHERE name = 'Jaipur' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Elephant Safari at Amer', 'Adventure', id, 'Ride majestic elephants up the hillside to Amer Fort — a quintessential Jaipur experience.', 1200, 2 FROM cities WHERE name = 'Jaipur' ON CONFLICT DO NOTHING;

-- KERALA ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Alleppey Houseboat Cruise', 'Relaxation', id, 'Overnight stay on a traditional Kerala houseboat drifting through the enchanting backwaters.', 6000, 24 FROM cities WHERE name = 'Kerala' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Munnar Tea Plantation Walk', 'Nature', id, 'Guided walk through rolling emerald tea estates in the Nilgiris with a tea-tasting session.', 400, 4 FROM cities WHERE name = 'Kerala' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Ayurvedic Spa & Massage', 'Relaxation', id, 'Traditional Panchakarma Ayurvedic treatment — full-body oil massage and herbal steam therapy.', 2500, 3 FROM cities WHERE name = 'Kerala' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Periyar Wildlife Safari', 'Nature', id, 'Boat safari in Periyar Tiger Reserve — spot wild elephants, gaur, deer, and exotic birds.', 800, 5 FROM cities WHERE name = 'Kerala' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Kerala Sadya Feast', 'Food', id, 'A grand traditional meal served on a banana leaf — 20+ dishes including avial, payasam, and rice.', 350, 1.5 FROM cities WHERE name = 'Kerala' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Kathakali Performance', 'Culture', id, 'Watch the ancient classical dance-drama with elaborate makeup, costumes, and mythological storytelling.', 350, 2 FROM cities WHERE name = 'Kerala' ON CONFLICT DO NOTHING;

-- RISHIKESH ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Ganga Aarti at Triveni Ghat', 'Culture', id, 'Witness the mesmerizing evening fire ceremony on the sacred banks of the Ganga at sunset.', 0, 1.5 FROM cities WHERE name = 'Rishikesh' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'White Water Rafting — Grade IV', 'Adventure', id, 'Thrilling 16km rafting expedition from Shivpuri to Laxman Jhula through powerful Himalayan rapids.', 1200, 4 FROM cities WHERE name = 'Rishikesh' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Yoga & Meditation Retreat', 'Relaxation', id, 'Morning yoga and pranayama session with a certified instructor on the Ganga ghats at sunrise.', 500, 2 FROM cities WHERE name = 'Rishikesh' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Bungee Jumping at Mohan Chatti', 'Adventure', id, 'India''s highest fixed-platform bungee jump (83m) from a cliff above the Ganga gorge.', 3500, 3 FROM cities WHERE name = 'Rishikesh' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Beatles Ashram Ruins Explore', 'Culture', id, 'Walk through the atmospheric ruins of Maharishi Mahesh Yogi''s ashram where The Beatles stayed in 1968.', 600, 2 FROM cities WHERE name = 'Rishikesh' ON CONFLICT DO NOTHING;

-- SPITI VALLEY ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Key Monastery Visit', 'Culture', id, 'Ancient Tibetan Buddhist monastery perched at 4166m — oldest in Spiti with rare frescoes and scriptures.', 100, 3 FROM cities WHERE name = 'Spiti Valley' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Chandratal Lake Trek', 'Adventure', id, 'Trek to the Moon Lake — a stunning crescent-shaped alpine lake at 4300m with mirror-clear blue water.', 500, 8 FROM cities WHERE name = 'Spiti Valley' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Homestay Village Experience', 'Culture', id, 'Stay with a Spitian family in Kibber village — local cuisine, yak herding, and traditional life.', 800, 24 FROM cities WHERE name = 'Spiti Valley' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Stargazing in Spiti Desert', 'Nature', id, 'Far from city lights, Spiti offers some of the darkest skies in Asia — Milky Way and meteor showers.', 0, 3 FROM cities WHERE name = 'Spiti Valley' ON CONFLICT DO NOTHING;

-- VARANASI ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Dawn Boat Ride on the Ganga', 'Culture', id, 'Row along the ancient ghats at sunrise — witness morning prayers, bathing rituals, and burning ghats.', 300, 2 FROM cities WHERE name = 'Varanasi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Dashashwamedh Ghat Aarti', 'Culture', id, 'The grand Ganga Aarti ceremony with fire, incense, and chanting — one of India''s most spiritual spectacles.', 0, 1.5 FROM cities WHERE name = 'Varanasi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Silk Weaving Workshop', 'Culture', id, 'Visit a traditional Banarasi silk saree weaver and witness the intricate handloom craft up close.', 200, 2 FROM cities WHERE name = 'Varanasi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Kashi Vishwanath Temple Darshan', 'Culture', id, 'Visit one of the 12 Jyotirlingas — the sacred Shiva temple in the heart of Varanasi''s old city.', 0, 2 FROM cities WHERE name = 'Varanasi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Malaiyo & Banarasi Street Food Walk', 'Food', id, 'Try the ethereal winter fog dessert Malaiyo, kachori-sabzi, thandai, and paan on a guided food walk.', 400, 2.5 FROM cities WHERE name = 'Varanasi' ON CONFLICT DO NOTHING;

-- ANDAMAN ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Scuba Diving at Havelock Island', 'Adventure', id, 'Explore vibrant coral reefs and tropical marine life at Elephant Beach — perfect for beginners.', 3500, 4 FROM cities WHERE name = 'Andaman Islands' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Radhanagar Beach Sunset', 'Beach', id, 'Ranked Asia''s best beach — walk the pristine white sands and watch the dramatic tropical sunset.', 0, 3 FROM cities WHERE name = 'Andaman Islands' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Cellular Jail Light & Sound Show', 'Culture', id, 'The infamous British-era prison — witness the haunting evening sound and light show narrating freedom fighters'' stories.', 200, 2 FROM cities WHERE name = 'Andaman Islands' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Glass-Bottom Boat Ride', 'Nature', id, 'See the coral gardens and reef fish without getting wet on a glass-bottom boat tour.', 800, 2 FROM cities WHERE name = 'Andaman Islands' ON CONFLICT DO NOTHING;

-- DARJEELING ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Tiger Hill Sunrise over Kanchenjunga', 'Nature', id, 'Pre-dawn jeep ride to Tiger Hill for the iconic sunrise view over Kanchenjunga and Everest peaks.', 500, 4 FROM cities WHERE name = 'Darjeeling' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Darjeeling Himalayan Railway Toy Train', 'Culture', id, 'Ride the UNESCO heritage steam toy train through misty tea gardens and colonial hill stations.', 1200, 3 FROM cities WHERE name = 'Darjeeling' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Tea Estate Tour & Tasting', 'Nature', id, 'Visit the famous Happy Valley Tea Estate — see the plucking process and taste first-flush Darjeeling tea.', 200, 3 FROM cities WHERE name = 'Darjeeling' ON CONFLICT DO NOTHING;

-- HAMPI ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Virupaksha Temple & Hampi Bazaar', 'Culture', id, 'Explore the 7th-century Shaivite temple and the ancient market street lined with ruined gopurams.', 50, 3 FROM cities WHERE name = 'Hampi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Boulder Sunrise Climb', 'Adventure', id, 'Climb the giant granite boulders behind Matanga Hill for a 360° sunrise view over the ruins.', 0, 3 FROM cities WHERE name = 'Hampi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Coracle Ride on Tungabhadra', 'Adventure', id, 'Spin across the sacred Tungabhadra river in a traditional circular coracle boat.', 150, 1 FROM cities WHERE name = 'Hampi' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Vittala Temple & Stone Chariot', 'Culture', id, 'The crown jewel of Hampi — the musical pillars and iconic stone chariot of the Vittala temple complex.', 600, 3 FROM cities WHERE name = 'Hampi' ON CONFLICT DO NOTHING;

-- COORG ACTIVITIES
INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Coffee Plantation Estate Walk', 'Nature', id, 'Walk through aromatic Arabica and Robusta coffee estates with a master planter as guide.', 500, 3 FROM cities WHERE name = 'Coorg' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Abbey Falls & Namdroling Monastery', 'Nature', id, 'Trek to the cascading Abbey Falls and visit the golden Tibetan Buddhist monastery in Bylakuppe.', 300, 5 FROM cities WHERE name = 'Coorg' ON CONFLICT DO NOTHING;

INSERT INTO activity_catalog (name, category, city_id, description, price_est, duration_hr) 
SELECT 'Fishing & River Camping', 'Adventure', id, 'Riverside camping with angling for mahseer fish on the Cauvery river in Dubare Elephant Camp.', 2000, 8 FROM cities WHERE name = 'Coorg' ON CONFLICT DO NOTHING;
