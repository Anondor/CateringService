import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { teamDatamodel } from './teamModel';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  
  teamDataForm:FormGroup
  constructor(private router:Router, private apiService:ApiService){  }
  userId:string;

  ngOnInit(): void {
    this.teamDataForm = new FormGroup({
      'teamId':new FormControl(),
      'teamName':new FormControl(),
      'designation':new FormControl(),
      'teamLeadName':new FormControl()
    }); 

  }

  
  addTeamData(data:teamDatamodel)
  {
    data.teamId=this.apiService.id;
    console.log("userId: "+this.userId);
    console.log(data);
    
    this.apiService.addTeamDetails(data).subscribe((res=>{
      this.apiService.teamName=data.teamName;
      this.apiService.designation=data.designation;
      this.apiService.teamLead=data.teamLead;
      
      this.teamDataForm.reset();
      this.router.navigate(['profile']);
     }))
  }

}


