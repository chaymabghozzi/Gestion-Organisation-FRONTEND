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
  selector: 'app-proposition-list',
  templateUrl: './proposition-list.component.html',
  styleUrls: ['./proposition-list.component.css']
})
export class PropositionListComponent implements OnInit {

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

}
