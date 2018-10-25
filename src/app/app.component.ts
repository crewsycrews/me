import { Component } from '@angular/core';
import {  trigger, state, style, animate, transition, keyframes} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('Blinking', [
      // ...
      state('lightOn', style({
        textShadow: "0px 0px 25px rgba(40, 155, 40, 0.9)"
      })),
      state('lightOff', style({
        textShadow: "0px 0px 25px rgba(40, 155, 40, 0.9)"
      })),
      transition('* <=> lightOn', [
        animate('1.8s ease-out', keyframes([
          style({ textShadow: "0px 0px 30px rgba(40, 155, 40, 0.1)", offset: 0.05}),
          style({ textShadow: "0px 0px 25px rgba(40, 155, 40, 0.9)", offset: 0.25}),
          style({ textShadow: "0px 0px 2px rgba(40, 155, 40, 0.1)", offset: 0.3}),
          style({ textShadow: "0px 0px 25px rgba(40, 155, 40, 0.9)", offset: 0.35}),
          style({ textShadow: "0px 0px 2px rgba(40, 155, 40, 0.1)", offset: 0.5}),
          style({ textShadow: "0px 0px 25px rgba(40, 155, 40, 0.9)", offset: 0.55}),
          style({ textShadow: "0px 0px 2px rgba(40, 155, 40, 0.1)", offset: 0.75}),
          style({ textShadow: "0px 0px 25px rgba(40, 155, 40, 0.8)", offset: 0.95}),
          style({ textShadow: "0px 0px 25px rgba(40, 155, 40, 0.9)", offset: 1})
        ])),
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'Madbroz';
  height = document.documentElement.clientHeight;
  isLighten = true;
  toggle() {
    this.isLighten = !this.isLighten;
  };
  constructor() {
  setInterval(() => { 
    this.toggle() 
    },7000);
  }
}
