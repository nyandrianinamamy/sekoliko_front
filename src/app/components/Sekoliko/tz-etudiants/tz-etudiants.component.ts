import {Component, OnInit, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {DataService} from '../../../shared/service/data.service';
import {Router} from '@angular/router';
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";
import {User} from "../../../shared/model/User";
import {MatTableDataSource} from "@angular/material";
import {Inscription} from "../../../shared/model/Inscription";

@Component({
  selector: 'app-tz-etudiants',
  templateUrl: './tz-etudiants.component.html',
  styleUrls: ['./tz-etudiants.component.scss']
})

export class TzEtudiantsComponent implements OnInit {
  niveau = [];
  // lentgh = this.niveau.length;
  details = 'Cliquer pour voir details';
  loading: boolean;
  role:any;
  etudiant:User;
  inscription: any;
  user:any;

  constructor(private dataService: DataService,
              private router: Router,
              private userConnected: UserConnectedService) {
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  getUserConnected(){
   return this.userConnected.userConnected();
  }

  ngOnInit() {
    this.loading = true;
    let role = this.getUserConnected();
    if (role.role_type.id === ConstantRole.ETUDIANT){
      // this.router.navigate(['/menu/list-etudiant/1']);
      this.etudiant = new User();
      this.getListEtudiants(this.etudiant);
      this.getUserInsc().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          console.log(response.data[0])
          console.log(response.data[0].id_classe.id);
          let a = response.data[0].id_classe.id;
          this.router.navigate(['/menu/list-etudiant/'+a]);
        }
      });
    }


    this.getNiveau().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        console.log('responece of response: ', response);
        response.data.forEach(element => {
          this.niveau.push({
            id: element.id,
            nom: element.description
          });
        });
        this.loading = false;
      }
    });
  }

  /**
   * Fetch inscription liste
   */
  getUserInsc(){
    let role = this.getUserConnected();
    return this.dataService.post(urlList.path_list_etudiants,{userid:role.user_id});
  }

  /**
   * Fetch listes des utilisateurs
   * @param user
   */
  getListEtudiants(user: User) {
    this.loading = true;
    this.dataService.post(urlList.path_find_user, user).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.etudiant = response.data;
        console.log(this.etudiant)
      } else {
        console.log('verifieo le function aloha papie a :D ');
      }
    });
  }
  /**
   * Check classe efant
   * @param id
   */
  checkEnfant(id: number) {
    this.router.navigate(['/menu/classe/' + id]);
  }
}
