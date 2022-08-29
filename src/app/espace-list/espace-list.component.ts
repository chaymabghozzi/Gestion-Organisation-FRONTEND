import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EspaceService } from '../_services/espace.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Espace } from '../entities/espace';
import { HttpErrorResponse } from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-espace-list',
  templateUrl: './espace-list.component.html',
  styleUrls: ['./espace-list.component.css']
})
export class EspaceListComponent implements OnInit {

  constructor(
    private espaceService : EspaceService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
   
     ) { }
     
  @Input() espace? : Espace
  router: any;
  modalService: any;
 
  public editEspace?: Espace;
  showUserBoard = false;
  espaces? : Espace[] ;
  currentUser : any ;
  adminPermission : boolean = false;
  dataSource!: MatTableDataSource<Espace>;
  displayedColumns: any[] = ['id', 'libelle', 'user','update','delete','affiche'];
  displayedColumnsData: any[] = ['id', 'libelle','user','update','delete','affiche'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getEspaces() ;
    this.currentUser = this.token.getUser();
   
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  getEspaces() {
    this.espaceService.getEspaces().subscribe(
      (response : Espace[]) => {
        this.espaces = response;
        this.dataSource = new MatTableDataSource(this.espaces);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
