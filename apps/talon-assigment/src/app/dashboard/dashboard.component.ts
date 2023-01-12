import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TalonEvent } from '../app.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Store } from '@ngrx/store';
import { EventsEntityService } from './ngrx-store/events-entity.service';

@Component({
  selector: 'talon-assigment-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ['Event Type', 'severity', 'User', 'Date'];

  dataSource!: MatTableDataSource<TalonEvent>;

  eventsValuesControls = new FormControl([]);

  eventsValues: string[] = [];

  dataSource$ = this.eventsEntitiesService.entities$.subscribe((data) =>
    console.log(data)
  );

  constructor(
    private appService: AppService,
    private store: Store,
    private eventsEntitiesService: EventsEntityService
  ) {}
  applyFilter() {
    // this.updateTableData();
  }

  // onFilterCancelled(event: Event, type: string) {
  //   event.stopPropagation();
  //
  //   const value = this.eventsValuesControls?.value?.filter(
  //     (item) => item !== type
  //   );
  //   if (!value) {
  //     return;
  //   }
  //   this.eventsValuesControls.setValue(value);
  //
  //   this.updateTableData();
  // }

  // private updateTableData(): void {
  //   let filterData = new HttpParams();
  //   this.eventsValuesControls?.value?.forEach((item) => {
  //     filterData = filterData.append('eventType', item);
  //   });
  //
  //   this.appService
  //     .getFilteredEventData(filterData)
  //     .pipe(
  //       tap((filteredData: TalonEvent[]) => {
  //         this.store.dispatch(allEventsHasBeenLoaded({ events: filteredData }));
  //       })
  //     )
  //     .subscribe();
  //
  //   this.resetPaginator();
  // }

  private resetPaginator(): void {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
