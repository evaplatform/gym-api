// src/index.ts
import { config } from 'dotenv';
config();

import app from './app';

const port = process.env.PROJECT_PORT || 3000;

app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
