import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-nashstil',
  templateUrl: '../jobs.component.html',
  styleUrls: [
    '../../app.component.less',
    '../../main/main.component.less',
    '../summary.component.less',
    './nashstil.component.less'
  ]
})
export class NashstilComponent implements OnInit {
  job = {
    Name : "NashStil",
    URL : "",
    Period: null,
    Position : "Advertising manager",
    Duties: "Creating and running marketing companys on Yandex.Direct, Google.Adwords. Beginning with harvesting semantic core, finishing up with all kinds of additions to adverts(quick links, clarifications, business cards).Developing all-way-through and SEO-promotion medicaments,  building  thematics web-sites; Internet-stores of clothes, realtor proposals.SEO: buying external references, internal resource optimizations (metategs, relevance and unique of the content), content filling.",
  };
  techs = ["html", "css", "php", "JS","Wordpress", "joomla", "bitrix", "direct", "adword"];
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
