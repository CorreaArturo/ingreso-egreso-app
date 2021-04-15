import { Component, OnInit } from '@angular/core';
import { UserInfoManagementService } from '../services/user-info-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private  userInfoManagementService:UserInfoManagementService) { }

  ngOnInit(): void {
    console.log('Ingresando ..');
    this.userInfoManagementService.doRequestServiceRetry().subscribe(response=>{
      console.log(`response ${response}!`);
    });
  }

}
