import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { datamodel } from '../interfaces/model';
import { Router } from '@angular/router';
import { IuserTeam } from '../interfaces/userTeams';
import { teamDatamodel } from '../interfaces/teamModel';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  userData:datamodel[];
  teamData:teamDatamodel[];
  userTeamData:IuserTeam[]=[];  
  constructor(private apiService:ApiService,private router:Router){
  }

 async ngOnInit() {
    
    await this.getUserData();
  }
  

  mergeData(){

    
    this.userData.forEach(user => { 
      const team = this.teamData.find(team => team.id == user.teamId);
      this.userTeamData.push({ userData: user,teamdata: team});

    });
  }
  
  async getUserData()
  {
    this.apiService.getUserData().subscribe(res=>{
      this.userData=res;  
    })
 
    this.getTeamData();
  }

   getTeamData()
  {
    
    this.apiService.getTeamData().subscribe(res=>{

      this.teamData=res;
      this.mergeData();
    })
  }
  deleteRow(item:datamodel)
  {
    return this.apiService.delete(item.id, item).subscribe(res=>
      {
        this.apiService.deleteTeamData(item.id, item).subscribe(res=>{
        })
      alert("item delete successfully");
      })
  
  }
  

}  




