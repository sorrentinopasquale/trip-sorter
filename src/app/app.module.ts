/* Angular modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
/* Bootstrap module */
import { MDBBootstrapModule } from 'angular-bootstrap-md';
/* My service */
import { TripService } from './trip.service';
/* Main components */
import { AppComponent } from './app.component';
import { ResultsTableComponent } from './results/table/results-table.component';
import { SearchFormComponent } from './search/search-form/search-form.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultsTableComponent,
    SearchFormComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
