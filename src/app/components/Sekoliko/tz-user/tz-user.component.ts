import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/service/data.service';
import {User} from '../../../shared/model/User';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Classe} from '../../../shared/model/Classe';
import {Inscription} from '../../../shared/model/Inscription';
import {urlList} from '../../../Utils/api/urlList';
import {Role} from '../../../shared/model/Role';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {b} from '@angular/core/src/render3';

@Component({
  selector: 'app-tz-user',
  templateUrl: './tz-user.component.html',
  styleUrls: ['./tz-user.component.scss']
})
export class TzUserComponent implements OnInit {
  validatingForm: FormGroup;
  loading: boolean;
  etudiant: User;
  hide = true;
  roles: Role[];
  role: Role;
  classe: Classe;
  inscription: Inscription;
  listClasse: Classe[];

  constructor(private fb: FormBuilder,
              private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.etudiant = new User();
    this.classe = new Classe();
    this.getListClasse();
    this.getTypeRole();
  }

  getListClasse() {
    this.loading = true;
    this.dataService.post(urlList.path_list_classe).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listClasse = response.data;
        this.loading = false;
      }
    });
  }
  getTypeRole() {
    this.loading = true;
    this.dataService.post(urlList.path_find_role).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.roles = response.data !== null ? response.data : [];
        this.loading = false;
      }
    });
  }
  push(etudiant: User) {
    this.loading = true;
    etudiant.enabled = true;
    this.dataService.post(urlList.path_user_find, etudiant).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
      }
    });

  }
}
