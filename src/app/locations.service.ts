import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  locations = [

  ]

  constructor() { }

  private mapCall = new Subject<any>();
  mapCalled$ = this.mapCall.asObservable();
  callMap() {
    this.mapCall.next();
  }

  get(){
    return this.locations;
  }
  add(newLocation){
    this.locations.push(newLocation);

  }
  addToLocation(locN){
    for(var l of this.locations){
      if(l.locName == locN){
        l.num++;
        return l;
      }
    }
  }

}
