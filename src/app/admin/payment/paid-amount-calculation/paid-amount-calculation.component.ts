import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PaidBalanceModel } from 'src/app/interfaces/dateRangeModel';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-paid-amount-calculation',
  templateUrl: './paid-amount-calculation.component.html',
  styleUrls: ['./paid-amount-calculation.component.css']
})
export class PaidAmountCalculationComponent implements OnInit {

  public userId: string;
  public userPaidAmountForm:FormGroup;
  constructor(private activatedroute: ActivatedRoute, private router: Router, private apiService: ApiService) {

    this.userId = this.activatedroute.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {

    this.userPaidAmountForm = new FormGroup({
      paidAmount:new FormControl('',Validators.required),
    });
  }

  paidData(data:PaidBalanceModel)
  {
    const TODAY_STR = new Date().toISOString();
    data.id=uuidv4();
    data.userId=this.userId,
    data.paidDate=TODAY_STR.slice(0,10);
    this.apiService.addPaidAmountDetails(data).subscribe((res => {
      this.userPaidAmountForm.reset();

      this.router.navigate(["payment"])
    }))
  }



}
