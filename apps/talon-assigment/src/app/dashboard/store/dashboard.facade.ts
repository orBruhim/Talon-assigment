import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  constructor(private appService: AppService) {}
}
