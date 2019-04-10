import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cubeTransitions } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    // cubeTransitions
  ]
})
export class AppComponent {
  // Donno how it works with animations in Angular WTF?!
  // @HostBinding('@cubeTransitions') cubeTransitions = true;
  // @HostBinding('style.display') display = 'block';
  // @HostBinding('style.position') position = 'flex';
  height = document.documentElement.clientHeight;
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  constructor() {

  }
}
