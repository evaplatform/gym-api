// src/config/moduleAlias.ts
import path from 'path';
import moduleAlias from 'module-alias';

// Configurar aliases baseado no ambiente
const baseDir = path.resolve(__dirname, '../');

moduleAlias.addAliases({
  '@': baseDir
});