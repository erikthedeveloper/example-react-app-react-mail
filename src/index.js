require('./app.scss');
// If we wanted to polyfill the fetch API (recommended).
// https://github.com/github/fetch
// require('whatwg-fetch');
import React from 'react';
import {render} from 'react-dom';

import { App } from './App';

render(<App/>, document.querySelector('#app'));
