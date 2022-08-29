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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
   // Doughnut
   
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
  displayedColumns: string[] = ['id', 'name', 'dateTache', 'isCompleted','user'];
  displayedColumnsData: string[] = ['id', 'name', 'dateTache', 'isCompleted','user[]'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTaches() ;
    // this.getUsers();
    this.currentUser = this.token.getUser();
  
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

 

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


}