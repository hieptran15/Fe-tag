import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TagOnSharedModule } from 'app/shared/shared.module';

import { PasswordStrengthBarComponent } from './password/password-strength-bar.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from './settings/settings.component';
import { accountState } from './account.route';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
// import { CaptchaModule } from 'primeng/captcha';

@NgModule({
  imports: [TagOnSharedModule, RouterModule.forChild(accountState), DialogModule, ToastModule],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
  ],
})
export class AccountModule {}
