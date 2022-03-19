import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'app/core/auth/account.service';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { LANGUAGES } from 'app/core/language/language.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  closeResult = '';
  submitted = false;
  public username: any = '';
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  public password: any = '';
  public email: any = '';
  errorMessage = '';
  langKey = 'vi';

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private accountService: AccountService,
    private alertService: MessageService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.router.navigate(['profile']);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit(): any {
    this.email = this.loginForm.get('email')!.value;
    this.password = this.loginForm.get('password')!.value;
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
    this.langKey = languageKey;
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }
}
