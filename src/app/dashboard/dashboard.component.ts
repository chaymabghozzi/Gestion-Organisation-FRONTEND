import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: any;
  User: any;
  user: any;
  isLoggedIn = false;
  // tslint:disable-next-line:max-line-length
  constructor(private token: TokenStorageService, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    const id = this.currentUser.id;
    this.User = this.userService.getUser(id).subscribe(data => {
      this.User = data;
    });
  }


    
  }
  

  

  
