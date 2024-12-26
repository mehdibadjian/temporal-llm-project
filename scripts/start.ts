import { run } from '../src/index';

run().catch((error: Error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});