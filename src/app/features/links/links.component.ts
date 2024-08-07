import { AsyncPipe, NgClass } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { DesktopService } from '@services';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent {
  private desktopService = inject(DesktopService);
  @HostBinding('class.desktop') isDesktop$ = this.desktopService.isDesktop$;
}
