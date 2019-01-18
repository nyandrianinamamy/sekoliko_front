import {Component, OnInit} from '@angular/core';
import {MatiereParam} from '../../../../shared/model/MatiereParam';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Classe} from '../../../../shared/model/Classe';
import {Profs} from '../../../../shared/model/Profs';
import {ActivatedRoute, Router} from '@angular/router';
import {isNull} from 'util';
import {User} from '../../../../shared/model/User';
import {ConstantRole} from "../../../../Utils/ConstantRole";
import {UserConnectedService} from "../../../../shared/service/user-connected.service";

@Component({
  selector: 'app-tz-ajout-matiere',
  templateUrl: './tz-ajout-matiere.component.html',
  styleUrls: ['./tz-ajout-matiere.component.scss']
})
export class TzAjoutMatiereComponent implements OnInit {

  matiere: MatiereParam[];
  _matiere: MatiereParam;
  classe: Classe[];
  idMatiere: number;
  listProff: User[];
  loading: boolean;
  class: '';
  update:boolean;

  constructor(private dataService: DataService,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private userConnected:UserConnectedService) {
  }

  /**
   * Fetch classe listes
   */
  getListClasse() {
    this.loading = true;
    this.getNiveau().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.classe = response.data;
        this.loading = false;
      }
    });
  }

  /**
   * Fetch profs listes
   */
  getListProf() {
    this.loading = true;
    this.getListProffesseurs().subscribe((response: any) => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listProff = response.data.list;
        this.loading = false;
      }
    });
  }

  /**
   * Get user connecté
   */
  getUserc(){
    return this.userConnected.userConnected();
  }

  ngOnInit() {
    let role = this.getUserc();
    if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
      this.router.navigate(['/menu/not-found']);
    }

    this._matiere = new MatiereParam();
    this.idMatiere = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
    if (!isNull(this.idMatiere) && typeof this.idMatiere === 'number') {
      this.getMatiereById(this.idMatiere);
      this.update = true;
    } else {
      this.update = false;
    }
    this.getListClasse();
    this.getListProf();
  }

  /**
   * Fetch matiere par id
   * @param id
   */
  getMatiereById(id: number) {
    this.dataService.get(urlList.path_list_matiere + '/' + id).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this._matiere.nom = response.data.description;
        this._matiere.coeff = response.data.coefficient;
        this._matiere.class = response.data.classe.id;
        this._matiere.prof = response.data.profId.user_id;
      } else {
        this._matiere = new MatiereParam();
      }
    });
  }

  /**
   * Fetch niveau
   */
  getNiveau() {
    return this.dataService.post(urlList.path_list_classe);
  }

  /**
   * Fetch profs listes
   */
  getListProffesseurs() {
    return this.dataService.post(urlList.path_find_user, {role: 1});
  }

  /**
   * Ajouter un matiere
   * @param _matiere
   */
  save(_matiere: MatiereParam) {
    this.loading = true;
    if (this.update) {
      this.dataService.post(urlList.path_add_matiere + '/' + this.idMatiere, _matiere).subscribe((response) => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.loading = false;
          this.router.navigate(['/menu/list-classe-eft']);
        }
      });
    } else {
      this.dataService.post(urlList.path_add_matiere, _matiere).subscribe((response) => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.loading = false
          this.router.navigate(['/menu/list-classe-eft']);
        }
      });
    }
  }


}
