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
      orderDate:new FormControl()
    });


  

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
    const TODAY_STR = new Date().toISOString();

    this.orderDataForm.value.id = uuidv4();
    this.orderDataForm.value.programId = this.programId;
    this.orderDataForm.value.itemId = itemId;
    this.orderDataForm.value.orderDate=TODAY_STR.slice(0,10);
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
      this.router.navigate(['view-order-list']);
      // this.changeRouteToOrderView();
    }))
  }

  changeRouteToOrderView()
  {
    this.router.navigate(['view-order-list']);
  }









}

