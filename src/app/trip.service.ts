import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Rx';



@Injectable()
export class TripService {
  constructor(private _http: HttpClient) { }
  public getJSON(): Observable<any> {
    return this._http.get('api/getResponse');
  } // Not used anymore
  public getFile() {
    return require('./../../src/api/response.json');
  }
}
