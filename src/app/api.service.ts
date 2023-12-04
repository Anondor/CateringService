import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './interfaces/model';
import { IuserTeam } from './interfaces/userTeams';
import { teamDatamodel } from './interfaces/teamModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:3000/usersData";
  apiTeamUrl="http://localhost:3000/teamData";
  apiProgramUrl="http://localhost:3000/programs";
  apiMealUrl="http://localhost:3000/meals";
  public isLogin:boolean;
  public userName:string;
  public email:string;
  public id:any;
  public phone:string;

  
  constructor(private http: HttpClient) { }
  // Add user

  addemployee( data:datamodel)
  {
    return this.http.post<datamodel>(`${this.apiUrl}`,data);
    
  }
    // Add Team info
  addTeamDetails (data:teamDatamodel)
  {
    return this.http.post<datamodel>(`${this.apiTeamUrl}`,data);
  }
  // get user

  getUserData()
  {
    const userData= this.http.get<datamodel[]>(`${this.apiUrl}`);
    return userData;
  }
  getTeamData()
  {
    const teamdata=this.http.get<teamDatamodel[]>(`${this.apiTeamUrl}`);
    return teamdata;

  }
  getProgramData()
  {
    const programData=this.http.get<any[]>(`${this.apiProgramUrl}`);
    return programData;

  }
  // fetch data
  fetchTeamData(teamId:string)
  {
    return this.http.get<teamDatamodel>(`${this.apiTeamUrl}/${teamId}`);
  }
  delete(id:String,data:any)
  {
    return this.http.delete(`${this.apiUrl}/${id}`,data);
  }

  deleteTeamData(id:String,data:any)
  {
    return this.http.delete(`${this.apiTeamUrl}/${id}`,data);
  }
  // fetch user data
  fetchdata(id:string)
  {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateemployee(id:string,data:datamodel)
  {

    const updateUser=this.http.put<datamodel>(`${this.apiUrl}/${id}`,data);
        return updateUser;
  }
  updateTeam(id:string,data:teamDatamodel)
  {
    return this.http.put<teamDatamodel>(`${this.apiTeamUrl}/${id}`,data);
  }

// add new Programs
  addPrograms(data:any)
  {
    return this.http.post<any>(`${this.apiProgramUrl}`,data);

  }
  addMeal(data:any)
  {
    return this.http.post<any>(`${this.apiMealUrl}`,data);
  }

}
