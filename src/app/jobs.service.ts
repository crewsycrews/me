import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  jobsPeriods = {
    pkasko: "AUG. 2018 - PRESENT DAY",
    roost: "DEC. 2016 - AUG. 2018",
    NashStil: "SEP. 2015 - SEP. 2016"
  }
  technologies = {
    php: {
      url: "http://php.net",
      name: "php"
    },
    java: {
      url: "http://java.com",
      name: "java"
    },
    laravel: {
      url: "http://laravel.com",
      name: "laravel"
    },
    angular: {
      url: "http://angular.io",
      name: "angular"
    },
    postman: {
      url: "http://getpostman.com",
      name: "postman"
    },
    JS: {
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      name: "JS"
    },
    mysql: {
      url: "http://mysql.com",
      name: "mysql"
    },
    mercurial: {
      url: "https://www.mercurial-scm.org/",
      name: "mercurial"
    },
    centos: {
      url: "https://www.centos.org/",
      name: "centos"
    },
    ubuntuserver: {
      url: "https://www.ubuntu.com/server",
      name: "ubuntuserver"
    },
    windowsserver: {
      url: "https://en.wikipedia.org/wiki/Windows_Server",
      name: "windowsserver"
    },
    LAMP: {
      url: "https://en.wikipedia.org/wiki/LAMP_(software_bundle)",
      name: "LAMP"
    },
    redmine: {
      url: "https://www.redmine.org/",
      name: "redmine"
    },
    ocs: {
      url: "https://www.ocsinventory-ng.org/",
      name: "ocs"
    },
    openvpn: {
      url: "https://openvpn.net/",
      name: "openvpn"
    },
    squid: {
      url: "http://www.squid-cache.org/",
      name: "squid"
    },
    bacula: {
      url: "https://blog.bacula.org/",
      name: "bacula"
    },
    zabbix: {
      url: "https://www.zabbix.com/",
      name: "zabbix"
    },
    wordpress: {
      url: "https://wordpress.org/",
      name: "wordpress"
    },
    ps: {
      url: "https://en.wikipedia.org/wiki/PowerShell",
      name: "ps"
    },
    bash: {
      url: "https://en.wikipedia.org/wiki/Bash_(Unix_shell)",
      name: "bash"
    },
    ansible: {
      url: "https://www.ansible.com/",
      name: "ansible"
    },
    vscode: {
      url: "https://code.visualstudio.com/",
      name: "vscode"
    },
    html: {
      url: "https://en.wikipedia.org/wiki/HTML",
      name: "html"
    },
    css: {
      url: "https://en.wikipedia.org/wiki/Cascading_Style_Sheets",
      name: "css"
    },
    joomla: {
      url: "https://www.joomla.org/",
      name: "joomla"
    },
    bitrix: {
      url: "https://www.1c-bitrix.ru/",
      name: "bitrix"
    },
    direct: {
      url: "https://direct.yandex.com/",
      name: "direct"
    },
    adword: {
      url: "https://en.wikipedia.org/wiki/Google_Ads",
      name: "adword"
    },
  }
  constructor() { }
}
// "centos","ubuntuserver","windowsserver","LAMP","redmine", "ocs", "openvpn", "squid", "bacula", "zabbix", "wordpress", "ps", "bash", "ansible"
