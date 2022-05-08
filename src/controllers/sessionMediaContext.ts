import * as express from 'express';

import { HttpError } from '../utils';
import { VERIFF_API } from '../interfaces/veriff';
import { ContextMedia, SessionMedia, MediaContext, MediaContextMap } from '../types';

export const SessionMediaContext = {
    sessionMediaContext: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const sessionId = req.params.sessionId;
        try {
            const mediaDetails = await VERIFF_API.get<SessionMedia[]>(`/sessions/${sessionId}/media`);
            const mediaContextResponse = await VERIFF_API.get<MediaContext[]>(`media-context/${sessionId}`);
            
            const media: ContextMedia = {'document-front': [], 'document-back': []};
            const mediaForMap: MediaContextMap = {};

            mediaContextResponse.data.forEach(mediaDetail => mediaForMap[mediaDetail.mediaId] = mediaDetail);
            mediaDetails.data.forEach(mediaDetail => {
                const detail: MediaContext = mediaForMap[mediaDetail.id];
                if (detail.context === 'back') {
                    media['document-back'].push(mediaDetail);
                }
                if (detail.context === 'front') {
                    media['document-front'].push(mediaDetail);
                }
            });

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
