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
  selector: 'app-pie-chart-tache',
  templateUrl: './pie-chart-tache.component.html',
  styleUrls: ['./pie-chart-tache.component.css']
})
export class PieChartTacheComponent{
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
  displayedColumns: string[] = ['id', 'name', 'dateDebut','dateFin','lieu','user'];
  displayedColumnsData: string[] = ['id', 'name', 'dateDebut','dateFin','lieu','user'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getEvenments() ;
    this.currentUser = this.token.getUser();
  
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
}
