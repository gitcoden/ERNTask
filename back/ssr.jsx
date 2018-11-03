import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import view from './views/index.ejs';
import App from '../front/App';

const router = express.Router();

router.get('/', (req, res) => {
  debugger;
  const html = ReactDOMServer.renderToString(<App />);

  const finalState = App.store.getState();

  res.status(200).render(view, {
    html,
    script: JSON.stringify(finalState),
  });
});

export default router;
