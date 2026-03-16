import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../app.component.less', './about.component.less']
})
export class AboutComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    const ogImageUrl = `${window.location.origin}/assets/images/og-image.png`;
    this.title.setTitle('About me | Danil Rodin');
    this.meta.updateTag({
      name: 'description',
      content: 'Danil Rodin - fullstack developer, tech stack, background and personal profile.'
    });
    this.meta.updateTag({ property: 'og:title', content: 'About me | Danil Rodin' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Fullstack developer profile and tech stack.'
    });
    this.meta.updateTag({ property: 'og:image', content: ogImageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Danil Rodin' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: ogImageUrl });
  }
}
