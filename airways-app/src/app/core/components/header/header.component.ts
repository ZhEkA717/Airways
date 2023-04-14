import { Component } from '@angular/core';
import { Router } from '@angular/router';
import FormatService from '../../services/format.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent {
  public menuShow = false;

  constructor(
    private router: Router,
    public formatService: FormatService,
  ) {}

  public toMainPage() {
    this.router.navigate(['main']);
  }
}
