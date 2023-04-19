import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSearch } from 'src/app/redux/selectors/search.selector';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export default class SecondMenuComponent implements OnInit {
  public searchForm$ = this.store.select(selectSearch);

  public tripWay!: boolean;

  public from!: string;

  public destination!: string;

  public count!: number;

  public startDate!: Date;

  public endDate!: Date;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchForm$.subscribe((search) => {
      this.tripWay = search.tripWay === 'one';
      this.from = search.from;
      this.destination = search.destination;
      this.count = search.passengers?.reduce((start, item) => start + item.value, 0);
      this.startDate = new Date(search.startDate);
      this.endDate = new Date(search.endDate);
    });
  }
}
