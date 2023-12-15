import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DateRangeModel, MealCalculationModel, PaymentCalculationModel } from 'src/app/interfaces/dateRangeModel';
import { MealModel, MenuModel } from 'src/app/interfaces/menu';
import { datamodel } from 'src/app/interfaces/model';
import { OrderListModel } from 'src/app/interfaces/orderList';
import { ProgramModel } from 'src/app/interfaces/program';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  dateRangeForm: FormGroup;

  setMenu: MenuModel[];
  programData: ProgramModel[];
  userData: datamodel[];
  userOrderList: OrderListModel[];
  userPaymentCalculationData: PaymentCalculationModel[] = [];

  ngOnInit(): void {
    this.dateRangeForm = new FormGroup({
      startDay: new FormControl(null, Validators.required),
      endDay: new FormControl(null, Validators.required)
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
  getRange(dateRange: DateRangeModel) {
    this.userPaymentCalculationData = [];
    this.apiService.userOrderList().subscribe(res => {
      for (let item of res) {
        if (item.orderDate >= dateRange.startDay && item.orderDate <= dateRange.endDay) {
          this.getUserName(item);
        }
      }
    })
  }
  getUserName(user: OrderListModel) {
    var userId = user.userId;
    let todaysMealData: MealModel = {
      id: "",
      mealName: "",
      mealRate: 0,
      count: 1
    }

    for (let item of this.setMenu) {
      if (item.id == user.itemId) {
        todaysMealData.id = item.id;
        todaysMealData.mealName = item.mealName;
        todaysMealData.mealRate = parseFloat(item.defaultMealRate),
          todaysMealData.count = 1;
        break;
      }
    }
    for (let id of userId) {

      let userCostValue: PaymentCalculationModel = {
        id: "", userName: "", email: "", totalCost: 0, totalMeal: 0, teamName: "",
        meal: []
      };
      let usercostIndex = this.userPaymentCalculationData.findIndex(usercostId => usercostId.id === id)

      if (usercostIndex === -1) {
        let user = this.userData.find(user => user.id === id)
        userCostValue.id = user.id;
        userCostValue.userName = user.userName;
        userCostValue.email = user.email;
        userCostValue.teamName = user.teamName
        userCostValue.totalMeal = 1,
          userCostValue.totalCost = todaysMealData.mealRate,
          this.userPaymentCalculationData.push(userCostValue);
      }
      else {
        this.userPaymentCalculationData[usercostIndex].totalCost += todaysMealData.mealRate
        this.userPaymentCalculationData[usercostIndex].totalMeal += 1;
      }

      if (usercostIndex === -1) usercostIndex = this.userPaymentCalculationData.length - 1;
      let meal: MealCalculationModel = { id: todaysMealData.id, type: todaysMealData.mealName, cost: 0, count: 0 }
      var index = -1;
      for (var i = 0; i < this.userPaymentCalculationData[usercostIndex].meal.length; i++) {
        if (this.userPaymentCalculationData[usercostIndex].meal[i].id === user.itemId) {
          index = i;
          meal = this.userPaymentCalculationData[usercostIndex].meal[i];
          break;
        }
      }
      if (index === -1) {
        meal.cost = todaysMealData.mealRate;
        meal.count = todaysMealData.count;
        this.userPaymentCalculationData[usercostIndex].meal.push(meal);
      }
      else {
        this.userPaymentCalculationData[usercostIndex].meal[index].count += todaysMealData.count;
        this.userPaymentCalculationData[usercostIndex].meal[index].cost += todaysMealData.mealRate;
      }
    }
    console.log(this.userPaymentCalculationData);


  }

}
