import { LoginsecurityComponent } from './profile-details/loginsecurity/loginsecurity.component';
import { DealsComponent } from './profile-details/deals/deals.component';
import { DemographicComponent } from './profile-details/demographic/demographic.component';
import { BankinformationComponent } from './profile-details/bankinformation/bankinformation.component';
import { DocumentComponent } from './profile-details/document/document.component';
import { EducationComponent } from './profile-details/education/education.component';
import { ExperienceComponent } from './profile-details/experience/experience.component';
import { InformationComponent } from './profile-details/information/information.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { LanguageComponent } from './profile-details/language/language.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'detail',
    component: ProfileDetailsComponent,
    children: [
      {
        path: '',
        data: {
          breadcrumb: 'info',
        },
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        data: {
          breadcrumb: 'info',
        },
        component: InformationComponent,
      },
      {
        path: 'language',
        data: {
          breadcrumb: 'language',
        },
        component: LanguageComponent,
      },
      {
        path: 'exp',
        data: {
          breadcrumb: 'experience',
        },
        component: ExperienceComponent,
      },
      {
        path: 'edu',
        component: EducationComponent,
      },
      {
        path: 'doc',
        component: DocumentComponent,
      },
      {
        path: 'bank',
        component: BankinformationComponent,
      },
      {
        path: 'graphic',
        component: DemographicComponent,
      },
      {
        path: 'deals',
        component: DealsComponent,
      },
      {
        path: 'security',
        component: LoginsecurityComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
