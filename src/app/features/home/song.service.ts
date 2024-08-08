import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ScrapedSong } from './song.interface';

@Injectable()
export class SongService {
  private http = inject(HttpClient);

  get random$(): Observable<ScrapedSong> {
    const endpoint = 'https://b7mctdx46g.execute-api.us-east-1.amazonaws.com/random-song';

    return this.http.get<ScrapedSong>(endpoint).pipe(
      map((song) => {
        const numLyrics = 4;
        const rand = this.getRandomInt(numLyrics, (song.lyrics?.length || 4) - numLyrics);
        return {
          ...song,
          lyrics: song.lyrics?.slice(rand, rand + numLyrics) || [],
        };
      }),
    );
  }

  private getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
}
