import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import AlertService from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export default class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5;

  public text!: string | null;

  public type!: string | null;

  public isShow = false;

  private alertSub!: Subscription;

  private timerId!:ReturnType<typeof setTimeout>;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSub = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;
      this.isShow = true;

      clearTimeout(this.timerId);

      this.timerId = setTimeout(() => {
        clearTimeout(this.timerId);
        this.close();
      }, this.delay * 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.alertSub) this.alertSub.unsubscribe();
  }

  public close() {
    this.isShow = false;

    setTimeout(() => {
      this.type = null;
      this.text = null;
    }, 1000);
  }
}
