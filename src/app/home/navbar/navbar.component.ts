import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{

  
  constructor(private router:Router,private apiService:ApiService) {}

  get isLogin(){
    return this.apiService.isLogin;
  }

  get userName(){
    return this.apiService.userName;
  }
  ResetLogin()
  {
    this.apiService.isLogin=false;
    this.router.navigate(['login'])
  }

  ngOnInit(): void {  

   
  }

  

}
