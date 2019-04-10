import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { PkaskoComponent } from './summary/pkasko/pkasko.component';
import { RoostComponent } from './summary/roost/roost.component';
import { NashstilComponent } from './summary/nashstil/nashstil.component';

const routes: Routes = [
  { path: '', component: MainComponent, data: {animation: 'HomePage'} },
  { path: 'summary', component: SummaryComponent,  data: {animation: 'summary'} },
  { path: 'projects', component: ProjectsComponent,  data: {animation: 'projects'} },
  { path: 'summary/jobs/pkasko', component: PkaskoComponent,  data: {animation: 'job'} },
  { path: 'summary/jobs/roost', component: RoostComponent,  data: {animation: 'job'} },
  { path: 'summary/jobs/nashstil', component: NashstilComponent,  data: {animation: 'job'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
