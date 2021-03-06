import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {User} from '../../../../shared/model/User';
import {Inscription} from '../../../../shared/model/Inscription';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Classe} from '../../../../shared/model/Classe';
import {Role} from '../../../../shared/model/Role';
import {Constants} from '../../../../Utils/Constants';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tz-ajout-etudiant',
  templateUrl: './tz-ajout-etudiant.component.html',
  styleUrls: ['./tz-ajout-etudiant.component.scss']
})
export class TzAjoutEtudiantComponent implements OnInit {

  loading: boolean;
  validatingForm: FormGroup;
  etudiant: User;
  hide = true;
  listEtudiant: any[];
  roles: Role[];
  role: Role;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  inscription: Inscription;
  displayedColumns: string[] = ['login', 'prenom', 'nom', 'role'];
  dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router: Router
  ) {
  }

  ngOnInit() {
   this.reinit();
  }

  reinit() {
    this.etudiant = new User();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getConstant(etudiant: User) {
    etudiant.enabled = true;
    etudiant.role = Constants.TYPE_ETUDIANT;
  }
  findUser() {
    this.etudiant.page = this.paginator.pageIndex + 1;
    this.etudiant.limit = this.paginator.pageSize;
    this.search(this.etudiant);
  }
  search(etudiant: User) {
    this.loading = true;
    console.log('mihiditra ato');
    this.getConstant(etudiant);
    this.dataService.post(urlList.path_find_user, etudiant).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listEtudiant = response.data.list;
        this.paginator.length = +response.data.total;
        this.paginator.pageSize = +this.etudiant.limit;
        this.dataSource = new MatTableDataSource<any>(this.listEtudiant);
      } else {
        this.listEtudiant = [];
      }
      this.loading = false;
    });
  }
  goToAdd() {
    this.router.navigate(['/menu/user/edit/0/' + Constants.ETUDIANT]);
  }
}
