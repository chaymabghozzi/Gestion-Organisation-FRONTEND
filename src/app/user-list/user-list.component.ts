import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../entities/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService : UserService,
    private token : TokenStorageService 
     ) { }

  users? : User[] ;
  currentUser : any ;
  adminPermission : boolean = false ;
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username','nom', 'prenom','update','delete','affiche'];
  displayedColumnsData: string[] = ['id', 'username','nom', 'prenom','update','delete','affiche'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers() ;
    this.currentUser = this.token.getUser();
  
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers() : void
  {
    this.userService.getUsers().subscribe(
      (response : User[]) => {
        this.users = response;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
