import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TalonEvent } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { DashboardQuery } from './store/dashboard.query';
import { DashboardFacade } from './store/dashboard.facade';

@Component({
  selector: 'talon-assigment-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Event Type', 'severity', 'User', 'Date'];

  dataSource!: MatTableDataSource<TalonEvent>;

  dataSource$ = this.dashboardQuery.selectedEventData$.pipe(
    tap((eventData: TalonEvent[]) => {
      console.log(eventData);
      this.dataSource = new MatTableDataSource(eventData);

      this.dataSource!.paginator = this.paginator;

      this.dataSource!.sort = this.sort;
    })
  );

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private dashboardFacade: DashboardFacade,
    private dashboardQuery: DashboardQuery
  ) {}

  ngOnInit(): void {
    this.dashboardFacade.loadEventsData().subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }
}
