import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: [
    '../app.component.less',
    '../main/main.component.less',
    './summary.component.less'
  ]
})
export class SummaryComponent implements OnInit {
  birthDate = new Date(1992, 2, 1).getTime();
  currentDate = new Date().getTime();
  // age = null;
  age = new Date(this.currentDate - this.birthDate).getFullYear() - 1970;
  jobs: object;
  constructor(private share: JobsService) {
    this.jobs = this.share.jobsPeriods;
   }

  ngOnInit() {
  }

}
