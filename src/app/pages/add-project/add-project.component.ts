import { Component, OnInit,ViewChild,ElementRef,Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import {AddBrokerService} from '../../core/services/add-broker.service';
import { Router } from '@angular/router';
import { EditBrokerService } from 'src/app/core/services/edit-broker.service';
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

@Input() editStatus:any

fields:any =[]

selectedType:any

showDateCondition:any

currentIndex:any

specificDate:any

@Input() brokers:any =[]
spin  = false
duplicateName=false
incompleteFields:any

  constructor(private __addBroker:AddBrokerService,private router:Router,private __editBroker:EditBrokerService) { }

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

  addField(currentMaxID:any){

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
      let ids:any =[]
      for(var t of this.categories){
        ids.push(t.id)
      }
      let setID = Math.max(...ids)+1
      id = setID

    }

    fieldStructure.id =id
    
    if(currentMaxID =='None'){
    this.categories.push(fieldStructure)
    
    }

    else{
      let ind:any
     

      for(var i of this.categories){
        if(i.id ==currentMaxID){
          ind = this.categories.indexOf(i)
        }
      }
      this.categories.splice(ind+1,0,fieldStructure)
    }
    
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

 //applies to when field type is dropdown
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
      let __ids:any =[]
      for(var t of e.options){
        __ids.push(t.id)
      }
      let setID = Math.max(...__ids)+1
      __id = setID
     }

    optionStructure.id =__id


    e.options.push(optionStructure)
      }
    }

  }

  //applies when field type is dropdown and a condition is added for an option
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

  //applies when field type is dropdown and a condition is added for an option

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

  //returns a slice of conditions array for a given option

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
        this.filterCategoriesByID(innerID,outerID)[ind].valueType ='specificDate'

      
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
   
   let data = this.brokerStructure

   if(data.brokerName.length==0){
    if(this.brokerName.length!=0){
      data.brokerName =this.brokerName
    }
   }

   data.productInfo = this.categories

   console.log("Data>>>", data)

   if(this.checkIfFieldsAreCompleted(data) ==0){
    this.incompleteFields =true
    this.successReg =false
    this.failureReg =false
    this.duplicateName =false
   }

   else{
    this.incompleteFields =false
    this.successReg =false
    this.failureReg =false
    this.duplicateName =false

    if(this.editStatus ==false){
      let count =0
    for(var i of this.brokers){
      if (i.brokerName ==data.brokerName){
        count+=1
      }
    }
    console.log("NNN",count)
    if(count>0){
    this.duplicateName =true
    }
    else{
      this.callAddBrokerApi(data)
      this.duplicateName =false
    }
      
    }
    else{
      this.spin =true
      this.__editBroker.editBroker(data).subscribe(res=>{
         console.log("edit Response", res)
        if(res.response =='success'){
          this.spin =false
          this.successReg =true
        }

      })
    }
    
   
   
   
  }
}

  callAddBrokerApi(data:any){
    this.incompleteFields =false
    this.spin = true
    this.__addBroker.addBroker(data).subscribe(res=>{
      if(res.response =='success'){
        this.successReg =true
        this.failureReg =false
        this.spin =false
        this.incompleteFields =false
        this.duplicateName =false
      }
  
      if(res.response =="Server failed"){
       this.failureReg =true
       this.successReg =false
       this.spin =false
       this.incompleteFields =false
       this.duplicateName =false
  
  
      }})
    
  
  

  }

//validates to check whether all relevant fields are filled up before calling api
  checkIfFieldsAreCompleted(data:any){
    let returnedNumber =1
    
    if(data.brokerName.length ==0){
      returnedNumber = 0
    }

    for(var i of data.productInfo){
      if(i.name.length ==0 ||i.type.length ==0){
        returnedNumber =0
      }
      if(i.type =='Dropdown'){
        if(i.options.length ==0)
        {
          returnedNumber =0
        }
        if(i.options.length!=0){
          for(var condition of i.options){
            if(condition.name.length ==0){
              returnedNumber =0
            }

            if(condition.conditions.length !=0){
              for(var cond of condition.conditions){
                if(cond.name.length ==0){
                  returnedNumber =0
                }
                if(cond.type =='Date')
                {
                  if(cond.valueType =='specificDate'){
                    if (cond.value.specificDate.length ==0){
                      returnedNumber =0
                    }
                  }
                  if(cond.valueType =='numericBoundaries'){
                    if (cond.value.MaximumNumber.length ==0){
                      returnedNumber =0
                    }
                  }

                  if(cond.valueType =='dateBoundaries'){
                    if (cond.value.MaximumDate.length ==0){
                      returnedNumber =0
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return returnedNumber
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


