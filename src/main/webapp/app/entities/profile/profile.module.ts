import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { TagOnSharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { InformationComponent } from './profile-details/information/information.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DialogModule } from 'primeng/dialog';
import { LanguageComponent } from './profile-details/language/language.component';
import { ExperienceComponent } from './profile-details/experience/experience.component';
import { EducationComponent } from './profile-details/education/education.component';
import { DocumentComponent } from './profile-details/document/document.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BankinformationComponent } from './profile-details/bankinformation/bankinformation.component';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    InformationComponent,
    LanguageComponent,
    ExperienceComponent,
    EducationComponent,
    DocumentComponent,
    BankinformationComponent,
  ],
  imports: [
    ProfileRoutingModule,
    TagOnSharedModule,
    NgCircleProgressModule.forRoot(),
    DialogModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    NgxDropzoneModule,
    TooltipModule,
    InputNumberModule,
  ],
})
export class ProfileModule {}
