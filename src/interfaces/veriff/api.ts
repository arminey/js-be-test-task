import axios from "axios";
import axiosRetry from 'axios-retry';

import { ENV } from './../../config';

export const VERIFF_API = axios.create({
    baseURL: ENV.VERIFF_URL,
});

axiosRetry(VERIFF_API, { retries: 5 });