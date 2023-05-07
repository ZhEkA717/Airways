import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTripComponent } from './summary-trip.component';

describe('SummaryTripComponent', () => {
  let component: SummaryTripComponent;
  let fixture: ComponentFixture<SummaryTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
