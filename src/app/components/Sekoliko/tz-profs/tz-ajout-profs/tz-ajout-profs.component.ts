import { Component, OnInit } from '@angular/core';
import {Classe} from '../../../../shared/model/Classe';
import {Inscription} from '../../../../shared/model/Inscription';
import {Role} from '../../../../shared/model/Role';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../../shared/model/User';
import {DataService} from '../../../../shared/service/data.service';
import {Router} from '@angular/router';
import {urlList} from '../../../../Utils/api/urlList';
import {MatTableDataSource} from '@angular/material';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Constants} from '../../../../Utils/Constants';
import {ConstantRole} from "../../../../Utils/ConstantRole";
import {UserConnectedService} from "../../../../shared/service/user-connected.service";

@Component({
  selector: 'app-tz-ajout-profs',
  templateUrl: './tz-ajout-profs.component.html',
  styleUrls: ['./tz-ajout-profs.component.scss']
})
export class TzAjoutProfsComponent implements OnInit {
  loading: boolean;
  validatingForm: FormGroup;
  etudiant: User;
  hide = true;
  listProf: any[];
  roles: Role[];
  role: Role;
  classe: Classe;
  inscription: Inscription;
  listClasse: Classe[];
  displayedColumns: string[] = ['login', 'prenom', 'nom', 'role'];
  dataSource: MatTableDataSource<any>;
  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private userConnected:UserConnectedService) { }

  ngOnInit() {
    let role = this.getUserc();
    if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
      this.router.navigate(['/menu/not-found']);
    }

    this.reinit();
  }

  /**
   * Get user connecté
   */
  getUserc(){
    return this.userConnected.userConnected();
  }

  reinit() {
    this.etudiant = new User();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getConstant(etudiant: User) {
    etudiant.enabled = true;
    etudiant.role = Constants.TYPE_PROF;
  }

  search(prof: User) {
    this.loading = true;
    this.getConstant(prof);
    this.dataService.post(urlList.path_find_user, prof).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listProf = response.data.list;
        this.dataSource = new MatTableDataSource<any>(this.listProf);
      } else {
        this.listProf = [];
      }
      this.loading = false;
    });
  }
  goToAdd() {
    this.router.navigate(['/menu/user/edit/0/' + Constants.PROF]);
  }
}
