import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Proposition } from '../entities/proposition';
import { PropositionService } from '../_services/proposition.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.css']
})
export class PropositionComponent implements OnInit {

  constructor(
    private propositionService : PropositionService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
     ) { }

     @Input() proposition? : Proposition
     router: any;
     modalService: any;
   
     public editProposition?: Proposition;
     showUserBoard = false;
     propositions? : Proposition[] ;
     currentUser : any ;
     adminPermission : boolean = false;
     dataSource!: MatTableDataSource<Proposition>;
     displayedColumns: string[] = ['id', 'name', 'description','user','delete'];
     displayedColumnsData: string[] = ['id', 'name', 'description','user','delete'];
     @ViewChild(MatSort) sort!: MatSort;
     @ViewChild(MatPaginator) paginator!: MatPaginator;

     ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  
    ngOnInit(): void {
      this.getPropositions() ;
      this.currentUser = this.token.getUser();
      this.adminPermission = this.permissions();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    }
    getPropositions() {
      this.propositionService.getPropositions().subscribe(
        (response : Proposition[]) => {
          this.propositions = response;
          this.dataSource = new MatTableDataSource(this.propositions);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    public deleteProposition(id : number): void{
      this.propositionService.deleteProposition(id).subscribe(
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
  
    listProposition(id_proposition: any){
      this.router.navigate(['/listProposition', id_proposition]);
  
    }
    logData(row: any) {
      console.log(row);
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
    getProposition() : void 
    {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.propositionService.getProposition(id).subscribe(proposition => this.proposition = proposition); 
    }
  

  }
