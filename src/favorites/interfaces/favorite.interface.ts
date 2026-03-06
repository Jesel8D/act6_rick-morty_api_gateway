export interface Favorite {
    id: number;
    apiId: number;
    name: string;
}

export interface CreateFavoritePayload {
    apiId: number;
    name: string;
}
