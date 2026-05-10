import { createRequire } from 'module';
const require = createRequire(import.meta.url);
try {
  console.log('Path:', require.resolve('caniuse-lite/dist/unpacker/agents'));
} catch (e) {
  console.error('Error:', e.message);
}
