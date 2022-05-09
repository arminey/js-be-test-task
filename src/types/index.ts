export interface Session {
    id: string;
    status: string;
};

export interface SessionMedia {
    id: string;
    mimeType: string;
    context: string;
};

export interface ContextMedia {
    'document-front': Array<SessionMedia>;
    'document-back': Array<SessionMedia>;
};

export interface MediaContext {
    id: string;
    mediaId: string;
    context: string;
    probability: number;
};

export interface MediaContextMap {
    [key: string]: MediaContext
};

export enum CONTEXT {
    back = 'document-back',
    front = 'document-front'
}