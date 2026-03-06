import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResponse, Character } from './interfaces/character.interface';

@Controller('characters')
export class CharactersController {
    constructor(private readonly charactersService: CharactersService) { }

    @Get()
    async getCharacters(): Promise<CharactersResponse> {
        return this.charactersService.getCharacters();
    }

    @Get(':id')
    async getCharacterById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Character> {
        return this.charactersService.getCharacterById(id);
    }
}
