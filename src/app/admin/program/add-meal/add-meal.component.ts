import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  mealDataForm: FormGroup

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit(): void {

    this.mealDataForm = new FormGroup({
      id: new FormControl(),
      menuName: new FormControl(null, Validators.required),
      defaultPrice: new FormControl(null, Validators.required)

    });
  }

  addItemData(data: any) {
    data.id = uuidv4();
    this.apiService.addNewItem(data).subscribe((res => {
      this.mealDataForm.reset();
      this.router.navigate(['setMeal']);
    }))
  }

}
