import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

import { HitsRoutingModule } from './hits-routing.module';
import { HitsComponent } from 'app/entities/hits/hits.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [HitsComponent],
  imports: [
    CommonModule,
    HitsRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    FileUploadModule,
    DropdownModule,
  ],
})
export class HitsModule {}
