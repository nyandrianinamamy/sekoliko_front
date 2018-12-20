import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../shared/model/User';
import {Role} from '../../../../shared/model/Role';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {DataService} from '../../../../shared/service/data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  etudiant: any[];
  utilisateur: User;
  listUtilisateur: any;
  roles: Role[];
  loading: boolean;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'age', 'adresse', 'contact', 'email', 'action'];
  constructor(private dataService: DataService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.utilisateur = new User();
    this.getTypeRole();
    this.getListEtudiants(this.utilisateur);
  }
  getTypeRole() {
    this.loading = true;
    this.dataService.post(urlList.path_find_role).subscribe(response => {
      if (response.data.length != 0 && response.code === ConstantHTTP.CODE_SUCCESS){
        this.roles = response.data !== null ? response.data : [];
        this.loading = false;
      }else {
        this.roles = response.data = [];
      }
    });
  }
  getListEtudiants(utilisateur: User) {
    this.loading = true;
    this.dataService.post(urlList.path_find_user, utilisateur).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.paginator.length = +response.data.total;
        this.paginator.pageSize = +this.utilisateur.limit;
        this.etudiant = response.data.list;
        console.log(this.etudiant)
        this.dataSource = new MatTableDataSource<any>(this.etudiant);
        this.loading = false;
      } else {
        console.log('verifieo le function aloha papie a :D ');
      }
    });
  }
  findUser() {
    this.utilisateur.page = this.paginator.pageIndex + 1;
    this.utilisateur.limit = this.paginator.pageSize;
    this.getListEtudiants(this.utilisateur);
  }
}
