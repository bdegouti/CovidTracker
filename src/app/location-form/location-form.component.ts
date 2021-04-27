import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  locationForm;
  isInvalid = false;
  constructor(private ls: LocationsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.locationForm = new FormGroup({
      locName: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required, Validators.max(90), Validators.min(-90)]),
      long: new FormControl('', [Validators.required, Validators.max(180), Validators.min(-180)])
    })
  }

  onSubmit(newLocation){
    var nl = {locName: newLocation.locName, lonlat: [newLocation.long, newLocation.lat], num: 0}
    for(var a of this.ls.locations){
      if(a.locName == nl.locName){
        this.isInvalid=true;
        return;
      }
      else{
        this.isInvalid=false;
      }
    }
    this.ls.add(nl);
    //TODO
    this.http.post('https://218.selfip.net/apps/SYnNk5hITi/collections/1/documents', {
      "key": nl.locName,
      "data": nl
    }).subscribe(
      (data)=>{
        console.log("loc-POST DATA: " + data);
      },
      (error)=>{
        console.log("loc-AT POST: " + error);
      }
    )
    this.locationForm.reset();
  }

}
