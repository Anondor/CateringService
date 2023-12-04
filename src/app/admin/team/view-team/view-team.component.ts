import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { teamDatamodel } from 'src/app/interfaces/teamModel';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit{
  teamData:teamDatamodel[];

  constructor(private formbuilder:FormBuilder,private apiService:ApiService,private router:Router){
  }


  ngOnInit(): void {
    this.getTeamData();

  }
  getTeamData()
  {
    
    this.apiService.getTeamData().subscribe(res=>{

      this.teamData=res;
      console.log(this.teamData);

    })
  }
  deleteRow(item:teamDatamodel)
  {
    return this.apiService.deleteTeamData(item.id, item).subscribe(res=>
      {
      alert("item delete successfully");
      })
  
  }


}
