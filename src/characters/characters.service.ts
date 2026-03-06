import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CharactersResponse, Character } from './interfaces/character.interface';
import * as https from 'https';

@Injectable()
export class CharactersService {
    private readonly RICK_AND_MORTY_API = 'https://rickandmortyapi.com/api/character';
    private readonly httpsAgent = new https.Agent({ rejectUnauthorized: false });

    constructor(private readonly httpService: HttpService) { }

    async getCharacters(): Promise<CharactersResponse> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<CharactersResponse>(this.RICK_AND_MORTY_API, {
                    httpsAgent: this.httpsAgent
                }),
            );
            return data;
        } catch (error) {
            console.error(error);
            throw new HttpException(
                'Error fetching characters from Rick and Morty API',
                HttpStatus.BAD_GATEWAY,
            );
        }
    }

    async getCharacterById(id: number): Promise<Character> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<Character>(`${this.RICK_AND_MORTY_API}/${id}`, {
                    httpsAgent: this.httpsAgent
                }),
            );
            return data;
        } catch (error) {
            console.error(error);
            throw new HttpException(
                `Character with id ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
