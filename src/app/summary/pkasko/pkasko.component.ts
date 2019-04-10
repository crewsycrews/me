import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-pkasko',
  templateUrl: '../jobs.component.html',
  styleUrls: [
    '../../app.component.less',
    '../../main/main.component.less',
    '../summary.component.less',
    './pkasko.component.less'
  ]
})
export class PkaskoComponent implements OnInit {
  job = {
    Name : "pkasko",
    URL : "http://pkasko.com",
    LogoURL : "https://pkasko.com/img/logoHead.png",
    Period: null,
    Position : "PHP-developer",
    Duties: "Creation of beck-end part of service. Calculation of insurance KASKO and OSAGO inside local java and php servelets(b2b). Integration of calculators from most popular Russian insurance companies. Support of own API for inner and outer purposes.",
  };
  techs = ["php","java","laravel","angular","postman","JS","mysql","mercurial","vscode","redmine"];
  technologies = new Array();


  constructor(private share:JobsService ) {
    this.job.Period = this.share.jobsPeriods[this.job.Name];
    for(var tech in this.share.technologies) {
      if(this.techs.includes(this.share.technologies[tech].name)) {
        this.technologies.push(this.share.technologies[tech]);
      }
    }
   }

  ngOnInit() {
  }

}
