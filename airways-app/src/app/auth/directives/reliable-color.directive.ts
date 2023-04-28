import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
} from '@angular/core';
import LoginService from '../services/login.service';

@Directive({
  selector: '[appReliableColor]',
})
export default class ReliableColorDirective implements OnInit {
  @Input() valueReliable = 0;

  private reserve = {
    0: '50px',
    10: '40px',
    20: '30px',
    30: '20px',
    40: '10px',
    50: '0px',
  };

  private colors = {
    weak: '#EB5757',
    average: '#F2C94C',
    reliable: '#27AE60',
  };

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.setBorderColor();
  }

  private borderColor():string {
    if (this.valueReliable === 0
      || this.valueReliable === 10
      || this.valueReliable === 20
    ) return this.colors.weak;
    if (this.valueReliable === 30
      || this.valueReliable === 40
    ) return this.colors.average;
    return this.colors.reliable;
  }

  private setBorderColor() {
    this.loginService.valueReliable$.subscribe((value) => {
      this.valueReliable = value;
      this.r.setAttribute(this.el.nativeElement, 'stroke', this.borderColor());
      this.r.setAttribute(this.el.nativeElement, 'stroke-dashoffset', this.reserve[value as keyof typeof this.reserve]);
    });
  }
}
