import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../app.component.less', './projects.component.less']
})
export class ProjectsComponent implements OnInit {
  constructor(private pageTitle: Title, private meta: Meta) {}

  ngOnInit(): void {
    const ogImageUrl = `${window.location.origin}/assets/images/og-image.png`;
    this.pageTitle.setTitle('Projects | Danil Rodin');
    this.meta.updateTag({
      name: 'description',
      content: 'Selected projects by Danil Rodin including game development and tooling work.'
    });
    this.meta.updateTag({ property: 'og:title', content: 'Projects | Danil Rodin' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Selected projects by Danil Rodin including game development and tooling work.'
    });
    this.meta.updateTag({ property: 'og:image', content: ogImageUrl });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Danil Rodin' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: ogImageUrl });
  }
}
