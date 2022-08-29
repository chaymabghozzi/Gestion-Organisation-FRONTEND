import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Sondage } from '../entities/sondage';
import { User } from '../entities/user';
import { SondageService } from '../_services/sondage.service';
import { UserService } from '../_services/user.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sondage-detail',
  templateUrl: './sondage-detail.component.html',
  styleUrls: ['./sondage-detail.component.css']
})
export class SondageDetailComponent implements OnInit {

  @Input() sondage? : Sondage 
  users? : User[] 
  SondageService: any;
  selectedUser='';
  selecteIsCompleted: any;
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private sondageService : SondageService,
    private formBuilder : FormBuilder,
    private userService : UserService
  ) { }

  sondageForm = this.formBuilder.group(
    {
      name : this.sondage?.name,
      dateSondage : this.sondage?.dateSondage, 
      isCompleted : this.sondage?.isCompleted,
      user : this.sondage?.user,
  
    }
  ) ;

  ngOnInit(): void {
    this.getSondage();
 
    this.getUsers();
  
  }

  getSondage() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sondageService.getSondage(id).subscribe(sondage => this.sondage = sondage); 
  }
  
 

  goBack() : void 
  {
    this.location.back() ; 
  }

  selectChangeHandlerUser(event: any) {
    this.selectedUser = event.target.value;
  }

  addSondage(
    name : string, dateSondage:string,
    isCompleted:string, 
  ) : void 
  {
    let nSondage: Sondage = new Sondage(name,dateSondage,isCompleted);
    this.sondageService.addSondage(nSondage)
    .subscribe(resultat => {
      console.log(resultat);
      Swal.fire(
        'Bravo!',
        'Sondage enregistré avec succès!',
        'success'
        );
      })
  
  }

  saveSondage(): void 
  {
    if(this.sondage)
    {
      this.sondageService.updateSondage(this.sondage).subscribe(resultat => {
        console.log(resultat);
        Swal.fire(
          'Bravo!',
          'Mise a jours avec succès!',
          'success'
          );
        })
  }
}

getUsers() : void 
{
  this.userService.getUsers().subscribe(
    (response : User[]) => {
      this.users = response ;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

selectChangeHandler(event: any) {
  this.selecteIsCompleted = event.target.value;
  console.log(this.selecteIsCompleted);
}
selectChangeUser(event: any) {
  this.selectedUser = event.target.value;
}
}
