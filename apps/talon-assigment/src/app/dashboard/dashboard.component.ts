import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { MatTableDataSource } from '@angular/material/table';
import { TalonEvent } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { DashboardQuery } from './store/dashboard.query';

@Component({
  selector: 'talon-assigment-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['Event Type', 'severity', 'User', 'Date'];

  // dataSource$ = this.dashboardQuery.selectedEventData$;

  dataSource!: MatTableDataSource<TalonEvent>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(
    private appService: AppService,
    private dashboardQuery: DashboardQuery
  ) {}

  ngAfterViewInit(): void {
    this.appService
      .getEventData()
      .pipe(
        tap((eventData: TalonEvent[]) => {
          eventData.sort((currEvent, nextEvent) => {
            if (currEvent.time > nextEvent.time) {
              return 1;
            }

            if (currEvent.time < nextEvent.time) {
              return -1;
            }

            return 0;
          });

          this.dataSource = new MatTableDataSource(eventData);

          this.dataSource!.paginator = this.paginator;

          this.dataSource!.sort = this.sort;
        })
      )
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }
}
