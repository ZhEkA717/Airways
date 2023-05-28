import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/footer/footer.component';
import SharedModule from '../shared/shared.module';
import FormatService from './services/format.service';
import HttpApiInterceptor from './services/http-api.interceptor';
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
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },
    FormatService,
  ],
})
export default class CoreModule { }
