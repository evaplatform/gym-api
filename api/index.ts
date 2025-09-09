// api/index.ts
import 'module-alias/register';
import { config } from 'dotenv';
config();

// Configurar module-alias para resolver @/ imports
import { addAliases } from 'module-alias';
addAliases({
  '@': __dirname + '/../dist'
});

import app from '../dist/app';

export default app;