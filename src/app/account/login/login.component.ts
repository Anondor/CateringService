import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup|any;
  
  constructor( private http:HttpClient, private router:Router, private apiService:ApiService) {}

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      'email':new FormControl(),
      'password':new FormControl()
    })
  }

  logindata(loginForm:FormGroup)
  {
      this.http.get<any>("http://localhost:3000/usersdata").subscribe(res=>{
        const user=res.find((a:any)=>{
          return a.email===this.loginForm.value.email && a.password=== this.loginForm.value.password
        });

        if(user)
        {
          alert("you are successfully login");
          this.loginForm.reset();
          this.apiService.isLogin=true;  
          this.apiService.userName=user.userName;   
          this.apiService.email=user.email;
          this.apiService.id=user.id;
          this.apiService.phone=user.phone;  
          this.router.navigate(['profile'])
        } else{
          alert("user not Found");
          this.router.navigate(['login'])
        }

      },err=>{
        alert("something was wrong")
      }
      )
  }

    
    
    
  }
  




