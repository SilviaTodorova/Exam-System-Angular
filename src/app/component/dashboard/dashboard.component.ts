import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private accountService: AccountService) { }

  ngOnInit(){
    console.log(this.accountService.getUsername());
  }

}
