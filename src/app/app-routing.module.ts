import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { VendorComponent } from './vendor/vendor.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { UpdateUserTeamComponent } from './admin/team/update-user-team/update-user-team.component';
import { TeamRegistrationComponent } from './admin/team/team-registration/team-registration.component';
import { ViewTeamComponent } from './admin/team/view-team/view-team.component';
import { UpdateTeamComponent } from './admin/team/update-team/update-team.component';
import { SetProgramComponent } from './admin/program/set-program/set-program.component';
import { SetMealComponent } from './admin/program/set-meal/set-meal.component';
import { OrderManagementComponent } from './admin/order/order-management/order-management.component';
import { ViewOrderComponent } from './admin/order/view-order/view-order.component';
import { CalendarViewComponent } from './admin/calendar/calendar-view/calendar-view.component';
import { PaymentComponent } from './admin/payment/payment.component';
import { PaidAmountCalculationComponent } from './admin/payment/paid-amount-calculation/paid-amount-calculation.component';
import { AddMealComponent } from './admin/program/add-meal/add-meal.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'user',component:UserComponent},
  {path:'admin',component:AdminComponent},
  {path:'vendor',component:VendorComponent},
  {path:'signup',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'updateUserTeam/:id',component:UpdateUserTeamComponent},
  {path:'teamRegistration',component:TeamRegistrationComponent},
  {path:'viewTeam',component:ViewTeamComponent},
  {path:'updateTeam/:id',component:UpdateTeamComponent},
  {path:'setProgram',component:SetProgramComponent},
  {path:'setMeal',component:SetMealComponent},
  {path:'order-management',component:OrderManagementComponent},
  {path:'view-order-list',component:ViewOrderComponent},
  {path:'view-calendar',component:CalendarViewComponent},
  {path:'payment',component:PaymentComponent},
  {path:'paid-amount-calculation/:id', component:PaidAmountCalculationComponent},
  {path:'add-new-meal',component:AddMealComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
