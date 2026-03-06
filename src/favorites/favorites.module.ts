import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
    imports: [HttpModule],
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule { }
