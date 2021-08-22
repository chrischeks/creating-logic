import path from 'path';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/@universal/configs');

import 'dotenv/config';
import App from '@/app';
import CreatingLogicRoute from './creating-logic/logic.route';

const app = new App([new CreatingLogicRoute()]);
app.listen();
