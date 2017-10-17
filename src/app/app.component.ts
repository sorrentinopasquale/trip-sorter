import { Component, OnInit } from '@angular/core';
import { TripService } from './trip.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  response;
  availableTrips; // Should come from the sibling
  criteria;
  showSearch = true;
  serviceMessage;

  constructor (private _tripService: TripService) { }
  ngOnInit() {
    this.response = this._tripService.getFile().deals;
   }
  handleTripsUpdated(args) { // Called when the user change the fields
    this.availableTrips = args[0];
    this.criteria = args[1];
    this.showSearch = false;
  }
  newSearch() { // Triggered when the user wants to reset
    this.showSearch = true;
  }
}
