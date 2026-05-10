-- Intelligence Seed Data: Enrich all cities with tags, costs, safety scores, etc.
-- This data powers the recommendation engine and AI planner.

-- ═══ INDIA ═══════════════════════════════════════════════════════════════

UPDATE cities SET tags = ARRAY['history','culture','architecture','romance'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 60, safety_score = 7.0, continent = 'Asia', popularity_score = 90, solo_friendly = true, family_friendly = true WHERE name = 'Agra';

UPDATE cities SET tags = ARRAY['food','culture','history','heritage'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 55, safety_score = 7.5, continent = 'Asia', popularity_score = 50, solo_friendly = true, family_friendly = true WHERE name = 'Ahmedabad';

UPDATE cities SET tags = ARRAY['culture','food','history','spiritual'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 50, safety_score = 8.0, continent = 'Asia', popularity_score = 70, solo_friendly = true, family_friendly = true WHERE name = 'Amritsar';

UPDATE cities SET tags = ARRAY['beach','nature','adventure','diving','island'], best_months = ARRAY[10,11,12,1,2,3,4,5], avg_daily_cost = 80, safety_score = 8.5, continent = 'Asia', popularity_score = 75, solo_friendly = true, family_friendly = true WHERE name = 'Andaman Islands';

UPDATE cities SET tags = ARRAY['culture','food','technology','urban','nightlife'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 65, safety_score = 8.0, continent = 'Asia', popularity_score = 60, solo_friendly = true, family_friendly = true WHERE name = 'Bengaluru';

UPDATE cities SET tags = ARRAY['culture','history','desert','handicrafts'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 40, safety_score = 7.5, continent = 'Asia', popularity_score = 30, solo_friendly = true, family_friendly = true WHERE name = 'Bhuj';

UPDATE cities SET tags = ARRAY['nature','relaxation','coffee','trekking'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 55, safety_score = 8.5, continent = 'Asia', popularity_score = 65, solo_friendly = true, family_friendly = true WHERE name = 'Coorg';

UPDATE cities SET tags = ARRAY['nature','tea','colonial','mountain','relaxation'], best_months = ARRAY[3,4,5,9,10,11], avg_daily_cost = 50, safety_score = 8.0, continent = 'Asia', popularity_score = 60, solo_friendly = true, family_friendly = true WHERE name = 'Darjeeling';

UPDATE cities SET tags = ARRAY['history','culture','food','shopping','heritage'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 70, safety_score = 6.5, continent = 'Asia', popularity_score = 85, solo_friendly = true, family_friendly = true WHERE name = 'Delhi';

UPDATE cities SET tags = ARRAY['history','spiritual','temple','coastal'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 45, safety_score = 8.0, continent = 'Asia', popularity_score = 35, solo_friendly = true, family_friendly = true WHERE name = 'Dwarka';

UPDATE cities SET tags = ARRAY['beach','nightlife','food','relaxation','party','nature'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 60, safety_score = 8.0, continent = 'Asia', popularity_score = 95, solo_friendly = true, family_friendly = false WHERE name = 'Goa';

UPDATE cities SET tags = ARRAY['history','culture','architecture','ruins','heritage'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 35, safety_score = 8.0, continent = 'Asia', popularity_score = 65, solo_friendly = true, family_friendly = true WHERE name = 'Hampi';

UPDATE cities SET tags = ARRAY['food','culture','history','technology'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 55, safety_score = 7.5, continent = 'Asia', popularity_score = 55, solo_friendly = true, family_friendly = true WHERE name = 'Hyderabad';

UPDATE cities SET tags = ARRAY['culture','history','architecture','shopping','desert','heritage'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 55, safety_score = 8.0, continent = 'Asia', popularity_score = 88, solo_friendly = true, family_friendly = true WHERE name = 'Jaipur';

UPDATE cities SET tags = ARRAY['nature','backwaters','relaxation','food','beach','ayurveda'], best_months = ARRAY[9,10,11,12,1,2,3], avg_daily_cost = 65, safety_score = 8.5, continent = 'Asia', popularity_score = 90, solo_friendly = true, family_friendly = true WHERE name = 'Kerala';

UPDATE cities SET tags = ARRAY['nature','architecture','modern','statue'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 50, safety_score = 8.5, continent = 'Asia', popularity_score = 40, solo_friendly = true, family_friendly = true WHERE name = 'Kevadia';

UPDATE cities SET tags = ARRAY['culture','food','backwaters','port','history'], best_months = ARRAY[9,10,11,12,1,2,3], avg_daily_cost = 60, safety_score = 8.0, continent = 'Asia', popularity_score = 70, solo_friendly = true, family_friendly = true WHERE name = 'Kochi';

UPDATE cities SET tags = ARRAY['culture','history','food','art','colonial','literature'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 50, safety_score = 7.0, continent = 'Asia', popularity_score = 65, solo_friendly = true, family_friendly = true WHERE name = 'Kolkata';

UPDATE cities SET tags = ARRAY['adventure','nature','mountain','spiritual','trekking'], best_months = ARRAY[6,7,8,9], avg_daily_cost = 70, safety_score = 7.5, continent = 'Asia', popularity_score = 80, solo_friendly = true, family_friendly = false WHERE name = 'Leh';

UPDATE cities SET tags = ARRAY['adventure','nature','mountain','snow','honeymoon','trekking'], best_months = ARRAY[3,4,5,6,9,10], avg_daily_cost = 55, safety_score = 8.0, continent = 'Asia', popularity_score = 85, solo_friendly = true, family_friendly = true WHERE name = 'Manali';

UPDATE cities SET tags = ARRAY['urban','food','nightlife','beach','shopping','bollywood'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 80, safety_score = 7.0, continent = 'Asia', popularity_score = 85, solo_friendly = true, family_friendly = true WHERE name = 'Mumbai';

UPDATE cities SET tags = ARRAY['nature','tea','mountain','relaxation','trekking'], best_months = ARRAY[9,10,11,12,1,2,3,4,5], avg_daily_cost = 50, safety_score = 8.5, continent = 'Asia', popularity_score = 70, solo_friendly = true, family_friendly = true WHERE name = 'Munnar';

UPDATE cities SET tags = ARRAY['beach','culture','food','french','colonial','relaxation'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 55, safety_score = 8.5, continent = 'Asia', popularity_score = 72, solo_friendly = true, family_friendly = true WHERE name = 'Pondicherry';

UPDATE cities SET tags = ARRAY['food','culture','industry','diamond'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 45, safety_score = 8.0, continent = 'Asia', popularity_score = 30, solo_friendly = true, family_friendly = true WHERE name = 'Rajkot';

UPDATE cities SET tags = ARRAY['adventure','spiritual','yoga','nature','rafting','trekking'], best_months = ARRAY[9,10,11,3,4,5], avg_daily_cost = 45, safety_score = 8.5, continent = 'Asia', popularity_score = 82, solo_friendly = true, family_friendly = false WHERE name = 'Rishikesh';

UPDATE cities SET tags = ARRAY['nature','wildlife','safari','forest'], best_months = ARRAY[12,1,2,3,4], avg_daily_cost = 55, safety_score = 8.0, continent = 'Asia', popularity_score = 45, solo_friendly = true, family_friendly = true WHERE name = 'Sasan Gir';

UPDATE cities SET tags = ARRAY['nature','mountain','colonial','snow','relaxation'], best_months = ARRAY[3,4,5,9,10,11], avg_daily_cost = 55, safety_score = 8.0, continent = 'Asia', popularity_score = 75, solo_friendly = true, family_friendly = true WHERE name = 'Shimla';

UPDATE cities SET tags = ARRAY['spiritual','history','temple','coastal'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 40, safety_score = 8.0, continent = 'Asia', popularity_score = 35, solo_friendly = true, family_friendly = true WHERE name = 'Somnath';

UPDATE cities SET tags = ARRAY['adventure','nature','mountain','remote','trekking','photography'], best_months = ARRAY[6,7,8,9], avg_daily_cost = 60, safety_score = 7.0, continent = 'Asia', popularity_score = 75, solo_friendly = true, family_friendly = false WHERE name = 'Spiti Valley';

UPDATE cities SET tags = ARRAY['nature','houseboat','mountain','garden','romantic'], best_months = ARRAY[3,4,5,6,7,8,9,10], avg_daily_cost = 65, safety_score = 7.0, continent = 'Asia', popularity_score = 80, solo_friendly = false, family_friendly = true WHERE name = 'Srinagar';

UPDATE cities SET tags = ARRAY['food','culture','diamond','industry','urban'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 50, safety_score = 8.0, continent = 'Asia', popularity_score = 35, solo_friendly = true, family_friendly = true WHERE name = 'Surat';

UPDATE cities SET tags = ARRAY['culture','romantic','lake','heritage','architecture','luxury'], best_months = ARRAY[9,10,11,12,1,2,3], avg_daily_cost = 70, safety_score = 8.5, continent = 'Asia', popularity_score = 88, solo_friendly = true, family_friendly = true WHERE name = 'Udaipur';

UPDATE cities SET tags = ARRAY['food','culture','industry','urban'], best_months = ARRAY[10,11,12,1,2], avg_daily_cost = 45, safety_score = 8.0, continent = 'Asia', popularity_score = 30, solo_friendly = true, family_friendly = true WHERE name = 'Vadodara';

UPDATE cities SET tags = ARRAY['spiritual','culture','history','food','heritage','ghats'], best_months = ARRAY[10,11,12,1,2,3], avg_daily_cost = 40, safety_score = 7.0, continent = 'Asia', popularity_score = 85, solo_friendly = true, family_friendly = true WHERE name = 'Varanasi';

-- ═══ INTERNATIONAL ═══════════════════════════════════════════════════════

UPDATE cities SET tags = ARRAY['beach','culture','nature','temple','relaxation','surfing'], best_months = ARRAY[4,5,6,7,8,9], avg_daily_cost = 50, safety_score = 7.5, continent = 'Asia', popularity_score = 92, solo_friendly = true, family_friendly = true WHERE name = 'Bali';

UPDATE cities SET tags = ARRAY['luxury','shopping','modern','desert','architecture'], best_months = ARRAY[11,12,1,2,3], avg_daily_cost = 200, safety_score = 9.5, continent = 'Middle East', popularity_score = 88, solo_friendly = true, family_friendly = true WHERE name = 'Dubai';

UPDATE cities SET tags = ARRAY['culture','history','food','art','museum','architecture'], best_months = ARRAY[4,5,6,9,10], avg_daily_cost = 180, safety_score = 7.5, continent = 'Europe', popularity_score = 95, solo_friendly = true, family_friendly = true WHERE name = 'Paris';

UPDATE cities SET tags = ARRAY['culture','history','museum','shopping','urban'], best_months = ARRAY[4,5,6,7,8,9], avg_daily_cost = 200, safety_score = 8.0, continent = 'Europe', popularity_score = 93, solo_friendly = true, family_friendly = true WHERE name = 'London';

UPDATE cities SET tags = ARRAY['urban','food','culture','shopping','iconic','nightlife'], best_months = ARRAY[4,5,6,9,10], avg_daily_cost = 250, safety_score = 7.0, continent = 'North America', popularity_score = 95, solo_friendly = true, family_friendly = true WHERE name = 'New York';

UPDATE cities SET tags = ARRAY['beach','romantic','architecture','luxury','sunset'], best_months = ARRAY[4,5,6,9,10], avg_daily_cost = 150, safety_score = 8.5, continent = 'Europe', popularity_score = 90, solo_friendly = false, family_friendly = false WHERE name = 'Santorini';

UPDATE cities SET tags = ARRAY['urban','food','shopping','modern','clean','garden'], best_months = ARRAY[1,2,3,4,5,6,7,8,9,10,11,12], avg_daily_cost = 180, safety_score = 9.5, continent = 'Asia', popularity_score = 88, solo_friendly = true, family_friendly = true WHERE name = 'Singapore';

UPDATE cities SET tags = ARRAY['culture','food','technology','anime','temple','modern'], best_months = ARRAY[3,4,5,10,11], avg_daily_cost = 150, safety_score = 9.5, continent = 'Asia', popularity_score = 95, solo_friendly = true, family_friendly = true WHERE name = 'Tokyo';

-- ═══ Enrich activities with tags ═══════════════════════════════════════

UPDATE activity_catalog SET tags = ARRAY['culture','history'], best_for = ARRAY['solo','couple','family'] WHERE category IN ('Culture', 'Heritage') AND tags = '{}';
UPDATE activity_catalog SET tags = ARRAY['food','local'], best_for = ARRAY['solo','couple','group'] WHERE category IN ('Food', 'Cuisine') AND tags = '{}';
UPDATE activity_catalog SET tags = ARRAY['adventure','outdoor'], best_for = ARRAY['solo','group'] WHERE category IN ('Adventure', 'Sports') AND tags = '{}';
UPDATE activity_catalog SET tags = ARRAY['nature','relaxation'], best_for = ARRAY['solo','couple','family'] WHERE category IN ('Nature', 'Relaxation') AND tags = '{}';
UPDATE activity_catalog SET tags = ARRAY['sightseeing','culture'], best_for = ARRAY['solo','couple','family'] WHERE category = 'Sightseeing' AND tags = '{}';
UPDATE activity_catalog SET tags = ARRAY['nightlife','social'], best_for = ARRAY['couple','group'] WHERE category = 'Nightlife' AND tags = '{}';
UPDATE activity_catalog SET tags = ARRAY['shopping','local'], best_for = ARRAY['solo','couple','family'] WHERE category = 'Shopping' AND tags = '{}';
-- Catch-all for uncategorized
UPDATE activity_catalog SET tags = ARRAY['general'], best_for = ARRAY['solo','couple','family','group'] WHERE tags = '{}';

-- Set reasonable add_count/view_count for existing activities (pseudo-popularity)
UPDATE activity_catalog SET view_count = FLOOR(RANDOM() * 200 + 50)::int, add_count = FLOOR(RANDOM() * 50 + 5)::int;

-- ═══ Seed user preferences for existing users ═══════════════════════════

INSERT INTO user_preferences (user_id, preferred_budget, travel_style, preferred_group, onboarding_done)
SELECT id, 'mid', ARRAY['culture','food','nature'], 'solo', false
FROM users
ON CONFLICT (user_id) DO NOTHING;

-- ═══ Seed city co-occurrence from existing trips ═══════════════════════

INSERT INTO city_cooccurrence (city_a_id, city_b_id, frequency)
SELECT s1.city_id, s2.city_id, COUNT(*)
FROM stops s1
JOIN stops s2 ON s1.trip_id = s2.trip_id AND s1.city_id != s2.city_id
WHERE s1.city_id IS NOT NULL AND s2.city_id IS NOT NULL
GROUP BY s1.city_id, s2.city_id
ON CONFLICT (city_a_id, city_b_id) DO UPDATE SET frequency = EXCLUDED.frequency;

-- ═══ Seed popular routes from sequential stops ═════════════════════════

INSERT INTO popular_routes (origin_city, dest_city, frequency, avg_days_stay)
SELECT s1.city_id, s2.city_id, COUNT(*), 3
FROM stops s1
JOIN stops s2 ON s1.trip_id = s2.trip_id AND s2.day_number = s1.day_number + 1
WHERE s1.city_id IS NOT NULL AND s2.city_id IS NOT NULL AND s1.city_id != s2.city_id
GROUP BY s1.city_id, s2.city_id
ON CONFLICT (origin_city, dest_city) DO UPDATE SET frequency = EXCLUDED.frequency;
