import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DesktopService {
  private bo = inject(BreakpointObserver);

  get isDesktop$(): Observable<boolean> {
    return this.bo
      .observe([
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape,
      ])
      .pipe(map((state) => state.matches));
  }
}
