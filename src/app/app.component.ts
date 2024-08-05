import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom, ReplaySubject, Subscription } from 'rxjs';
import { ScrollingTextComponent } from './features/scrolling-text/scrolling-text.component';
import { ScrapedSong } from './song.interface';
import { SongService } from './song.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, ScrollingTextComponent],
  providers: [SongService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('main') main!: ElementRef;
  private bo = inject(BreakpointObserver);
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
      this.bo
        .observe([
          Breakpoints.Large,
          Breakpoints.XLarge,
          Breakpoints.HandsetLandscape,
          Breakpoints.TabletLandscape,
          Breakpoints.WebLandscape,
        ])
        .subscribe((state) => {
          if (state.matches) {
            this.main.nativeElement.classList.add('web');
          }
        }),
    );

    this.songService.random$.subscribe(async (randomSong) => {
      if (this.ignorelist.includes(randomSong?.song?.title)) {
        console.debug('retrying...ignorelist', this.ignorelist, randomSong);
      } else {
        console.debug('allowlisted', this.ignorelist, randomSong);
      }

      if (
        randomSong &&
        randomSong?.song?.title &&
        !this.ignorelist.includes(randomSong?.song?.title) &&
        randomSong?.song?.header_image_thumbnail_url &&
        randomSong?.lyrics?.length > 0
      ) {
        this.song$.next(randomSong);
      } else {
        console.debug('retrying...ignorelist', randomSong);
        let exit = false;
        let song: ScrapedSong;
        const max = 10;
        let i = 0;
        while (!exit) {
          this.refresh();
          const retrySong = await firstValueFrom(this.song$);

          if (retrySong?.song?.title && retrySong?.song?.header_image_thumbnail_url && retrySong?.lyrics?.length == 4) {
            song = retrySong;
            console.debug('retry complete', song);
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
