import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Input() allTrips;
  @Output() tripsUpdated = new EventEmitter();

  listOfDepartures = [];
  listOfArrivals = [];
  departureIsSelected = false;
  arrivalIsSelected = false;
  selectedDeparture;
  selectedArrival;
  availableTrips;

  constructor() {
  }

  ngOnInit() {
    this.afterCall(this.allTrips);
  }

  afterCall(data) { // After the API call
    let len = data.length;
    while (len--) {
      this.createDepartureList(data[len].departure);
    }
  }

  createDepartureList(name1) { // Create the list of the city for the departures
    const obj1 = {name: name1};
    this.pushCity(obj1, this.listOfDepartures);
  }

  pushCity(cityObj, list) { // It check if the city is present, if not, it pushes the city in the list.
    if (this.elementNotPresent(list, cityObj)) {
      list.push(cityObj);
    }
  }

  elementNotPresent(obj, city) { // Check the presence of the element in the list
    let notPresent = true;
    Object.keys(obj).forEach(function (key) {
      if (obj[key].name === city.name) {
        notPresent = false;
      }
    });
    return notPresent;
  }

  filterArrivals() { // Filter the list of the arrivals basis on the selected departure
    this.listOfArrivals = [];
    let len = this.allTrips.length;
    while (len--) {
      const objToInsert = {name: this.allTrips[len].arrival};
      if (this.isDepartureValid(objToInsert['name']) === true && this.elementNotPresent(this.listOfArrivals, objToInsert)) {
        this.listOfArrivals.push(objToInsert);
      }
    }
    this.departureIsSelected = true;
  }

  isDepartureValid(cityToInsert) { // Check if the arrivals has a trip with the current departure
    let toInsert = false;
      const response = this.allTrips,
      selectedDeparture = this.selectedDeparture.name;
    Object.keys(response).forEach(function (key) {
      if (response[key].arrival === cityToInsert && selectedDeparture === response[key].departure) {
        toInsert = true;
      }
    });
    return toInsert;
  }
  applyDiscount(deal) { // Apply the discount and create a new field with the final price
    deal.finalCost = deal.cost - (deal.cost / 100 * deal.discount);
    return deal;
  }
  filterTrips(criteria) { // Filter the trips basis on the departure and arrival
    this.availableTrips = [];
    let sortedList, len = this.allTrips.length;
    while (len--) {
      let currentTrip = this.allTrips[len];
      if (currentTrip.departure === this.selectedDeparture.name &&
        currentTrip.arrival === this.selectedArrival.name) {
        currentTrip = this.applyDiscount(currentTrip);
        this.availableTrips.push(currentTrip);
      }
      if (criteria === 'cost') {
        sortedList = ( this.availableTrips.sort(this.compareCosts));
      } else {
        sortedList = ( this.availableTrips.sort(this.compareDuration));
      }
    }
    this.tripsUpdated.emit([sortedList, criteria]);
  }

  compareCosts(a, b) {
    return parseInt(a['cost'], 10) - parseInt(b['cost'], 10);
  }

  compareDuration(a, b) {
    const hoursResult = parseInt(a['duration'].h, 10) - parseInt(b['duration'].h, 10);
    if (hoursResult === 0)  {
      return  parseInt(a['duration'].m, 10) - parseInt(b['duration'].m, 10);
    }
    return hoursResult;
  }
  selectArrival() {
    this.arrivalIsSelected = true;
  }
}
