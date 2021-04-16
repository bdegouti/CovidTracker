import { Component, OnInit, Input } from '@angular/core';
import { CasesService } from '../cases.service';
import { HttpClient } from  '@angular/common/http';

@Component({
  selector: '[app-cases]',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  @Input() cases_input;
  infoIsRevealed = false;

  constructor(private cs: CasesService,  private http: HttpClient) { }

  ngOnInit(): void {
  }

  //TODO test
  onDelete(){
    this.cs.delete(this.cases_input);
    this.http.delete('https://218.selfip.net/apps/SYnNk5hITi/collections/1/documents/' + this.cases_input.phoneNumber).subscribe(data => {
      console.log(data);
    })
  }

  revealInfo(){
    this.infoIsRevealed = true;
  }

  closeInfo(){
    this.infoIsRevealed = false;
  }

}
