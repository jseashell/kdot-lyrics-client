import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  @Input() album!: {
    thumbnail: string;
    title: string;
    releaseDate: Dayjs;
  };
  @Input() width!: string;
}
