import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [CharactersModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
