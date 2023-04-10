import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import FlightSearchPageComponent from './main/flight-search-page/flight-search-page.component';

const routes: Routes = [
  { path: '', component: FlightSearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule { }
