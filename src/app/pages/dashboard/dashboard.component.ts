import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  projects = [{'name':'EMT'},{'name':'ZESA'},{'name':'JMB'}]

  constructor() { }

  ngOnInit(): void {
  }

}
