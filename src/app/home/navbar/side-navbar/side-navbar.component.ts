import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
  constructor(private router:Router,private apiService:ApiService) {}


  adminRoute()
  {
    this.router.navigate(['admin']);
  }
  deshBoardRoute()
  {
    this.router.navigate(['profile']);
  }
  setProgram()
  {
    this.router.navigate(['setMeal']);
  }
  orderManagement()
  {
    this.router.navigate(['order-management']);
  }
  calenderView()
  {
    this.router.navigate(['view-calendar']);
  }

}
