import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom, ReplaySubject, Subscription } from 'rxjs';
import { ScrapedSong } from './song.interface';
import { SongService } from './song.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatCardModule, MatDividerModule, MatIconModule],
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

  private ignorelist = ['Facebook Q&A 1/31/14', 'good kid, m.A.A.d city Album Review'];

  ngAfterViewInit() {
    this.subs.push(
      this.bo
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.HandsetPortrait,
          Breakpoints.TabletLandscape,
          Breakpoints.WebPortrait,
        ])
        .subscribe((state) => {
          if (state.matches) {
            this.main.nativeElement.classList.add('mobile');
          }
        }),
    );

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

    this.songService.random$.subscribe(async (song) => {
      if (
        song?.song?.title &&
        !this.ignorelist.includes(song?.song?.title) &&
        song?.song?.header_image_thumbnail_url &&
        song?.lyrics?.length > 0
      ) {
        this.song$.next(song);
      } else {
        let exit = false;
        let song: ScrapedSong;
        const max = 10;
        let i = 0;
        while (!exit) {
          this.refresh();
          await firstValueFrom(this.song$).then((retrySong) => {
            if (retrySong?.song?.title && retrySong?.song?.header_image_thumbnail_url && song?.lyrics?.length > 0) {
              song = retrySong;
              exit = true;
            }
            i++;

            if (i >= max) {
              // avoid infinite loop
              exit = true;
            }
          });
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
