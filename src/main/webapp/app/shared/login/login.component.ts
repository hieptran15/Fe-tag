import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { PasswordResetInitService } from 'app/account/password-reset/init/password-reset-init.service';
import { any } from 'codelyzer/util/function';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService],
})
export class LoginModalComponent implements AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;
  authenticationError = false;
  displayModal: boolean | undefined;
  statusClass = 'message_error';
  success = false;
  email: any;
  regex = /^[^!@#$%^()~&*,./';<>?|:"`]*$/;
  regexUsername = /^[^!#$%^()~&*,/';<>?|:"`]*$/;
  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    rememberMe: [false],
  });

  constructor(
    private alertService: MessageService,
    private passwordResetInitService: PasswordResetInitService,
    private translateService: TranslateService,
    private el: ElementRef,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
    // this.activeModal.dismiss('cancel');
  }
  login(): void {
    for (const key of Object.keys(this.loginForm.controls)) {
      if (this.loginForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        return;
      }
    }
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          // localStorage.setItem('info', password)
          this.alertService.add({
            severity: 'success',
            summary: this.translateService.instant('login.messages.successtitle'),
            detail: this.translateService.instant('login.messages.success'),
          });
          this.router.navigate(['/projects']);
        },
        err => {
          this.authenticationError = true;
          this.alertService.add({
            severity: 'error',
            summary: this.translateService.instant('login.messages.errortitle'),
            detail: this.translateService.instant('login.messages.error.authentication'),
          });
        }
      );
  }
  resetPassword(): void {
    this.passwordResetInitService.save(this.email).subscribe(
      () => {
        (this.success = true),
          (this.displayModal = false),
          this.alertService.add({
            severity: 'success',
            summary: this.translateService.instant('login.messages.successtitle'),
            detail: this.translateService.instant('login.reset.success'),
          });
      },
      response => {
        (this.displayModal = false),
          this.alertService.add({
            severity: 'error',
            summary: this.translateService.instant('login.messages.errortitle'),
            detail: this.translateService.instant('login.reset.fail'),
          });
      }
    );
  }
  register(): void {
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }
  showModalDialog(): any {
    this.displayModal = true;
  }
  setActiveClass(): any {
    this.statusClass = 'active';
  }
  onKeyPress(event: any, regex: any): void {
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }
}
