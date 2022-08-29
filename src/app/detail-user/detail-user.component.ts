import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../entities/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  response!: User;
  id!: number;


  constructor(
    private userService : UserService,
    private token : TokenStorageService,
    private route : ActivatedRoute,
    private location : Location
     ) { }

    @Input() user? : User
    router: any;
    modalService: any;

  users? : User[] ;
  currentUser : any ;
  adminPermission : boolean = false ;
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username','nom', 'prenom','email','password','numTel','update'];
  displayedColumnsData: string[] = ['id', 'username','nom', 'prenom','email','password','numTel','update'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers() ;
    this.getUser() ;
 
    this.id =this.route.snapshot.params['id'];
    this.currentUser = this.token.getUser();
    this.adminPermission = this.permissions();
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

 

  public permissions(): boolean
  { 
    return this.currentUser.roles.includes("ROLE_ADMIN");
  }

  logData(row: any) {
    console.log(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getUser() : void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(
      response => {
        this.response=response;
        console.log(response);
      
      }
      
    );
    
  }
  goBack() : void 
  {
    this.location.back() ; 
  }
 
  // this.User = this.userService.getUser(id).subscribe(data => {
  //   this.User = data;
  // });

}
