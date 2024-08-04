import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrapedSong } from './song.interface';
import { SongService } from './song.service';

@Component({
  selector: 'app-song',
  standalone: true,
  imports: [AsyncPipe],
  providers: [SongService],
  templateUrl: './song.component.html',
  styleUrl: './song.component.scss',
})
export class SongComponent implements OnInit {
  private songService = inject(SongService);
  song$!: Observable<ScrapedSong>;

  ngOnInit(): void {
    this.song$ = this.songService.random$;
  }
}
