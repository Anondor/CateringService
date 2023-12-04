import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { teamDatamodel } from 'src/app/interfaces/teamModel';
import { ApiService } from 'src/app/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css']
})
export class TeamRegistrationComponent  implements OnInit{
  
  teamDataForm:FormGroup
  constructor(private router:Router, private apiService:ApiService){  }

  ngOnInit(): void {
    this.teamDataForm = new FormGroup({
      'id':new FormControl(),
      'teamName':new FormControl(),
    }); 


  }
  addTeamData(data:teamDatamodel)
  {
    data.id= uuidv4();
    
    this.apiService.addTeamDetails(data).subscribe((res=>{
      this.teamDataForm.reset();
      this.router.navigate(['profile']);
     }))
  }

}


