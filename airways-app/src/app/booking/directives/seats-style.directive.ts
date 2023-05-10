import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appSeatsStyle]',
})
export default class SeatsStyleDirective {
  @Input() k!: number;

  @Input() seat!: string;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
  ) {}
}
