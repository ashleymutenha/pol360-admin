import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projectStructure:any ={'projectName':'',
  'categories':[{
    'name':'',
    'fields':[
      
  ]}
],
  

}

categoryStructure:any  ={
  'name':'',
  'fields':[
]
}

fieldStructure:any ={
  
  'type':'',
  'option':[],
  'conditions':{
    'maximumAge':0,
    'minimumAge':0,
    'ageRange':''
  }
}

project:any =[]

categories:any =[]

fields:any =[]

index:any

  constructor() { }

  ngOnInit(): void {


    this.project.push(this.projectStructure)
    this.categories.push(this.categoryStructure)

  }


  editProjectName(event:any){
   for (var i in this.project){

   }

   console.log(event.target.value)
  }


  addCategory(){
    
   this.categories.push(this.categoryStructure)
    
  }

  deleteField(index:any){
    let ind = index
    

    this.categories[ind].fields.splice(ind,1)
  }

  addField(index:any){

    let ind = index
    // this.fields.push(this.fieldStructure)

    this.categories[ind].fields.push(this.fieldStructure)
    
  }


  

}

