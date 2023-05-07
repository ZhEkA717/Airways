import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPassengerItemComponent } from './summary-passenger-item.component';

describe('SummaryPassengerItemComponent', () => {
  let component: SummaryPassengerItemComponent;
  let fixture: ComponentFixture<SummaryPassengerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPassengerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPassengerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
