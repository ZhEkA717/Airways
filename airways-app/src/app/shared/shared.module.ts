import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import SelectPassengersComponent from './components/select-passengers/select-passengers.component';
import SelectValidateDirective from './directives/select-validate.directive';
import RangeDateComponent from './components/range-date/range-date.component';
import AutocompleteGroupComponent from './components/autocomplete-group/autocomplete-group.component';

@NgModule({
  declarations: [
    SelectPassengersComponent,
    RangeDateComponent,
    SelectValidateDirective,
    AutocompleteGroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    SelectPassengersComponent,
    RangeDateComponent,
    AutocompleteGroupComponent,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
  ],
})
export default class SharedModule { }
