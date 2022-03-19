import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { JhiLanguageService } from 'ng-jhipster';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'app/entities/profile/profile-details/loginsecurity/confirm-password.validator';
import { SITE_KEY } from '../../app.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ConfirmationService],
  // encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements AfterViewInit, OnInit {
  @ViewChild('login', { static: false })
  login?: ElementRef;
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  checked = false;
  SITE_KEY = SITE_KEY;
  displayModal: boolean | undefined;

  registerForm = this.fb.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      isCheck: ['', [Validators.required, Validators.requiredTrue]],
      rePassword: ['', [Validators.required]],
    },
    {
      validator: ConfirmPasswordValidator('password', 'rePassword'),
    }
  );

  constructor(
    private alertService: MessageService,
    private languageService: JhiLanguageService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
  }

  register(): void {
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    const password = this.registerForm.get(['password'])!.value;
    const login = this.registerForm.get(['email'])!.value;
    const email = this.registerForm.get(['email'])!.value;
    this.registerService.save({ login, email, password, langKey: this.languageService.getCurrentLanguage() }).subscribe(
      () => {
        this.success = true;
        this.alertService.add({
          severity: 'success',
          summary: this.translateService.instant('login.messages.successtitle'),
          detail: this.translateService.instant('register.messages.success'),
        });
        this.router.navigate(['']);
      },
      response => {
        this.processError(response);
      }
    );
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.alertService.add({
        severity: 'error',
        summary: this.translateService.instant('login.messages.errortitle'),
        detail: this.translateService.instant('register.messages.error.emailexists'),
      });
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.alertService.add({
        severity: 'error',
        summary: this.translateService.instant('login.messages.errortitle'),
        detail: this.translateService.instant('register.messages.error.emailexists'),
      });
    } else {
      this.error = true;
    }
  }

  showModalDialog(): any {
    if (!this.checked) {
      this.displayModal = true;
      this.checked = true;
    }
  }

  showModalDialog1(): any {
    this.displayModal = true;
  }

  tickCheckbox(): any {
    this.displayModal = false;
    this.registerForm.patchValue({ isCheck: true });
  }

  tickCheckboxNo(): any {
    this.displayModal = false;
    this.registerForm.patchValue({ isCheck: false });
  }

  showResponse(response: any): any {
    //call to a backend to verify against recaptcha with private key
  }
}
