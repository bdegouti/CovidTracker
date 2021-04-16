import { environment } from '../../environments/environment';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationsService } from '../locations.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Output() public fromMap: EventEmitter<string> = new EventEmitter();
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 49.277944;
  lng = -122.920977;
  constructor(private ls: LocationsService) {}
  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 10,
        center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    //prints points at init (from server)
    this.printPoints();
    //fires when case form is submitted
    this.ls.mapCalled$.subscribe(() => {
      this.printPoints();
    })
  }

  printPoints(){
    for(var a of this.ls.locations){
      if(a.num == 0){
        return;
      }
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      "<h5>"+a.locName+"</h5>"+"<p>"+a.num+" case(s)</p>"
      );
      
      new mapboxgl.Marker({color:"black"}).setLngLat(a.lonlat).setPopup(popup).addTo(this.map);
    }
  }
}