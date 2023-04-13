import { ComponentFixture, TestBed } from '@angular/core/testing';

import AutocompleteGroupComponent from './autocomplete-group.component';

describe('AutocompleteGroupComponent', () => {
  let component: AutocompleteGroupComponent;
  let fixture: ComponentFixture<AutocompleteGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutocompleteGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
