
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EspaceService } from '../_services/espace.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Espace } from '../entities/espace';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-espace',
  templateUrl: './detail-espace.component.html',
  styleUrls: ['./detail-espace.component.css']
})
export class DetailEspaceComponent implements OnInit {
  id!: number;
  response!: Espace;

  constructor(
    private espaceService : EspaceService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
    private location : Location, 
   
     ) { }
     
  @Input() espace? : Espace
  router: any;
  modalService: any;
  private logo :any;

  public editEspace?: Espace;
  showUserBoard = false;
  espaces? : Espace[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Espace>;
  displayedColumns: any[] = ['id', 'libelle', 'presentation', 'objectifs','user'];
  displayedColumnsData: any[] = ['id', 'libelle', 'presentation', 'objectifs','user'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.getEspace() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }


  public getEspaces(): void{
    this.espaceService.getEspace(this.id).subscribe(
      response => {
        this.response=response;
        console.log(response);
      
      }
      
    );
    
  }

 

  public deleteEspace(id : number): void{
    this.espaceService.deleteEspace(id).subscribe(
      (response: void) => {
        console.log(response);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        Swal.fire({
          title: 'Êtes-vous sûr?',
          text: "Vous ne pourrez pas revenir en arrière!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, Supprimer Espace!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Supprimé!',
              'Votre espace a été supprimé.',
              'success'
            )
          }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    
    })
  }
  public permissions(): boolean
  {
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }

  listEspace(id_espace: any){
    this.router.navigate(['/listEspace', id_espace]);

  }
  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getEspace() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.espaceService.getEspace(id).subscribe(
      response => {
        this.response=response;
        console.log(response);
      
      }
      
    );
    
  }
  goBack() : void 
  {
    this.location.back() ; 
  }

}
