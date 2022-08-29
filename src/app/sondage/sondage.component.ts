import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Sondage } from '../entities/sondage';
import { SondageService } from '../_services/sondage.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit {
  userService: any;
  users: Sondage[] | undefined;
  constructor(
    private sondageService : SondageService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
     ) {  let formControls = { user: new FormControl('', [
      Validators.required
    ]),}}
    

  @Input() sondage? : Sondage
  router: any;
  modalService: any;

  public editSondage?: Sondage;
  showUserBoard = false;
  sondages? : Sondage[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Sondage>;
  displayedColumns: string[] = ['id', 'name', 'dateSondage', 'isCompleted','user','update','delete'];
  displayedColumnsData: string[] = ['id', 'name', 'dateSondage', 'isCompleted','user[]','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSondages() ;
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }
  getSondages() : void
  {
    this.sondageService.getSondages().subscribe(
      (response : Sondage[]) => {
        this.sondages = response
        this.dataSource = new MatTableDataSource(this.sondages);
        console.log("sondage",response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
    );
    
  }

  public deleteSondage(id : number): void{
    this.sondageService.deleteSondage(id).subscribe(
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
          confirmButtonText: 'Oui, Supprimer Sondage!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Supprimé!',
              'Votre sondage a été supprimé.',
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

  listSondage(id_sondage: any){
    this.router.navigate(['/listSondage', id_sondage]);
  }

  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSondage() : void 
  {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.sondageService.getSondage(id).subscribe(sondage => this.sondage = sondage); 
  }
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
}
}
