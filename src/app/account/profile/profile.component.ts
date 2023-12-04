import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  constructor(private router:Router,private apiService:ApiService) {}
  get isLogin(){
    return this.apiService.isLogin;
  }
  get userName(){
    return this.apiService.userName;
  }
  get email(){
    return this.apiService.email;
  }
  get phone()
  {
    return this.apiService.phone;
  }
  /*
  get teamName()
  {
    console.log(this.apiService.teamName);
    return this.apiService.teamName;
  }
  get designation()
  {
    console.log(this.apiService.designation);
    return this.apiService.designation;
  }
  get teamLeadName()
  {
    console.log(this.apiService.teamLeadName);
    return this.apiService.teamLeadName;
  }
  */
  ResetLogin()
  {
    this.apiService.isLogin=false;
    this.router.navigate(['login'])
  }
  addTeam()
  {
      this.router.navigate(['teamDetails'])
  }
}
