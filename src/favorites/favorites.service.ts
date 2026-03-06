import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Favorite, CreateFavoritePayload } from './interfaces/favorite.interface';

@Injectable()
export class FavoritesService {
    private readonly PERSISTENCE_URL =
        process.env.PERSISTENCE_URL || 'http://localhost:3002';

    constructor(private readonly httpService: HttpService) { }

    async getAll(): Promise<Favorite[]> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<Favorite[]>(`${this.PERSISTENCE_URL}/favorites`),
            );
            return data;
        } catch (error) {
            throw new HttpException(
                { message: 'El microservicio de persistencia no está disponible o falló', details: error.message },
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async create(payload: CreateFavoritePayload): Promise<Favorite> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post<Favorite>(`${this.PERSISTENCE_URL}/favorites`, payload),
            );
            return data;
        } catch (error: any) {
            // Detect unique constraint violation (duplicate favorite)
            if (error?.response?.status === 409 || error?.response?.data?.code === '23505') {
                throw new HttpException(
                    { message: 'Character is already in favorites' },
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(
                { message: 'El microservicio de persistencia no está disponible para guardar' },
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await firstValueFrom(
                this.httpService.delete(`${this.PERSISTENCE_URL}/favorites/${id}`),
            );
        } catch (error) {
            throw new HttpException(
                { message: `El microservicio de persistencia falló al intentar borrar el favorito ${id}` },
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        }
    }
}
