import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CasesService } from '../cases.service';
import { LocationsService } from '../locations.service';
import { HttpClient } from  '@angular/common/http';


@Component({
  selector: 'app-cases-form',
  templateUrl: './cases-form.component.html',
  styleUrls: ['./cases-form.component.css']
})
export class CasesFormComponent implements OnInit {
  locations;
  caseForm;
  isRevealed = false;
  mapRefresh = false;
  constructor(private cs: CasesService, private ls: LocationsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.locations = this.ls.get();
    this.caseForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)]),
      location: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      extraNotes: new FormControl('')
    })
  }

  onSubmit(newCase){
    let tmp = this.ls.addToLocation(newCase.location);
    this.cs.add(newCase);
    this.caseForm.reset();
    this.ls.callMap();
    //TODO figure out why this won't post to server
    this.http.post('https://218.selfip.net/apps/SYnNk5hITi/collections/1/documents', {
      "key": newCase.phoneNumber,
      "data": newCase
    }).subscribe(
      (data)=>{
        //TODO should this be null?
        console.log("case-POST DATA: " + data);
      },
      (error)=>{
        console.log("case-AT POST: " + error);
      }
    )
  }

  reveal(){
    this.isRevealed = !this.isRevealed;
  }

}
