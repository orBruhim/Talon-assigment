import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TalonEvent } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { DashboardQuery } from './store/dashboard.query';
import { DashboardFacade } from './store/dashboard.facade';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'talon-assigment-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ['Event Type', 'severity', 'User', 'Date'];

  dataSource!: MatTableDataSource<TalonEvent>;

  filteredValue = new FormControl('');

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
    private dashboardQuery: DashboardQuery
  ) {}

  ngOnInit(): void {
    this.dashboardFacade.loadEventData().subscribe();
  }

  applyFilter(event: string) {
    this.dataSource!.filter = event.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }
}
