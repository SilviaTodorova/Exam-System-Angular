import { Component, AfterViewInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;

  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {}
}
