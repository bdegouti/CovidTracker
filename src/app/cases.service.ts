import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  cases = [

  ]

  invert = [false, false, false]

  constructor() { }
  get(){
    return this.cases;
  }
  set(newCases){
    this.cases=newCases;
  }
  add(newCase){
    this.cases.push(newCase);
    return newCase;
  }
  delete(deleteCase){
    let tmp = this.cases.indexOf(deleteCase)
    this.cases.splice(tmp, 1);
  }

  sortByLocation(){
    let tmp = this.cases;
    if(!this.invert[0]){
      tmp.sort(function(a, b) {
        var nA = a.location.toUpperCase()
        var nB = b.location.toUpperCase()
        if(nA < nB){
          return -1;
        }
        if(nA > nB){
          return 1
        }
        return 0;
      })
    }
    else{
      tmp.sort(function(a, b) {
        var nA = a.location.toUpperCase()
        var nB = b.location.toUpperCase()
        if(nA > nB){
          return -1;
        }
        if(nA < nB){
          return 1
        }
        return 0;
      })
    }
    this.cases = tmp;
    this.invert[0] = !this.invert[0];
  }

  sortByName(){
    let tmp = this.cases;
    if(!this.invert[1]){
      tmp = tmp.sort(function(a, b) {
        var nA = a.name.toUpperCase()
        var nB = b.name.toUpperCase()
        if(nA < nB){
          return -1;
        }
        if(nA > nB){
          return 1
        }
        return 0;
      })
    }
    else{
      tmp = tmp.sort(function(a, b) {
        var nA = a.name.toUpperCase()
        var nB = b.name.toUpperCase()
        if(nA > nB){
          return -1;
        }
        if(nA < nB){
          return 1
        }
        return 0;
      })
    }
    this.invert[1] = !this.invert[1];
    this.cases = tmp;
  }

  sortByDate(){
    let tmp = this.cases;
    if(!this.invert[2]){
      tmp.sort(function(a, b) {
        var nA = a.date;
        var nB = b.date;
        if(nA < nB){
          return -1;
        }
        if(nA > nB){
          return 1
        }
        return 0;
      })
    }
    else{
      tmp.sort(function(a, b) {
        var nA = a.date;
        var nB = b.date;
        if(nA > nB){
          return -1;
        }
        if(nA < nB){
          return 1
        }
        return 0;
      })
    }
    this.cases = tmp;
    this.invert[2] = !this.invert[2];
  }
}
