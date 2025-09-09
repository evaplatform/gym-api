// api/index.ts
import 'module-alias/register';
import { config } from 'dotenv';
config();

// Configurar module-alias para resolver @/ imports
import { addAliases } from 'module-alias';
addAliases({
  '@': __dirname + '/../src'
});

import app from '../src/app';

export default app;