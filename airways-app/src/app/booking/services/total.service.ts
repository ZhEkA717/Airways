import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TotalInfo } from '../models/total-info.model';

@Injectable()
export default class TotalService {
  private totalInfo = new BehaviorSubject<TotalInfo>(<TotalInfo>{});

  public totalInfo$ = this.totalInfo.asObservable();

  public setTotalInfo(newState: TotalInfo) {
    this.totalInfo.next(newState);
  }
}
