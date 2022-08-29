import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = './assets/logo.png'
  form : any = {
    username : null,
    password : null,
    
  };
  isLoggedIn = false ;
  isLoginFailed = false ;
  errorMessage = '' ;
  roles : string[] = [] ;
  showAdminBoard = false;
  showUserBoard = false;

  constructor(
    private authService : AuthService,
    private tokenStorage : TokenStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken())
    {
      this.isLoggedIn = true ;
      this.roles = this.tokenStorage.getUser().roles ;
    }
  }

  onSubmit(): void
  {
    const {login,password} = this.form ;
    this.authService.login(login,password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true ;
        this.isLoginFailed = false ;
        this.roles = this.tokenStorage.getUser().roles ;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showUserBoard = this.roles.includes('ROLE_USER');
      
      
        if (this.showAdminBoard) {
        this.route.navigate(['/dashboard']).then(() => {
          window.location.reload();
         });
      }
      if (this.showUserBoard) {
        this.route.navigate(['/dashboardadmin']).then(() => {
          window.location.reload();
         });
      }
    },

    

    
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true ;
      }
    );
  }

  reloadPage() : void
  {
    window.location.reload() ;
  }


}
