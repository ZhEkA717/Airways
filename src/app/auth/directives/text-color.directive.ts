import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
} from '@angular/core';
import LoginService from '../services/login.service';

@Directive({
  selector: '[appTextColor]',
})
export default class TextColorDirective implements OnInit {
  public valueReliable = 0;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private loginService: LoginService,
  ) {}

  private colors = {
    empty: '#929292',
    weak: '#EB5757',
    average: '#F2C94C',
    reliable: '#27AE60',
  };

  ngOnInit(): void {
    this.setTextColor();
  }

  private textColor():string {
    if (this.valueReliable === 0) return this.colors.empty;
    if (this.valueReliable === 10
      || this.valueReliable === 20
    ) return this.colors.weak;
    if (this.valueReliable === 30
      || this.valueReliable === 40
    ) return this.colors.average;
    return this.colors.reliable;
  }

  private setTextColor() {
    this.loginService.valueReliable$.subscribe((value) => {
      this.valueReliable = value;
      this.r.setStyle(this.el.nativeElement, 'color', this.textColor());
    });
  }
}
