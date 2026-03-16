import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: MainComponent, data: {animation: 'HomePage'} },
  { path: 'projects', component: ProjectsComponent, data: {animation: 'ProjectsPage'} },
  { path: 'about', component: AboutComponent, data: {animation: 'AboutPage'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
