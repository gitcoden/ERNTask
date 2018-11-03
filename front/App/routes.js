import { uniqueId } from 'lodash-es';

import Phones from './Phones';
import ValidatePhone from './ValidatePhone';

const routes = [
  { path: '/phones', component: Phones, linkLabel: 'Show valid phones' },
  { path: '/validate_phone', component: ValidatePhone, linkLabel: 'Validate phone' },
].map(route => ({ ...route, uiId: uniqueId() }));

export default routes;
