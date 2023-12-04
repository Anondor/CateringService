import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { VendorComponent } from './vendor/vendor.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './account/profile/profile.component';
import { SideNavbarComponent } from './home/navbar/side-navbar/side-navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateUserTeamComponent } from './admin/team/update-user-team/update-user-team.component';
import { TeamRegistrationComponent } from './admin/team/team-registration/team-registration.component';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewTeamComponent } from './admin/team/view-team/view-team.component';
import { UpdateTeamComponent } from './admin/team/update-team/update-team.component';
import { SetProgramComponent } from './admin/program/set-program/set-program.component';
import { SetMealComponent } from './admin/program/set-meal/set-meal.component';
import { OrderManagementComponent } from './admin/order/order-management/order-management.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    VendorComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent, 
    RegisterComponent, 
    LoginComponent, 
    ProfileComponent, 
    
    SideNavbarComponent, UpdateUserTeamComponent, TeamRegistrationComponent, ViewTeamComponent, UpdateTeamComponent, SetProgramComponent, SetMealComponent, OrderManagementComponent 
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule ,
    MatFormFieldModule, 
    ToastrModule.forRoot(),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
