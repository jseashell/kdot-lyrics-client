import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { tap, timer } from 'rxjs';

@Component({
  selector: 'app-scrolling-text',
  standalone: true,
  imports: [],
  templateUrl: './scrolling-text.component.html',
  styleUrl: './scrolling-text.component.scss',
})
export class ScrollingTextComponent implements AfterViewInit {
  @Input() value = '';
  @ViewChild('spanEl') spanEl!: ElementRef;

  ngAfterViewInit() {
    timer(2000)
      .pipe(
        tap(() => {
          this.spanEl?.nativeElement.classList.add('scroll');
        }),
      )
      .subscribe();
  }
}
