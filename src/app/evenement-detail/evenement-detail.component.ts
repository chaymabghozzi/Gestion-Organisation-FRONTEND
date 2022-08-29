import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Evenement } from '../entities/evenement';
import { User } from '../entities/user';
import { EvenementService } from '../_services/evenement.service';
import { UserService } from '../_services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.css']
})
export class EvenementDetailComponent implements OnInit {

  @Input() evenement? : Evenement 
  users? : User[] 
  EvenementService: any;
  selectedUser='';
  selecteIsCompleted: any;
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private evenementService : EvenementService,
    private formBuilder : FormBuilder,
    private userService : UserService
  ) { }

  evenementForm = this.formBuilder.group(
    {
      name : this.evenement?.name,
      dateDebut : this.evenement?.dateDebut,
      dateFin : this.evenement?.dateFin,

      lieu : this.evenement?.lieu,
      uploadDir : this.evenement?.uploadDir,
      user : this.evenement?.user,
  
    }
  ) ;

  ngOnInit(): void {
    this.getEvenement();
    this.getUsers();
  }

  getEvenement() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evenementService.getEvenement(id).subscribe(evenement => this.evenement = evenement); 
  }

  
  goBack() : void 
  {
    this.location.back() ; 
  }

  selectChangeHandlerUser(event: any) {
    this.selectedUser = event.target.value;
  }

  addEvenement(
    name : string, 
    dateDebut:string, dateFin:string, lieu:string, uploadDir:string
  ) : void 
  {
    let nEvenement: Evenement = new Evenement(name,dateDebut,dateFin,lieu,uploadDir);
    this.evenementService.addEvenement(nEvenement)
    .subscribe(resultat => {
      console.log(resultat);
      Swal.fire(
        'Bravo!',
        'Evenement enregistré avec succès!',
        'success'
        );
      })
  
  }

  saveEvenement(): void 
  {
    if(this.evenement)
    {
      this.evenementService.updateEvenement(this.evenement).subscribe(resultat => {
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
