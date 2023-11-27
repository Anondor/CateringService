import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from './home/model';
import { teamDatamodel } from './account/profile/team/teamModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:3000/usersdata";
  apiTeamUrl="http://localhost:3000/usersTeamData";
  public isLogin:boolean;
  public userName:string;
  public email:string;
  public id:any;
  public phone:string;

  public teamName:string;
  public designation:string;
  public teamLead:string;
  
  constructor(private http: HttpClient) { }

  addemployee( data:datamodel)
{
  return this.http.post<datamodel>(`${this.apiUrl}`,data);
  
}
addTeamDetails (data:teamDatamodel)
{
  return this.http.post<datamodel>(`${this.apiTeamUrl}`,data);
}

getemployee()
{
  const userData= this.http.get<datamodel[]>(`${this.apiUrl}`);
  return userData;

}


}
