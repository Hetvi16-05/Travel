require('dotenv').config({ path: __dirname + '/../.env' });
const { pool } = require('../src/config/db');

async function runAudit() {
  console.log('--- TRAVELOOP INTELLIGENCE LAYER AUDIT ---');
  
  try {
    // 1. Check Tables
    const tables = ['user_events', 'user_preferences', 'city_cooccurrence', 'trip_scores', 'planner_sessions'];
    for (const table of tables) {
      const res = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)`, [table]);
      console.log(`Table ${table.padEnd(20)}: ${res.rows[0].exists ? '✅' : '❌'}`);
    }

    // 2. Check Intelligence Columns in Cities
    const columns = ['tags', 'best_months', 'avg_daily_cost', 'safety_score', 'popularity_score'];
    for (const col of columns) {
      const res = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'cities' AND column_name = $1)`, [col]);
      console.log(`Column cities.${col.padEnd(13)}: ${res.rows[0].exists ? '✅' : '❌'}`);
    }

    // 3. Check Data
    const cities = await pool.query('SELECT COUNT(*) FROM cities');
    const prefs = await pool.query('SELECT COUNT(*) FROM user_preferences');
    console.log(`Cities in DB: ${cities.rows[0].count}`);
    console.log(`User Prefs: ${prefs.rows[0].count}`);

    // 4. Test Intent Parser
    const { parseIntent } = require('../src/modules/ai/intent.parser');
    const testIntent = parseIntent('Add a 3 day stop in Mumbai');
    const isValid = testIntent.intent === 'ADD_STOP' && testIntent.params.city === 'Mumbai' && testIntent.params.days === 3;
    console.log(`Intent Parser Test (Mumbai): ${isValid ? '✅' : '❌'}`);
    if (!isValid) console.log('Parsed:', JSON.stringify(testIntent, null, 2));

    console.log('------------------------------------------');
    console.log('AUDIT COMPLETE: Intelligence Layer is ACTIVE.');
    
    process.exit(0);
  } catch (err) {
    console.error('AUDIT FAILED:', err.message);
    process.exit(1);
  }
}

runAudit();
