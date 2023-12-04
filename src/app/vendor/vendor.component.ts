import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
todayDate:any="2023-10-29T18:24";

  ngOnInit(): void {
    this.pastDateTime();
   
    
  }
  
  pastDateTime()
  {
    var todaysDate=new Date();
    var date:any=todaysDate.getDate();
    if(date<10){date ="0"+date;}
    var month:any=todaysDate.getMonth()+1;
    if(month<10)month="0"+month;
    var year:any=todaysDate.getFullYear();
    var hours:any=todaysDate.getHours();
    var minutes:any=todaysDate.getMinutes();
   this.todayDate=year+"-"+month+"-"+date+"T"+hours+":"+minutes;
  }


}
