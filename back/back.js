import express from 'express';
import path from 'path';

import api from './api';
import ssr from './ssr';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '..', 'front')));

app.use('/api', api);

app.use('/*', ssr);

app.listen(3000, () => {
  console.log('Hello World listening on port 3000!');
});
