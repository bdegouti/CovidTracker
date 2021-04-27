import { Component, ErrorHandler } from '@angular/core';
import { CasesService } from './cases.service';
import { HttpClient } from  '@angular/common/http'
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { ɵangular_packages_platform_browser_platform_browser_n } from '@angular/platform-browser';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CovidTracker';
  cases;
  isRevealed = false;
  existingCases;

  constructor(private cs: CasesService, private ls: LocationsService, private http: HttpClient){

  }
  ngOnInit(){
    //TODO better way of doing this? arrays are bad?
    this.http.get<Object[]>('https://218.selfip.net/apps/SYnNk5hITi/collections/2/documents').subscribe(
      (data)=>{
        this.existingCases = data;
        for(var a of this.existingCases){
          this.ls.locations.push(a.data);
        }
      },
      (error)=>{
        console.log("ls-AT GET:" + (error));
      }
    )
    
    this.http.get<Object[]>('https://218.selfip.net/apps/SYnNk5hITi/collections/1/documents').subscribe(
      (data)=>{
        this.existingCases = data;
        for(var a of this.existingCases){
          this.cs.cases.push(a.data);
          //TODO find a better way of doing this (adding proper nums to ls at init)
          for(var l of this.ls.locations){
            if(a.location == l.locName){
              l.num++;
              break;
            }
          }
        }
      },
      (error)=>{
        console.log("cs-AT GET:" + (error));
      }
    )

    this.cases = this.cs.cases;
  }

  reveal(){
    this.isRevealed = !this.isRevealed;
  }
  sortByLocation(){
    if(this.cs.cases.length > 0)
      this.cs.sortByLocation();
  }
  sortByPerson(){
    if(this.cs.cases.length > 0)
      this.cs.sortByName();
  }
  sortByDate(){
    if(this.cs.cases.length > 0)
      this.cs.sortByDate();
  }
}
