import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Evenement } from '../entities/evenement';
import { EvenementService } from '../_services/evenement.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  constructor(
    private evenementService : EvenementService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
     ) { }

     
  @Input() evenement? : Evenement
  router: any;
  modalService: any;

  public editEvenement?: Evenement;
  showUserBoard = false;
  evenements? : Evenement[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Evenement>;
  displayedColumns: string[] = ['id', 'name', 'dateDebut','dateFin','lieu','uploadDir','user','update','delete'];
  displayedColumnsData: string[] = ['id', 'name', 'dateDebut','dateFin','lieu','uploadDir','user','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getEvenments() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  getEvenments() {
    this.evenementService.getEvenements().subscribe(
      (response : Evenement[]) => {
        this.evenements = response;
        this.dataSource = new MatTableDataSource(this.evenements);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteEvenement(id : number): void{
    this.evenementService.deleteEvenement(id).subscribe(
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
          confirmButtonText: 'Oui, Supprimer Evenement!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Supprimé!',
              'Votre evenement a été supprimé.',
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

  listEvenement(id_evenement: any){
    this.router.navigate(['/listEvenement', id_evenement]);

  }
  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getEvenemnt() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evenementService.getEvenement(id).subscribe(evenment => this.evenement = evenment); 
  }
}
