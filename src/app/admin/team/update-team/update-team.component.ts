import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { teamDatamodel } from 'src/app/interfaces/teamModel';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit{
  public teamId:string;
  teamData:teamDatamodel;
  public teamDataForm:FormGroup;
  constructor(private activatedroute:ActivatedRoute, private router:Router,private apiService:ApiService){}


  ngOnInit(): void {

    this.teamDataForm=new FormGroup({
      id:new FormControl(),
      teamName:new FormControl('',Validators.required),
    })

    this.activatedroute.paramMap.subscribe((param:Params)=>{
      this.teamId=param['get']("id");
    }) 

  this.getTeamData();
  }

  getTeamData()
  {
    this.apiService.fetchTeamData(this.teamId).subscribe((data: teamDatamodel)=>{
      this.teamDataForm.patchValue(data);
    })
  }
  

  updateTeam(data:teamDatamodel)
  {
     this.apiService.updateTeam(this.teamDataForm.value.id, this.teamDataForm.value).subscribe((res:teamDatamodel)=>
     {
      this.router.navigate(["/"]);
     })
  }
}
