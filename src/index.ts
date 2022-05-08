import express from 'express';

import { ENV } from './config';
import { contentType } from './middlewares';
import './interfaces/veriff/externalService';
import { MediaContextRpouter  } from './routes';

const app = express();

app.use(contentType);

app.use('/api', MediaContextRpouter);

app.listen(ENV.PORT, () => {
    console.info(`Service is listening at http://${ENV.HOST}:${ENV.PORT}`);
});