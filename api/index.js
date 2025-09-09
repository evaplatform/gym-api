// api/index.js
require('module-alias/register');
require('dotenv').config();

// Configurar aliases
require('module-alias').addAliases({
  '@': __dirname + '/../dist'
});

// Importar a aplicação compilada
const app = require('../dist/app').default;

module.exports = app;