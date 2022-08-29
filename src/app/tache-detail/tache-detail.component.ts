import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tache } from '../entities/tache';
import { User } from '../entities/user';
import { UserService } from '../_services/user.service';
import { Location } from '@angular/common';
import { TacheService } from '../_services/tache.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tache-detail',
  templateUrl: './tache-detail.component.html',
  styleUrls: ['./tache-detail.component.css']
})
export class TacheDetailComponent implements OnInit {
  
  @Input() tache? : Tache 
  users? : User[] 
  TacheService: any;
  selectedUser='';
  selecteIsCompleted: any;
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private tacheService : TacheService,
    private formBuilder : FormBuilder,
    private userService : UserService
  ) { }

 tacheForm = this.formBuilder.group(
    {
      name : this.tache?.name,
      dateTache : this.tache?.dateTache, 
      isCompleted : this.tache?.isCompleted,
      user : this.tache?.user,
  
    }
  ) ;
  ngOnInit(): void {
    this.getTache();
 
    this.getUsers();
  
  }

  getTache() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tacheService.getTache(id).subscribe(tache => this.tache = tache); 
  }


  
  goBack() : void 
  {
    this.location.back() ; 
  }

 
  selectChangeHandlerUser(event: any) {
    this.selectedUser = event.target.value;
  }

  addTache(
    name : string, dateTache:string,
    isCompleted:string, 
  ) : void 
  {
    let nTache: Tache = new Tache(name,dateTache,isCompleted);
    this.tacheService.addTache(nTache)
    .subscribe(resultat => {
      console.log(resultat);
      Swal.fire(
        'Bravo!',
        'Tache enregistré avec succès!',
        'success'
        );
      })
  
  }

  
  saveTache(): void 
  {
    if(this.tache)
    {
      this.tacheService.updateTache(this.tache).subscribe(resultat => {
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
