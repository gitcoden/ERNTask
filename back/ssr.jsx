import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, MuiThemeProvider } from '@material-ui/core/styles';

import { addPhones } from 'front/App/Phones/ducks';
import configureStore from 'front/App/reduxStore';
import App from 'front/App';
import view from './views/index.ejs';

const router = express.Router();

router.get('/', (req, res) => {
  const store = configureStore();
  store.dispatch(addPhones(['+74955005550']));

  const context = {};
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const sheetsManager = new Map();

  const html = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider sheetsManager={sheetsManager}>
        <Provider store={store}>
          <StaticRouter location={req.originalUrl} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );

  const css = sheetsRegistry.toString();

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
      css,
    });
  }
});

export default router;
