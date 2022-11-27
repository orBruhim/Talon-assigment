import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TalonEvent } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { DashboardQuery } from './store/dashboard.query';
import { DashboardFacade } from './store/dashboard.facade';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { HttpParams } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'talon-assigment-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  @ViewChild(MatSelect) select: MatSelect | null = null;

  displayedColumns: string[] = ['Event Type', 'severity', 'User', 'Date'];

  dataSource!: MatTableDataSource<TalonEvent>;

  eventsValuesControls = new FormControl([]);

  eventsValues: string[] = [];

  dataSource$ = this.dashboardQuery.selectedEventData$.pipe(
    tap((eventData: TalonEvent[]) => {
      this.dataSource = new MatTableDataSource(eventData);

      this.dataSource!.paginator = this.paginator;

      this.dataSource!.sort = this.sort;

      eventData.map((event) => {
        if (this.eventsValues.includes(event.eventType)) {
          return;
        }
        this.eventsValues.push(event.eventType);
      });
    })
  );

  constructor(
    private dashboardFacade: DashboardFacade,
    private dashboardQuery: DashboardQuery,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.dashboardFacade.loadEventData().subscribe();
  }

  applyFilter() {
    let filterData = new HttpParams();

    this.eventsValuesControls?.value?.forEach((item) => {
      filterData = filterData.append('eventType', item);
    });
    this.updateTableData(filterData);

    this.resetPaginator();
  }

  //:TODO :1. filteredValues only delete selected filter

  onFilterCancelled(event: any, type: string) {
    event.stopPropagation();

    let filterData = new HttpParams();

    this.eventsValuesControls?.value?.forEach((item) => {
      if (item! == type) {
        filterData = filterData.append('eventType', item);
      }
    });
    console.log(filterData);

    filterData = filterData.delete('eventType', type);

    console.log(filterData);

    this.updateTableData(filterData);

    // this.dataSource.filter = '';

    this.eventsValuesControls?.value?.filter((item) => item[0] === type);

    this.resetPaginator();
  }

  private updateTableData(params: HttpParams): void {
    this.appService
      .getFilteredEventData(params)
      .pipe(
        tap((filteredData: TalonEvent[]) => {
          this.dashboardFacade.updateFilteredData(filteredData);
        })
      )
      .subscribe();
  }

  private resetPaginator(): void {
    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }
}
