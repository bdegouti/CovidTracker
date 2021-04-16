import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from  '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasesComponent } from './cases/cases.component';
import { CasesFormComponent } from './cases-form/cases-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    CasesComponent,
    CasesFormComponent,
    LocationFormComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
