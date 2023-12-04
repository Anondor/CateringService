import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  
  constructor( private http:HttpClient, private router:Router, private apiService:ApiService,private toastr: ToastrService) {}

    ngOnInit(): void {
      this.loginForm=new FormGroup({
        'email':new FormControl(null,Validators.required),
        'password':new FormControl(null,Validators.required)
      })
    }

    logindata(loginForm:FormGroup)
    {
        this.http.get<any>("http://localhost:3000/usersData").subscribe(res=>{
        
          const user=res.find((userData:any)=>{
            return userData.email === this.loginForm.value.email && userData.password === this.loginForm.value.password
          });
          if(user)
          {
            this.toastr.success('Hello, this is a success toast!', 'Success');
          this.router.navigate(['admin'])
          } else{
            alert("email or password not match\n please try again!");
          }

        })
    }

      
    
    
  }
  




