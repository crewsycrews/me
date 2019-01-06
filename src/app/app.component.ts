import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cubeTransitions } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    cubeTransitions
  ]
})
export class AppComponent {
  height = document.documentElement.clientHeight;
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  constructor() {
 
  }
}
