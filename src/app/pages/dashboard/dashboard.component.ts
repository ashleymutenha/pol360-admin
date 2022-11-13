import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GetBrokerService } from 'src/app/core/services/get-broker.service';
import { DeleteBrokerService } from 'src/app/core/services/delete-broker.service';
import { SetasDefaultService } from 'src/app/core/services/setas-default.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  // projects = [{'name':'EMT'},{'name':'ZESA'},{'name':'JMB'}]

  showAdd = false
  showDashboard = true
  brokers:any =[]
  showEdit = false
  brokerTobeEdited:any
  spin =true
  spin2 =true
  brokerName:any

  activeBroker =''
  editStatus:any

  constructor(private __getBrokers:GetBrokerService, private __deleteBroker:DeleteBrokerService,private _setAsDefault:SetasDefaultService) { }

  ngOnInit(): void {


    this.getBrokers()
  }

  addProject(){
    this.showDashboard =false
    this.showAdd =true
    this.showEdit = false
    this.editStatus =false
  }

  closeAddProject(){
    this.showDashboard =true
    this.showAdd =false
    this.showEdit =false
    this.spin =true
    this.getBrokers()
  }

 

  getBrokers(){
    this.brokers =[]
    this.__getBrokers.getBrokers().subscribe(res=>{
     if(res.response =='success'){

     this.__getBrokers.brokers =res.data
      for (var i of res.data){
        if(i.status =='active'){
          this.activeBroker =i.brokerName
        }
        this.brokers.push(i)
      }
      this.spin =false
      this.spin2 =false
    }
    })
    
    
  }

  deleteBroker(name:any){
  this.spin =true
  this.spin2 =true
  this.activeBroker =""
   let data = {'brokerName':name

    }
   this.__deleteBroker.deleteBrokerService(data).subscribe(res=>{
   if(res.response =='success'){
    this.getBrokers()
   }
   })
  }

  editBroker(brokerValue:any){
   
    this.brokerTobeEdited = brokerValue.productInfo
    this.brokerName = brokerValue.brokerName


    this.showAdd = false
    this.showDashboard =false
    this.showEdit = true
    this.editStatus =true

  }

  closeEditBroker(){
    this.showAdd = false
    this.showDashboard =true
    this.showEdit = false
    this.spin = true
    this.spin2 =true
    this.getBrokers()
  }

  setBrokerAsDefault(name:any){
   let data ={
    'brokerName':name
   }

   this._setAsDefault.setAsDefault(data).subscribe(res=>{
      if(res.response =='success'){
        this.getBrokers()
      }
   })

  }

  // brokerNameOccurence(brokers:any,name:any){
  //   let returnedNumber =1
  //   let count =0

  //   for( var e of brokers){
  //     if(e.brokerName ==name){
  //       count+=1
  //     }
  //   }
  //   if(count>0){
  //     returnedNumber =0
  //   }
  //  return returnedNumber
  // }

}

