import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChipModule } from '../../../../../libs';
import { DashboardRoutingModule } from './dashboard.routing-module';
import { EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

const entityMetaData: EntityMetadataMap = {
  Events: {},
};

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    ChipModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    DashboardRoutingModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {
  constructor(private entityDefinitionService: EntityDefinitionService) {
    entityDefinitionService.registerMetadataMap(entityMetaData);
  }
}
