import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  cases = [

  ]
  constructor() { }
  get(){
    return this.cases;
  }
  add(newPerson){
    this.cases.push(newPerson);
    return newPerson;
  }
  delete(deletePerson){
    let tmp = this.cases.indexOf(deletePerson)
    this.cases.splice(tmp, 1);
  }
}
