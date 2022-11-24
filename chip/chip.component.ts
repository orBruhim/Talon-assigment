import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'talon-assigment-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class ChipComponent implements OnInit {
  @Input() filterValue: string = '';

  constructor() {}

  ngOnInit(): void {}
}
