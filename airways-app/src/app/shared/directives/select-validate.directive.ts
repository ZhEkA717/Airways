import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import SelectsService from '../services/selects.service';

@Directive({
  selector: '[appSelectValidate]',
})
export default class SelectValidateDirective {
  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private selectService: SelectsService,
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const el = event.target as HTMLElement;
    const elCurr = event.currentTarget as HTMLElement;
    if (elCurr.classList.contains('passenger')
      && !el.classList.contains('counter')) {
      this.selectService.isChoiceInput = !this.selectService.isChoiceInput;
    }
    this.selectService.updatePlaceholder();
    this.r.setStyle(this.el.nativeElement, 'borderColor', this.requiredSelect());
    this.r.setStyle(this.el.nativeElement.firstChild, 'color', this.requiredSelect());
  }

  requiredSelect() {
    const passengerLength = this.selectService.passengers
      .filter((item) => item.value > 0).length;
    return passengerLength ? '' : 'red';
  }
}
