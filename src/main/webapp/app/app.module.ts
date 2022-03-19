import { ProfileModule } from './entities/profile/profile.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import './vendor';
import { TagOnSharedModule } from 'app/shared/shared.module';
import { TagOnCoreModule } from 'app/core/core.module';
import { TagOnAppRoutingModule } from './app-routing.module';
import { TagOnHomeModule } from './home/home.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { ProjectModule } from 'app/entities/project/project.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoginsecurityComponent } from 'app/entities/profile/profile-details/loginsecurity/loginsecurity.component';
import { DemographicComponent } from 'app/entities/profile/profile-details/demographic/demographic.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HitsModule } from 'app/entities/hits/hits.module';
import { DealsComponent } from 'app/entities/profile/profile-details/deals/deals.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { HighchartsChartModule } from 'highcharts-angular';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  imports: [
    BrowserModule,
    TagOnSharedModule,
    TagOnCoreModule,
    TagOnHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TagOnAppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    NgCircleProgressModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    ProjectModule,
    RadioButtonModule,
    ProfileModule,
    DropdownModule,
    HitsModule,
    TableModule,
    ToastModule,
    MessageModule,
    HighchartsChartModule,
    AccordionModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    LoginsecurityComponent,
    DemographicComponent,
    DealsComponent,
    BreadcrumbComponent,
  ],
  bootstrap: [MainComponent],
  exports: [ActiveMenuDirective],
})
export class TagOnAppModule {}
