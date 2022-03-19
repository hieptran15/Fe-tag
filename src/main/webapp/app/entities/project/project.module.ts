import { NgModule } from '@angular/core';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { PaginatorModule } from 'primeng/paginator';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TagOnSharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [ProjectComponent],
  imports: [
    ProjectRoutingModule,
    PaginatorModule,
    HighchartsChartModule,
    MultiSelectModule,
    NgCircleProgressModule.forRoot(),
    TranslateModule,
    CommonModule,
    TagOnSharedModule,
  ],
})
export class ProjectModule {}
