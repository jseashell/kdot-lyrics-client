import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingTextComponent } from '@components';
import { DesktopService } from '@services';
import { firstValueFrom, ReplaySubject, Subscription } from 'rxjs';
import { ScrapedSong } from './song.interface';
import { SongService } from './song.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, ScrollingTextComponent],
  providers: [DesktopService, SongService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.desktop') desktop = false;
  private desktopService = inject(DesktopService);
  private cdr = inject(ChangeDetectorRef);
  private subs: Subscription[] = [];

  private songService = inject(SongService);
  song$ = new ReplaySubject<ScrapedSong>(1);

  private ignorelist = [
    'Facebook Q&A',
    'Album Review',
    'GQ',
    'Interview with DJ Dave',
    'The Late Show with Stephen Colbert',
    '2014 Grammys',
    'Hot 97',
    'DJ Mix',
  ].join(',');

  ngAfterViewInit() {
    this.subs.push(
      this.desktopService.isDesktop$.subscribe((isDesktop) => {
        if (isDesktop) {
          this.desktop == true;
          this.cdr.detectChanges();
        }
      }),
    );

    this.songService.random$.subscribe(async (randomSong) => {
      if (
        randomSong &&
        randomSong?.song?.title &&
        !this.ignorelist.includes(randomSong?.song?.title) &&
        randomSong?.song?.header_image_thumbnail_url &&
        randomSong?.lyrics?.length > 0
      ) {
        this.song$.next(randomSong);
      } else {
        let exit = false;
        let song: ScrapedSong;
        const max = 10;
        let i = 0;
        while (!exit) {
          this.refresh();
          const retrySong = await firstValueFrom(this.song$);

          if (retrySong?.song?.title && retrySong?.song?.header_image_thumbnail_url && retrySong?.lyrics?.length == 4) {
            song = retrySong;
            if (song) {
              this.song$.next(song);
            }

            exit = true;
          }

          i++;
          if (i >= max) {
            // avoid infinite loop
            exit = true;
          }
        }
      }
    });
  }

  refresh(e?: MouseEvent) {
    e?.stopPropagation();
    this.songService.random$.subscribe((song) => {
      this.song$.next(song);
    });
  }

  ngOnDestroy(): void {
    this.subs?.forEach((sub) => sub?.unsubscribe());
  }
}
