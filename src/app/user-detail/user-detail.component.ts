import { Component, OnInit, Input } from '@angular/core';
import { User } from '../entities/user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Role } from '../entities/role';
import { RoleService } from '../_services/role.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {



  @Input() user? : User;
  roles? : Role[];
  chosenRole? : Role ;
  chosenRoleId? : number ;
  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private userService : UserService,
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private roleService : RoleService
  ) { }

  userForm = this.formBuilder.group(
    {
      username : this.user?.username,
      password : this.user?.password,
      nom : this.user?.nom,
      prenom : this.user?.prenom,
      numTel : this.user?.numTel



    }
  ) ;
  ngOnInit(): void {
    this.getUser();
  }

  goBack() : void
  {
    this.location.back() ;
  }

  getUser() : void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  addUser(
    username: string,email : string,
    password:string,nom: string,
    prenom : string,numTel:string
  ) : void 
  {
    let nUser: User = new User(username,email,password,nom,prenom,numTel);
    this.userService.addUser(nUser)
    .subscribe(resultat => {
      console.log(resultat);
      Swal.fire(
        'Bravo!',
        'Espace enregistré avec succès!',
        'success'
        );
      })
  }
 

  saveUser(): void
  {
    if(this.user)
    {
      this.userService.updateUser(this.user).subscribe(
        () => this.goBack()
      );
    }
  }

  getRoles() : void
  {
    this.roleService.getRoles().subscribe(
      (response : Role[]) => {
        this.roles = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  show(): void
  {

    document.getElementById("sessionsToAdd")!.hidden = false ;
    document.getElementById("saveAdded")!.hidden = false ;

    this.getRoles();

  }

  saveRole() : void
  {
    if(this.chosenRoleId)
    {
     this.user?.roles?.push(this.chosenRole!);
     this.userService.updateUser(this.user!).subscribe(
      () => this.goBack());

    }

  }

  onOptionsSelected(value : string) : void
  {
      this.chosenRoleId = parseInt(value);
      this.roleService.getRole(this.chosenRoleId).subscribe(role => this.chosenRole = role);

  }


}
