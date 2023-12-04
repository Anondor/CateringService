import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { teamDatamodel } from 'src/app/interfaces/teamModel';
import { ApiService } from 'src/app/api.service';
import { datamodel } from 'src/app/interfaces/model';


@Component({
  selector: 'app-update-user-team',
  templateUrl: './update-user-team.component.html',
  styleUrls: ['./update-user-team.component.css'],

})
export class UpdateUserTeamComponent implements OnInit{
  public userDataId:string;
  public userTeamForm:FormGroup;
  public teamData:teamDatamodel[];


  constructor(private activatedroute:ActivatedRoute, private router:Router,private apiService:ApiService){
    this.userDataId = this.activatedroute.snapshot.paramMap.get('id');
    this.getUserData();
    this.getTeamData();
  }


  ngOnInit(): void {

    this.userTeamForm = new FormGroup({

    id:new FormControl(),
    userName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    phone:new FormControl('',[Validators.required]),
    password:new FormControl('',Validators.required),
    confirmPassword:new FormControl('', Validators.required),
    teamId:new FormControl('',[Validators.required]),
    designation:new FormControl('',Validators.required)

  });

    // this.activatedroute.paramMap.subscribe((param:Params)=>{
    //  // this.userDataId=param['get']("id");
    // })

  }
  getUserData()
  {
    this.apiService.fetchdata(this.userDataId).subscribe((data: datamodel)=>{
      this.userTeamForm.patchValue(data);
    })
  }
  getTeamData()
  {
    this.apiService.getTeamData().subscribe(res=>{
      this.teamData=res;
    })
  }


  updateData(data:datamodel)
  {
     this.apiService.updateemployee(this.userTeamForm.value.id, this.userTeamForm.value).subscribe((res:datamodel)=>
     {
      this.router.navigate(["admin"]);
     })

    

  }

}


