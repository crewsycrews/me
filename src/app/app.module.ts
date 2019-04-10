import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryComponent } from './summary/summary.component';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { PkaskoComponent } from './summary/pkasko/pkasko.component';
import { RoostComponent } from './summary/roost/roost.component';
import { NashstilComponent } from './summary/nashstil/nashstil.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    MainComponent,
    ProjectsComponent,
    PkaskoComponent,
    RoostComponent,
    NashstilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
