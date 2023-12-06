import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { OrderManageModel } from 'src/app/interfaces/OrderManage';
import { MenuModel } from 'src/app/interfaces/menu';
import { datamodel } from 'src/app/interfaces/model';
import { OrderListModel } from 'src/app/interfaces/orderList';
import { ProgramModel } from 'src/app/interfaces/program';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  programId = 'default value';
  orderDataForm: FormGroup;
  menuName: string;

  keyup(value) {
    this.programId = value;
  }

  setMenu: MenuModel[];
  programData: ProgramModel[];
  userData: datamodel[];

  userOrderList: OrderListModel[];

 
  orderConfirmList: OrderManageModel[] = [];
  tableId: number = 1;



  constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) {
    this.getMenuData();
    this.getProgram();
    this.getUser();

  }

  ngOnInit(): void {

    this.orderDataForm = new FormGroup({
      id: new FormControl(),
      programId: new FormControl(),
      itemId: new FormControl(),
      userId: new FormArray([]),
    });


    this.getuserOrderList();

  }
  /////////////////////////Start/////////////////////////////////
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
  selectedItem(itemId: string) {
    this.orderDataForm.value.id = uuidv4();
    this.orderDataForm.value.programId = this.programId;
    this.orderDataForm.value.itemId = itemId;
  }
  onChangeOption(option: any, event: any) {
    if (option.id != null) {
      if (event.target.checked) {
        this.orderDataForm.value.userId.push(option.id);
      }
      else {
        const index = this.orderDataForm.value.controls.findIndex(x => x.value === option.id);
        this.orderDataForm.value.removeAt(index);
      }
    }

  }
  onSubmit() {
    this.apiService.addOrderDetails(this.orderDataForm.value).subscribe((res => {
      this.orderDataForm.reset();
      this.router.navigate(['profile']);
    }))
  }


  /////////////////////////////////////End////////////////////////////////

  getuserOrderList() {

    this.apiService.userOrderList().subscribe(res => {
      this.userOrderList = res;

      for (let item of this.userOrderList) {
       
        let mealName = "";
        let programName = "";
        //debugger

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
            //debugger
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

      console.log(this.orderConfirmList)

    })



  }






}

