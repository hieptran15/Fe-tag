import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'jhi-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumb: any[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.getBreadcrumb();
      }
    });
  }

  ngOnInit(): void {
    this.getBreadcrumb();
  }

  replaceAll(string: string, search: string, replace: string): any {
    return string.split(search).join(replace);
  }

  getBreadcrumb(): void {
    const pathname = window.location.pathname;
    const splitted = pathname.split('/');
    const arr = [];
    for (let i = 1; i < splitted.length; i++) {
      let url = '';
      let j = 1;
      while (j <= i) {
        url = url + '/' + splitted[j];
        j++;
      }
      // console.log(url);
      arr.push({ url, name: 'path.' + this.replaceAll(splitted[i], '-', ' ') });
    }
    if (arr.length > 0) {
      this.breadcrumb = arr;
      console.log(arr);
    }
  }
}
