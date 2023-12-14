import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { OrderManageModel } from 'src/app/interfaces/OrderManage';
import { MenuModel } from 'src/app/interfaces/menu';
import { datamodel } from 'src/app/interfaces/model';
import { OrderListModel } from 'src/app/interfaces/orderList';
import { ProgramModel } from 'src/app/interfaces/program';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  setMenu: MenuModel[];
  programData: ProgramModel[];
  userData: datamodel[];
  userOrderList: OrderListModel[];
  orderConfirmList: OrderManageModel[] = [];

  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
    this.getMenuData();
    this.getProgram();
    this.getUser();
  }

  ngOnInit(): void {

    this.getuserOrderList();

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
 

  getuserOrderList() {

    this.apiService.userOrderList().subscribe(res => {
      this.userOrderList = res;

      for (let item of this.userOrderList) {
       
        let mealName = "";
        let programName = "";

        for (let menu of this.setMenu) {
          if (item.itemId === menu.id) {

            mealName = menu.mealName;
            break


          }
        }


        for (let program of this.programData) {
          if (item.programId === program.id) {
            programName = program.programName;
            break
          }
        }

        for (let i = 0; i < item.userId.length; i++) {
          let orderConfirm: OrderManageModel = { email: "", id: "", mealName: "", programName: "", userId: "", userName: "" };
          for (let user of this.userData) {
            if (user.id == item.userId[i]) {
              orderConfirm.id=uuidv4();
              orderConfirm.userName = user.userName;
              orderConfirm.userId = user.id;
              orderConfirm.email = user.email;
              orderConfirm.mealName = mealName;
              orderConfirm.programName = programName;
              this.orderConfirmList.push(orderConfirm);
              break
            }
          }
        }
      }
    })
  }
  deleteUser(index:number,data:OrderManageModel)
  {
    this.orderConfirmList.splice(index,1);

  }
  addNewRow()
  {
    let orderConfirm: OrderManageModel = { email: "", id: "", mealName: "", programName: "", userId: "", userName: "" };
    this.orderConfirmList.push(orderConfirm);

  }



}
