import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { addPhones } from 'front/App/Phones/ducks';
import configureStore from 'front/App/reduxStore';
import App from 'front/App';
import view from './views/index.ejs';

const router = express.Router();

router.get('/', (req, res) => {
  const store = configureStore();
  store.dispatch(addPhones(['+74955005550']));

  const context = {};

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.originalUrl} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const finalState = store.getState();

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render(view, {
      html,
      initialState: JSON.stringify(finalState),
    });
  }
});

export default router;
