import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { DesktopService } from '@services';
import dayjs from 'dayjs';
import { AlbumCardComponent } from './album-card/album-card.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [AlbumCardComponent, AsyncPipe, MatCardModule, MatGridListModule, MatListModule, NgClass],
  providers: [DesktopService],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent {
  private desktopService = inject(DesktopService);
  isDesktop$ = this.desktopService.isDesktop$;

  albums = [
    {
      thumbnail: '/images/albums/mmbs.jpg',
      title: 'Mr. Morale & the Big Steppers',
      releaseDate: dayjs('2022-05-13'),
    },
    {
      thumbnail: '/images/albums/damn.jpg',
      title: 'DAMN.',
      releaseDate: dayjs('2017-04-17'),
    },
    {
      thumbnail: '/images/albums/uu.jpg',
      title: 'Untitled Unmastered',
      releaseDate: dayjs('2015-03-15'),
    },
    {
      thumbnail: '/images/albums/tpab.jpg',
      title: 'To Pimp a Butterfly',
      releaseDate: dayjs('2015-03-15'),
    },
    {
      thumbnail: '/images/albums/gkmc.jpg',
      title: 'good kid, m.A.A.d city',
      releaseDate: dayjs('2012-10-22'),
    },
    {
      thumbnail: '/images/albums/s80.jpg',
      title: 'Section.80',
      releaseDate: dayjs('2011-07-02'),
    },
    {
      thumbnail: '/images/albums/od.jpg',
      title: 'Overly Dedicated',
      releaseDate: dayjs('2010-09-14'),
    },
    {
      thumbnail: '/images/albums/klep.jpg',
      title: 'The Kendrick Lamar EP',
      releaseDate: dayjs('2009-12-31'),
    },
    {
      thumbnail: '/images/albums/c4.jpg',
      title: 'C4',
      releaseDate: dayjs('2009-01-30'),
    },
  ];
}
