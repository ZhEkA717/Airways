import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchPageComponent } from './flight-search-page.component';

describe('FlightSearchPageComponent', () => {
  let component: FlightSearchPageComponent;
  let fixture: ComponentFixture<FlightSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
