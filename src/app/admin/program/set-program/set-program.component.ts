import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-set-program',
  templateUrl: './set-program.component.html',
  styleUrls: ['./set-program.component.css']
})
export class SetProgramComponent implements OnInit{

 programDataForm:FormGroup
  constructor(private router:Router, private apiService:ApiService){ 
    
   }

  ngOnInit(): void {
    this.programDataForm = new FormGroup({
      'id':new FormControl(),
      'programName':new FormControl(null,Validators.required),
    }); 
  }

  addProgramData(data:any)
  {
    data.id= uuidv4();
    this.apiService.addPrograms(data).subscribe((res=>{
      this.programDataForm.reset();
      this.router.navigate(['setMeal']);
     }))
  }




}
