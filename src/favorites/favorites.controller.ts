import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import type { CreateFavoritePayload, Favorite } from './interfaces/favorite.interface';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Get()
    async getAll(): Promise<Favorite[]> {
        return this.favoritesService.getAll();
    }

    @Post()
    async create(@Body() payload: CreateFavoritePayload): Promise<Favorite> {
        return this.favoritesService.create(payload);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.favoritesService.remove(id);
    }
}
