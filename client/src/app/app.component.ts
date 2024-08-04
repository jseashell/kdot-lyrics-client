import { Component } from '@angular/core';
import { SongComponent } from './features/song/song.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SongComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
