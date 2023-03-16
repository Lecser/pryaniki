import axios from 'axios';
import { getCookie } from 'shared/lib/getCookie/getCookie';

const token = getCookie('token');

export const $api = axios.create({
  baseURL: 'https://test.v5.pryaniky.com/',
  headers: {
    'x-auth': token
  }
});
