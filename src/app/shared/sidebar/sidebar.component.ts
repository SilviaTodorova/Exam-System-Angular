import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public sidebarnavItems: any[];

  constructor(
    private router: Router
  ) {}

  addExpandClass(sidebarnavItem: any) {
    if(sidebarnavItem.class === ''){
      if(sidebarnavItem.title == 'Изход'){
        localStorage.removeItem("username");
      }

      this.router.navigate([sidebarnavItem.path]);
    }
  }



  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
