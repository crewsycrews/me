import { Component, OnInit } from '@angular/core';
import { Blinking } from '../animations';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    '../app.component.less',
    './main.component.less'],
  animations: [
    Blinking
  ]
})

export class MainComponent implements OnInit {
  title = 'Madbroz';
  classForText = 'textBlock0';
  textyText = 'Software dev';
  textyTexts = ['Software dev', 'Family guy', 'Healthy lifestyle'];
  lightColor = null;
  colors = ['Green', 'White', 'Red', 'Blue', 'Yellow'];
  i = 1;
  j = 1;
  k = 0;
  colorLogoChange() {
    this.lightColor = 'light' + this.colors[this.j];
    this.j++;
    if (this.j === 5) {
      this.j = 0;
    }
  }
  colorShChange() {
    if (this.k === 4) {
      this.k = 0;
      return;
    }
    this.k++;
  }

  redirectToBlog() {
    window.location.href = "https://blog.crewsis.me";
  }

  constructor(private pageTitle: Title, private meta: Meta) {
    setTimeout(() => {
      this.lightColor = 'lightGreen';
    }, 1);
    setInterval(() => {
      this.colorLogoChange();
    }, 10000);
    setTimeout(() => {
      this.colorShChange();
      setInterval(() => {
        this.colorShChange();
      }, 10000);
    }, 11800);
    setInterval(() => {
      this.classForText = 'textBlock' + this.i;
      this.textyText = this.textyTexts[this.i];
      this.i++;
      if (this.i === 3) {
        this.i = 0;
      }
    }, 4000);
  }

  ngOnInit() {
    const ogImageUrl = `${window.location.origin}/assets/images/og-image.png`;
    this.pageTitle.setTitle('Danil Rodin | Fullstack Developer');
    this.meta.updateTag({
      name: 'description',
      content: 'Personal website of Danil Rodin: fullstack developer, projects, links and background.'
    });
    this.meta.updateTag({ property: 'og:title', content: 'Danil Rodin | Fullstack Developer' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Personal website of Danil Rodin with projects and developer profile.'
    });
    this.meta.updateTag({ property: 'og:image', content: ogImageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Danil Rodin' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: ogImageUrl });
  }

}
