import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {AddBrokerService} from '../../core/services/add-broker.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

successReg:any
failureReg:any

brokerStructure = {
  'brokerName':'',
  'productInfo':[],
  'status':'inactive'

}
 
categoryStructure:any  ={
  'name':'',
  'fields':[
]
}




project:any =[]

@Input() categories:any =[]

@Input() brokerName:any

fields:any =[]

selectedType:any

showDateCondition:any

currentIndex:any

specificDate:any

brokers:any =[]
spin  = false

  constructor(private __addBroker:AddBrokerService,private router:Router) { }

  ngOnInit(): void {



  }


  editProjectName(event:any){
   this.brokerStructure.brokerName = event.target.value

  }


 

  deleteField(index:any){
    let ind = index
    

    this.categories.splice(ind,1)
    this.fields.splice(ind,1)
  }

  addField(){

    let fieldStructure ={
      'id':0,
     'name':'',
     'type':'',
     'options':[],
    
   }

    let id:any

    if(this.categories.length ==0){
      id =0
    }

    else{
      id = this.categories[this.categories.length -1].id+1

    }

    fieldStructure.id =id

    this.categories.push(fieldStructure)
    this.fields.push(fieldStructure)

    
  }


 

  editField(name:any ,id:any,event:any){

    for (var e of this.categories){

      if(e.id ==id){
        e.name = event.target.value
      }
    }

  }

  

  getFieldType(event:MatSelectChange,id:any){
    for (var e of this.categories){

      if(e.id ==id){
        e.type = event.value
      }
    }

 
    
   
  }


  addOption(id:any,event:any){
   
    let optionStructure = {
      'id':0,
      'name':'',
      'conditions':[]
    }

    
    for (var e of this.categories){
      if(e.id ==id){
        let __id:any

       if(e.options.length ==0){
       __id =0
      }

     else{
       __id = e.options[e.options.length -1].id+1 
     }

    optionStructure.id =__id


    e.options.push(optionStructure)
      }
    }

  }

  setConditionName(innerID:any ,outerID:any,event:any){

    for(var e of this.categories){
      if(e.id == outerID){
        for (var i of e.options){
          if(i.id == innerID){
            i.name = event.target.value
          }
        }
      }
    }
  }

 addCondition(innerID:any ,outerID:any,event:any){
  
    for(var e of this.categories){
      if(e.id ==outerID){
       for (var i of e.options){
        if(i.id ==innerID){
          let value = {
            'name':''
          }

          i.conditions.push(value)
        }
       }

      }
    }
  }

  filterCategoriesByID(innerID:any ,outerID:any){

   
    let arraY:any
    for (var t of this.categories){
      if(t.id ==outerID){
       for (var y of t.options){
        if(y.id ==innerID)
         arraY =y.conditions
       }
      }
    }
    return arraY
  
  }


  deleteOption(innerID:any,outerID:any){

    for(var e of this.categories){
      if(e.id ==outerID){
        for (var i of e.options){
          if (i.id ==innerID){
             let ind = e.options.indexOf(i)
             e.options.splice(ind,1)
          }
        }
      }
    }

  }


deleteCondition(ind:any,innerID:any,outerID:any ){
   this.filterCategoriesByID(innerID,outerID).splice(ind,1)
}



selectedConditionType(ind:any,name:any,innerID:any,outerID:any){
  let type:any
  let value:any
  for(var field of this.categories){
    if(field.name ==name){

      type = field.type

      if(type =='Date'){

        this.showDateCondition = "specificDate"
        this.filterCategoriesByID(innerID,outerID)[ind].value ={'specificDate':''}

      
      }
      this.filterCategoriesByID(innerID,outerID)[ind].name =name


     

    }

    
  }

  this.filterCategoriesByID(innerID,outerID)[ind].type =type
  
  let __id:any
  if(this.filterCategoriesByID(innerID,outerID).length ==0){
    __id =0
  }

  else{
    __id = this.filterCategoriesByID(innerID,outerID)[this.filterCategoriesByID(innerID,outerID).length -1].id+1

  }
  this.filterCategoriesByID(innerID,outerID)[ind].id =__id
  
 
}


selectDateFieldCondition(event:any,ind:any,name:any,innerID:any,outerID:any){


  this.showDateCondition =event.target.value


  if(this.showDateCondition =='specificDate')
 

  {
    this.filterCategoriesByID(innerID,outerID)[ind].valueType ="specificDate"
    this.filterCategoriesByID(innerID,outerID)[ind].value ={'specificDate':''}

  }

  if(this.showDateCondition =='numericBoundaries')
 

  {
    this.filterCategoriesByID(innerID,outerID)[ind].valueType ="numericBoundaries"
    this.filterCategoriesByID(innerID,outerID)[ind].value ={'MinimumNumber':'','MaximumNumber':''}
  }

  if(this.showDateCondition =='dateBoundaries')
 

  {
    this.filterCategoriesByID(innerID,outerID)[ind].valueType ="dateBoundaries"
    this.filterCategoriesByID(innerID,outerID)[ind].value ={'MinimumDate':'','MaximumDate':''}
  }

  }

  

  addBroker(){
   this.spin = true
   let data = this.brokerStructure

   data.productInfo = this.categories

   this.__addBroker.addBroker(data).subscribe(res=>{
    if(res.response =='success'){
      this.successReg =true
      this.failureReg =false
      this.spin =false
    }

    if(res.response =="Server failed"){
     this.failureReg =true
     this.successReg =false
     this.spin =false

    }
  
  })
   
  }

  //Return  broker array necessary for editing functionality 

  returnBrokerArray(id:any){
    let brokerArray:any
    for( var i of this.categories){
      if(i.id ==id){
       brokerArray =i
      }
      
    }
   return brokerArray 
  }

  returnBrokerOptions(innerID:any, outerID:any){
    let optionArray:any
    for( var i of this.categories){
      if(i.id ==outerID){

        for (var y of  i.options){
          if (y.id ==innerID){
            optionArray =y
          }
        }

        return optionArray
       
      }
    }

  }



}


