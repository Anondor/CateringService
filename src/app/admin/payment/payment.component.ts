import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DateRangeModel, PaymentCalculationModel } from 'src/app/interfaces/dateRangeModel';
import { MenuModel } from 'src/app/interfaces/menu';
import { datamodel } from 'src/app/interfaces/model';
import { OrderListModel } from 'src/app/interfaces/orderList';
import { ProgramModel } from 'src/app/interfaces/program';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  dateRangeForm:FormGroup;

  setMenu: MenuModel[];
  programData: ProgramModel[];
  userData: datamodel[];
  userOrderList: OrderListModel[];
  userPaymentCalculationData: PaymentCalculationModel[] = [];

  ngOnInit(): void {
    this.dateRangeForm=new FormGroup({
      startDay:new FormControl(null,Validators.required),
      endDay:new FormControl(null,Validators.required)
    });
   
  }
  
  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
    this.getMenuData();
    this.getProgram();
    this.getUser();

  }
  getProgram() {
    this.apiService.getProgramData().subscribe(res => {
      this.programData = res;
    })
  }
  getMenuData() {
    this.apiService.getMenu().subscribe(res => {
      this.setMenu = res;
    })
  }
  getUser() {
    this.apiService.getUserData().subscribe(res => {
      this.userData = res;
    })
  }


  getRange(dateRange:DateRangeModel)
  {
   
     this.apiService.userOrderList().subscribe(res=>{

      for(let item of res)
      {
        if(item.orderDate>=dateRange.startDay&&item.orderDate<=dateRange.endDay)
        {
      
          this.getUserName(item.userId);
        }
      }

     })

  }

  getUserName(userId:string)
  {
    for(let id of userId)
    {

     let userCostValue:PaymentCalculationModel={
       id: "", userName: "", email: "", 
       meal: []
     };
        let usercostId=this.userPaymentCalculationData.findIndex(usercostId=>usercostId.id===id)
          if(usercostId===-1)
          {
            let user=this.userData.find(user=>user.id===id)

              userCostValue.id=user.id;
              userCostValue.userName=user.userName;
              userCostValue.email=user.email;
             this.userPaymentCalculationData.push(userCostValue);
          }
          
           usercostId=this.userPaymentCalculationData.length-1;
          console.log(usercostId);

          debugger

        

        
   
    }

  }

}
