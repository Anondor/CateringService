import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { datamodel } from 'src/app/interfaces/model';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

 signupForm:FormGroup;
 generatedGuid: string;
  constructor(private router:Router,private apiService:ApiService){ 
   
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'id':new FormControl(),
      'userName':new FormControl(null,Validators.required),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phone':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,Validators.required),
      'confirmPassword':new FormControl(null, Validators.required),
      'teamId': new FormControl(""),
      'designation': new FormControl(""),
    }); 
  }
  signupdata(data:datamodel)
  {
    data.id= uuidv4();
    if(data.password===data.confirmPassword)
    {
      console.log(this.signupForm.value);
      debugger
     this.apiService.addemployee(data).subscribe((res=>{
      this.signupForm.reset();
      this.router.navigate(['login']);
     }))

    }

  }
}
