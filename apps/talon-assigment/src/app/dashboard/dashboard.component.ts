import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TalonEvent } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs';
import { DashboardQuery } from './store/dashboard.query';
import { DashboardFacade } from './store/dashboard.facade';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';
import { EventsEntityService } from './ngrx-store/events-entity-service';
import { EventsDataService } from './ngrx-store/events-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'talon-assigment-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ['Event Type', 'severity', 'User', 'Date'];

  dataSource!: MatTableDataSource<TalonEvent>;

  eventsValuesControls = new FormControl([]);

  eventsValues: string[] = [];

  dataSource$ = this.activatedRoute.data.pipe(
    map((data) => {
      return data?.['Event'];
    })
  );
  isLoading$ = this.dashboardQuery.selectedIsLoading$;

  constructor(
    private dashboardFacade: DashboardFacade,
    private dashboardQuery: DashboardQuery,
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private eventsEntityService: EventsEntityService,
    private eventDataService: EventsDataService
  ) {}

  ngOnInit(): void {
    // this.dashboardFacade.updateIsLoading();
    //
    // this.dashboardFacade.loadEventData().subscribe();
    // .subscribe((data) => console.log(data));
  }

  applyFilter() {
    this.updateTableData();
  }

  onFilterCancelled(event: Event, type: string) {
    event.stopPropagation();

    const value = this.eventsValuesControls?.value?.filter(
      (item) => item !== type
    );
    if (!value) {
      return;
    }
    this.eventsValuesControls.setValue(value);

    this.updateTableData();
  }

  private updateTableData(): void {
    let filterData = new HttpParams();
    this.eventsValuesControls?.value?.forEach((item) => {
      filterData = filterData.append('eventType', item);
    });

    this.appService
      .getFilteredEventData(filterData)
      .pipe(
        tap((filteredData: TalonEvent[]) => {
          this.dashboardFacade.updateFilteredData(filteredData);
        })
      )
      .subscribe();

    this.resetPaginator();
  }

  private resetPaginator(): void {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
