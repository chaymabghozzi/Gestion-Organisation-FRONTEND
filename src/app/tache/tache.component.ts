import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Tache } from '../entities/tache';
import { User } from '../entities/user';
import { TacheService } from '../_services/tache.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {
  userService: any;
  users: Tache[] | undefined;
  constructor(
    private tacheService : TacheService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
     ) {  let formControls = { user: new FormControl('', [
      Validators.required
    ]),}}
    

  @Input() tache? : Tache
  router: any;
  modalService: any;

  public editTache?: Tache;
  showUserBoard = false;
  taches? : Tache[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Tache>;
  displayedColumns: string[] = ['id', 'name', 'dateTache', 'isCompleted','user','update','delete'];
  displayedColumnsData: string[] = ['id', 'name', 'dateTache', 'isCompleted','user[]','update','delete'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTaches() ;
    // this.getUsers();
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }
  // getUsers() {
  //   this.userService.getUsers.subscribe(
  //     (response : User[]) => {
  //       this.taches = response
  //       this.dataSource = new MatTableDataSource(this.users);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
 

  getTaches() : void
  {
    this.tacheService.getTaches().subscribe(
      (response : Tache[]) => {
        this.taches = response
        this.dataSource = new MatTableDataSource(this.taches);
        console.log("tache",response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      
    );
    
  }

  public deleteTache(id : number): void{
    this.tacheService.deleteTache(id).subscribe(
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
          confirmButtonText: 'Oui, Supprimer Tache!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Supprimé!',
              'Votre tache a été supprimé.',
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

  listTache(id_tache: any){
    this.router.navigate(['/listTache', id_tache]);
  }

  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTache() : void 
  {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.tacheService.getTache(id).subscribe(tache => this.tache = tache); 
  }
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
}

}


