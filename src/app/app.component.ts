import { Component } from '@angular/core';
import {  trigger, state, style, animate, transition, keyframes} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('Blinking', [
      // ...
      state('lightGreen', style({
        textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)"
      })),
      state('lightRed', style({
        textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)"
      })),
      state('lightYellow', style({
        textShadow: "0px 0px 25px rgba(210, 210, 40, 0.9)"
      })),
      state('lightBlue', style({
        textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)"
      })),
      state('lightWhite', style({
        textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)"
      })),
      transition('* => lightGreen', [
        animate('1.8s', keyframes([
          style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.1)", offset: 0.05}),
          style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 0.25}),
          style({ textShadow: "0px 0px 2px rgba(40, 210, 40, 0.1)", offset: 0.3}),
          style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 0.35}),
          style({ textShadow: "0px 0px 2px rgba(40, 210, 40, 0.1)", offset: 0.5}),
          style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 0.55}),
          style({ textShadow: "0px 0px 2px rgba(40, 210, 40, 0.1)", offset: 0.75}),
          style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.8)", offset: 0.95}),
          style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 1})
        ])),
      ]),
      transition('* => lightRed', [
        animate('1.8s', keyframes([
          style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.1)", offset: 0.05}),
          style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 0.25}),
          style({ textShadow: "0px 0px 2px rgba(210, 40, 40, 0.1)", offset: 0.3}),
          style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 0.35}),
          style({ textShadow: "0px 0px 2px rgba(210, 40, 40, 0.1)", offset: 0.5}),
          style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 0.55}),
          style({ textShadow: "0px 0px 2px rgba(210, 40, 40, 0.1)", offset: 0.75}),
          style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.8)", offset: 0.95}),
          style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 1})
        ])),
      ]),
      transition('* => lightYellow', [
        animate('1.8s', keyframes([
          style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.1)", offset: 0.05}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 0.25}),
          style({ textShadow: "0px 0px 2px rgba(200, 200, 40, 0.1)", offset: 0.3}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 0.35}),
          style({ textShadow: "0px 0px 2px rgba(200, 200, 40, 0.1)", offset: 0.5}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 0.55}),
          style({ textShadow: "0px 0px 2px rgba(200, 200, 40, 0.1)", offset: 0.75}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.8)", offset: 0.95}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 1})
        ])),
      ]),
      transition('* => lightBlue', [
        animate('1.8s', keyframes([
          style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.1)", offset: 0.05}),
          style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 0.25}),
          style({ textShadow: "0px 0px 2px rgba(40, 40, 210, 0.1)", offset: 0.3}),
          style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 0.35}),
          style({ textShadow: "0px 0px 2px rgba(40, 40, 210, 0.1)", offset: 0.5}),
          style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 0.55}),
          style({ textShadow: "0px 0px 2px rgba(40, 40, 210, 0.1)", offset: 0.75}),
          style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.8)", offset: 0.95}),
          style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 1})
        ])),
      ]),
      transition('* => lightWhite', [
        animate('1.8s', keyframes([
          style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.1)", offset: 0.05}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 0.25}),
          style({ textShadow: "0px 0px 2px rgba(200, 200, 200, 0.1)", offset: 0.3}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 0.35}),
          style({ textShadow: "0px 0px 2px rgba(200, 200, 200, 0.1)", offset: 0.5}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 0.55}),
          style({ textShadow: "0px 0px 2px rgba(200, 200, 200, 0.1)", offset: 0.75}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.8)", offset: 0.95}),
          style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 1})
        ])),
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'Madbroz';
  height = document.documentElement.clientHeight;
  classForText = 'textBlock0';
  textyText = 'PHP developer';
  textyTexts = ["PHP developer","GameDev Romantic","ZSH lover"];
  lightColor = "lightGreen";
  colors = ["Green", "White", "Red", "Blue", "Yellow"]
  i=1;
  j=1;
  k=0;
  colorLogoChange() {
    this.lightColor = "light"+this.colors[this.j];
    this.j++;
    
    if(this.j==5) {
      this.j = 0;
    }
  };
  colorShChange() {
    if(this.k==4) {
      this.k=0;
      return;
    }
    this.k++;
  };
  constructor() {
  setInterval(() => { 
    this.colorLogoChange() 
    },7000);
  setTimeout(() => { 
      this.colorShChange()
      setInterval(() => { 
        this.colorShChange() 
      },7000);
    },8800);
  setInterval(() => { 
    this.classForText = "textBlock" + this.i;
    this.textyText = this.textyTexts[this.i];
    this.i++;
    if (this.i == 3) {
      this.i = 0;
    }
    },4000);
  }
}
