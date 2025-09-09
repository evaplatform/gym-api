import { config } from 'dotenv';
config();

import expressApp from '../src/app'; // já exportado sem listen()

export default expressApp;
