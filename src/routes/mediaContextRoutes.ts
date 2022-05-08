import express from 'express';
import { SessionMediaContext } from '../controllers';

const router = express.Router();

router.get('/sessions/:sessionId/media-context', SessionMediaContext.sessionMediaContext);

export default router;