import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { Authority } from 'app/shared/constants/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { RegisterComponent } from 'app/account/register/register.component';
import { ProjectComponent } from 'app/entities/project/project.component';
import { ProfileComponent } from 'app/entities/profile/profile.component';
import { ProfileDetailsComponent } from 'app/entities/profile/profile-details/profile-details.component';
import { HitsComponent } from 'app/entities/hits/hits.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'hits',
          canActivate: [UserRouteAccessService],
          component: HitsComponent,
        },
        {
          path: 'projects',
          data: {
            breadcrumb: 'Projects',
          },
          canActivate: [UserRouteAccessService],
          component: ProjectComponent,
        },
        {
          path: 'profile',
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./entities/profile/profile.module').then(m => m.ProfileModule),
        },
        {
          path: 'projects',
          canActivate: [UserRouteAccessService],
          component: ProjectComponent,
        },
        {
          path: 'register',
          component: RegisterComponent,
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: false } // TODO: change it back to DEBUG_INFO_ENABLED
    ),
  ],
  exports: [RouterModule],
})
export class TagOnAppRoutingModule {}
