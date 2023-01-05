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
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './ngrx-store/dashboard.effects';
import { StoreModule } from '@ngrx/store';
import { DashboardReducer } from './ngrx-store/dashboard.reducer';

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
    StoreModule.forFeature('events', DashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  exports: [DashboardComponent],
  // providers: [DashboardResolver],
})
export class DashboardModule {}
