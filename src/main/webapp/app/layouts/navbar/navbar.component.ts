import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { MessageService } from 'primeng/api';
import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/core/language/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { LocationService } from '../../shared/util/location.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from 'app/entities/profile/profile-details/loginsecurity/confirm-password.validator';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CHANGEPASS_ALREADY_USED_TYPE, CHANGEPASS_ALREADY_USED_TYPE_DUPLICATE } from 'app/shared/constants/error.constants';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  profile: any;
  error = false;
  swaggerEnabled?: boolean;
  version: string;
  showModalChangePassWord = false;
  showConfirmChangePassWord = false;
  passwordForm: any;
  rePassword: any;
  newPassword: any;
  isEditContact: any;
  showModalChangePassWordSuccess = false;
  showModalChangePassWordFail = false;

  constructor(
    private alertService: MessageService,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
        rePassword: ['', Validators.required],
      },
      {
        validator: ConfirmPasswordValidator('newPassword', 'rePassword'),
      }
    );
    this.getProfile();
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  collapseNavbarPassword(): void {
    this.showModalChangePassWord = true;
    this.passwordForm.reset();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }

  getProfile(): any {
    this.profileService.getUserProfile().subscribe(
      data => {
        this.profile = data.response;
      },
      err => {
        console.log(err);
      }
    );
  }

  changePassword(): any {
    this.locationService
      .changePassword({
        currentPassword: this.passwordForm.get('password').value,
        newPassword: this.passwordForm.get('newPassword').value,
      })
      .subscribe(
        data => {
          this.showModalChangePassWordSuccess = !this.showModalChangePassWordSuccess;
          this.showModalChangePassWord = !this.showModalChangePassWord;
          this.showConfirmChangePassWord = !this.showConfirmChangePassWord;
          this.isEditContact = !this.isEditContact;
          this.alertService.add({
            severity: 'success',
            summary: this.translateService.instant('login.messages.successtitle'),
            detail: this.translateService.instant('login.messages.changesuccess'),
          });
          this.passwordForm.patchValue({
            password: '',
            newPassword: '',
            rePassword: '',
          });
          this.newPassword = data.response.map((i: any) => {
            return { lable: i.title };
          });
        },
        response => {
          this.showConfirmChangePassWord = !this.showConfirmChangePassWord;
          this.showModalChangePassWord = false;
          this.isEditContact = false;
          this.processError(response);
        }
      );
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === CHANGEPASS_ALREADY_USED_TYPE) {
      this.alertService.add({
        severity: 'error',
        summary: this.translateService.instant('login.messages.errortitle'),
        detail: this.translateService.instant('security.form.invalid'),
      });
    } else if (response.status === 400 && response.error.type === CHANGEPASS_ALREADY_USED_TYPE_DUPLICATE) {
      this.alertService.add({
        severity: 'error',
        summary: this.translateService.instant('login.messages.errortitle'),
        detail: this.translateService.instant('security.form.duplicate'),
      });
    } else {
      this.error = true;
    }
  }
}
