import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DesktopService } from '@services';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, NgClass],
  providers: [DesktopService],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  @Input() album!: {
    thumbnail: string;
    title: string;
    releaseDate: Dayjs | undefined;
  };
  @Input() align!: 'start' | 'end';

  private desktopService = inject(DesktopService);
  isDesktop$ = this.desktopService.isDesktop$;
}
