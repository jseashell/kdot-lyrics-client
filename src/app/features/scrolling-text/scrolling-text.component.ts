import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrolling-text',
  standalone: true,
  imports: [],
  templateUrl: './scrolling-text.component.html',
  styleUrl: './scrolling-text.component.scss',
})
export class ScrollingTextComponent {
  @Input() value = '';
}
