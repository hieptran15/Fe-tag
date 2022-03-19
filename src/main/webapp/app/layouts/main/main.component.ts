import { Component, OnInit, RendererFactory2, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService } from 'app/core/login/login.service';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  private renderer: Renderer2;
  login = false;
  showModalQC = false;
  showModalUsermanual = false;
  logginSubscription: any;
  loggoutSubscription: any;
  listQuestion = [
    {
      ask: 'qc.qs1.ask1',
      answer: 'qc.qs1.answer1'
    },
    {
      ask: 'qc.qs2.ask2',
      answer: 'qc.qs2.answer2'
    },
    {
      ask: 'qc.qs3.ask3',
      answer: 'qc.qs3.answer3'
    },
    {
      ask: 'qc.qs4.ask4',
      answer: 'qc.qs4.answer4'
    },
    {
      ask: 'qc.qs5.ask5',
      answer: 'qc.qs5.answer5'
    },
    {
      ask: 'qc.qs6.ask6',
      answer: 'qc.qs6.answer6'
    },
    {
      ask: 'qc.qs7.ask7',
      answer: 'qc.qs7.answer7'
    },
    {
      ask: 'qc.qs8.ask8',
      answer: 'qc.qs8.answer8'
    },
    {
      ask: 'qc.qs9.ask9',
      answer: 'qc.qs9.answer9'
    },
    {
      ask: 'qc.qs10.ask10',
      answer: 'qc.qs10.answer10'
    },
    {
      ask: 'qc.qs11.ask11',
      answer: 'qc.qs11.answer11'
    }
  ];

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2,
    private eventManager: JhiEventManager,
    private loginService: LoginService
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
    this.logginSubscription = this.eventManager.subscribe('loggedin', () => (this.login = true));
    this.loggoutSubscription = this.eventManager.subscribe('loggedout', () => (this.login = false));
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.logginSubscription);
  }

  ngAfterViewInit(): void {
    console.log('Getting all icons from server');
    $('#all-icons').load('/content/images/icons.svg', () => {
      console.log('All icons loaded');
    });
  }

  ngOnInit(): void {
    // try to log in automatically

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();

      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
