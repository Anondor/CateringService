import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ItemDataModel } from 'src/app/interfaces/menu';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-set-meal',
  templateUrl: './set-meal.component.html',
  styleUrls: ['./set-meal.component.css']
})
export class SetMealComponent implements OnInit{

mealDataForm:FormGroup
programData:any;
setMenu:ItemDataModel[];

/*
  setMenu=[
      {id: '1', menuName: 'Chicken', defaultPrice:102.00},
      {id: '2', menuName: 'Beef',defaultPrice:120.00},
      {id: '3', menuName: 'Fish',defaultPrice:90.00},
    ];
*/
 
    
   
  constructor(private router:Router, private apiService:ApiService){ 
   
    this.getProgramData();
    this.getSetMenu();
    
   }

  ngOnInit(): void {
    this.mealDataForm = new FormGroup({
      id:new FormControl(),
      mealName:new FormControl(null,Validators.required),
      defaultMealRate:new FormControl(),
      programId:new FormControl(null,Validators.required),
      isPublish: new FormControl(null,Validators.required),
    }); 

  }

  getSetMenu()
  {
    this.apiService.getSetMenu().subscribe(res=>{
      this.setMenu=res;
 
    })
  }

  getProgramData()
  {
    this.apiService.getProgramData().subscribe(res=>{
      this.programData=res;
 
    })
  }
  addMealData(data:any)
  {
    data.id= uuidv4();
    for(let item of this.setMenu)
    {
      if(item.menuName===data.mealName)
      {
        data.defaultMealRate=item.defaultPrice;
        break;
      }
    }
    data.defaultMealRate=
    this.apiService.addMeal(data).subscribe((res=>{
      this.mealDataForm.reset();
      this.router.navigate(['admin']);

     }))
  }
  addNewProgram()
  {
    this.router.navigate(["setProgram"])
  }
  addNewItem()
  {
    this.router.navigate(["add-new-meal"])
  }


}
