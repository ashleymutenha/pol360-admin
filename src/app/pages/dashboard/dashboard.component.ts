import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  projects = [{'name':'EMT'},{'name':'ZESA'},{'name':'JMB'}]

  showAdd = false
  showDashboard = true

  constructor() { }

  ngOnInit(): void {


    
  }

  addProject(){
    this.showDashboard =false
    this.showAdd =true
  }

  closeAddProject(){
    this.showDashboard =true
    this.showAdd =false
  }

}
