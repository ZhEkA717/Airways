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
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatBadgeModule } from '@angular/material/badge';
import SelectPassengersComponent from './components/select-passengers/select-passengers.component';
import SelectValidateDirective from './directives/select-validate.directive';
import RangeDateComponent from './components/range-date/range-date.component';
import AutocompleteGroupComponent from './components/autocomplete-group/autocomplete-group.component';
import AlertComponent from './components/alert/alert.component';
import ConfirmDialogComponent from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    SelectPassengersComponent,
    RangeDateComponent,
    SelectValidateDirective,
    AutocompleteGroupComponent,
    AlertComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    OverlayModule,
    MatBadgeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SelectPassengersComponent,
    RangeDateComponent,
    AutocompleteGroupComponent,
    OverlayModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatBadgeModule,
    AlertComponent,
  ],
})
export default class SharedModule { }
