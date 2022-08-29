import { Component, OnInit, Input } from '@angular/core';
import { Espace } from '../entities/espace';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, NgForm } from '@angular/forms';
import { EspaceService } from '../_services/espace.service';
import { UserService } from '../_services/user.service';
import { User } from '../entities/user';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-espace-detail',
  templateUrl: './espace-detail.component.html',
  styleUrls: ['./espace-detail.component.css']
})
export class EspaceDetailComponent implements OnInit {

  @Input() espace? : Espace 
  users? : User[] 
  EspaceService: any;
  selectedUser='';
  url?: Espace['logo'];
 
  constructor(
    private route : ActivatedRoute,
    private location : Location, 
    private espaceService : EspaceService,
    private formBuilder : FormBuilder,
    private userService : UserService
  ) { }

  espaceForm = this.formBuilder.group(
    {
     
      libelle : this.espace?.libelle,
      presentation : this.espace?.presentation, 
      objectifs : this.espace?.objectifs,
      user : this.espace?.user,
      logo : this.url
    }
  ) ;
  ngOnInit(): void {
    this.getEspace(); 
    this.getUsers();
  }

  goBack() : void 
  {
    this.location.back() ; 
  }

  getEspace() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.espaceService.getEspace(id).subscribe(espace => this.espace = espace); 
  }


  selectChangeHandlerUser(event: any) {
    this.selectedUser = event.target.value;
  }

  addEspace(
    libelle: string,presentation : string,
    objectifs:string,logo:any,
   
  ) : void 
  {
    let nEspace: Espace = new Espace(libelle,presentation,objectifs,logo);
    this.espaceService.addEspace(nEspace)
    .subscribe(resultat => {
      console.log(resultat);
      Swal.fire(
        'Bravo!',
        'Espace enregistré avec succès!',
        'success'
        );
      })
  
  }


  saveEspace(): void 
  {
    if(this.espace)
    {
      this.espaceService.updateEspace(this.espace).subscribe(resultat => {
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

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(this.url)
    }
  }


}
