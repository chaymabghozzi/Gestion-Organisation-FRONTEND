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
  selector: 'app-pie-chart-sondage',
  templateUrl: './pie-chart-sondage.component.html',
  styleUrls: ['./pie-chart-sondage.component.css']
})
export class PieChartSondageComponent implements OnInit {
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
  displayedColumns: string[] = ['id', 'name', 'dateSondage', 'isCompleted','user'];
  displayedColumnsData: string[] = ['id', 'name', 'dateSondage', 'isCompleted','user[]'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getSondages() ;
    this.currentUser = this.token.getUser();
 
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
}