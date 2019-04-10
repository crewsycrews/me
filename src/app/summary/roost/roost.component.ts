import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-roost',
  templateUrl: '../jobs.component.html',
  styleUrls: [
    '../../app.component.less',
    '../../main/main.component.less',
    '../summary.component.less',
    './roost.component.less'
  ]
})
export class RoostComponent implements OnInit {
  job = {
    Name: 'roost',
    URL: 'http://roost.ru',
    LogoURL: 'assets/images/roost_logo.png',
    Period: null,
    Position: 'System Administrator',
    // tslint:disable-next-line:max-line-length
    Duties: 'Windows Server 2008 R2+Active Directory administration. User rights control,using VBS for applying group policies. Entering into domen of 150 computers via special soft. Technical support for 200 users. IP-cameras installing,laying UTP-cables inside,outside and between buildings. Installing switch lockers with network hardware. Commutating of network hardware.',
    projects: [
      'Solo developing corporate portal via Wordpress with automatic user syncing from Active Directory.',
      'Development of network infrastructure in a huge production area'
    ],
  };
  // tslint:disable-next-line:max-line-length
  techs = [
    'centos',
    'ubuntuserver',
    'windowsserver',
    'LAMP',
    'redmine',
    'ocs',
    'openvpn',
    'squid',
    'bacula',
    'zabbix',
    'wordpress',
    'ps',
    'bash',
    'ansible',
    'vscode'
  ];
  technologies = new Array();


  constructor(private share: JobsService) {
    this.job.Period = this.share.jobsPeriods[this.job.Name];
    for (const tech in this.share.technologies) {
      if (this.techs.includes(this.share.technologies[tech].name)) {
        this.technologies.push(this.share.technologies[tech]);
      }
    }
  }
  ngOnInit() {
  }

}
