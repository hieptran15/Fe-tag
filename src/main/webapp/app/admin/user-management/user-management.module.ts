import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';

import { TagOnSharedModule } from 'app/shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementDetailComponent } from './user-management-detail.component';
import { UserManagementUpdateComponent } from './user-management-update.component';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [TagOnSharedModule, RouterModule.forChild(userManagementRoute), TooltipModule, DropdownModule, InputTextModule, ButtonModule],
  declarations: [
    UserManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent,
    UserManagementDeleteDialogComponent,
  ],
  entryComponents: [UserManagementDeleteDialogComponent],
})
export class UserManagementModule {}
