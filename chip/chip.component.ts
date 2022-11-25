import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'talon-assigment-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent implements OnInit {
  @Input() filterValue: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.filterValue);
  }

  cancelFilter() {
    console.log(this.filterValue);
  }
}
