import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import SharedModule from '../shared/shared.module';
import FormatService from './services/format.service';
import StepperComponent from './components/stepper/stepper.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [FormatService],
})
export default class CoreModule { }
