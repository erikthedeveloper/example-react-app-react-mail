require('./styles/app.scss');
import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { routes } from './routes';

// Some basic axios setup.
axios.defaults.baseURL = 'http://localhost:3001';
const responseToBody = ({data}) => data;
// Convert all response directly to data/JSON
axios.interceptors.response.use(responseToBody);

render(routes, document.querySelector('#app'));
