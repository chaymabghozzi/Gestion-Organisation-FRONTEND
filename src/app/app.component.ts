import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  adminPermission : boolean = false ; 
  userPermission : boolean = false ; 
  
  user : any ;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.adminPermission = this.permissions();
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    
    }
  }
    logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public permissions(): boolean 
  {
    return this.user.roles.includes("ROLE_ADMIN");
  }
}
