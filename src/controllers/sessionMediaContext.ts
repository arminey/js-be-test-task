import * as express from 'express';

import { HttpError } from '../utils';
import { P_VALUE } from './../config';
import { VERIFF_API } from '../interfaces/veriff';
import { ContextMedia, SessionMedia, MediaContext, MediaContextMap, CONTEXT } from '../types';

export const SessionMediaContext = {
    sessionMediaContext: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const sessionId = req.params.sessionId;
        try {
            const mediaDetails = await VERIFF_API.get<SessionMedia[]>(`/sessions/${sessionId}/media`);
            const mediaContextResponse = await VERIFF_API.get<MediaContext[]>(`media-context/${sessionId}`);
            
            const media: ContextMedia = {'document-front': [], 'document-back': []};
            const mediaForMap: MediaContextMap = {};

            // Group media by the context type
            mediaContextResponse.data.forEach(mediaDetail => {
                // Filtering out irrelevant media
                if (mediaDetail.context in CONTEXT) {
                    mediaDetail.context = CONTEXT[mediaDetail.context];
                    mediaForMap[mediaDetail.mediaId] = mediaDetail;
                }
            });

            mediaDetails.data.forEach(mediaDetail => {
                const detail: MediaContext = mediaForMap[mediaDetail.id];
                if (!detail) return;
                const context = detail.probability > P_VALUE ? detail?.context : mediaDetail.context;
                media[context].push(mediaDetail);
            });

            // Sorted media list by probability descending
            media['document-front'].sort((media_1, media_2) =>
                mediaForMap[media_2.id].probability - mediaForMap[media_1.id].probability);

            media['document-back'].sort((media_1, media_2) =>
                mediaForMap[media_2.id].probability - mediaForMap[media_1.id].probability);

            res.status(200).end(JSON.stringify({ 
                code: 200, 
                data: { id: sessionId, status: 'uploaded_media', media } 
            }));
        } catch (err: any) {
            const error = new HttpError(
                err.response.data,
                err.response.statusCode
            );
            next(error);
        }
    }
}
