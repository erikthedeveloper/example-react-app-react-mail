import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { routes } from './routes';
import './styles/general.css';
import './styles/animations.css';

// Some basic axios setup.
axios.defaults.baseURL = 'http://localhost:3001';
const responseToBody = ({data}) => data;
// Convert all response directly to data/JSON
axios.interceptors.response.use(responseToBody);

render(routes, document.querySelector('#root'));
