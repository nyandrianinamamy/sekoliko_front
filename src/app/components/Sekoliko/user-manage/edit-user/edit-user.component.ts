import { Component, OnInit } from '@angular/core';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {DataService} from '../../../../shared/service/data.service';
import {Role} from '../../../../shared/model/Role';
import {User} from '../../../../shared/model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants} from '../../../../Utils/Constants';
import {MenuItems} from "../../../../shared/menu-items/menu-items";
import {ConstantRole} from "../../../../Utils/ConstantRole";
import {UserConnectedService} from "../../../../shared/service/user-connected.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  loading: boolean;
  hide: boolean;
  roles: any;
  typeId: number;
  haveType: boolean;
  updateAction: boolean;
  superadmin:boolean;
  role:any;
  etudiant: User;
  userId: number;
  constructor(private dataService: DataService,
              private currentRoute: ActivatedRoute,
              private router: Router,
              private menuItems:MenuItems,
              private userConnected:UserConnectedService) { }

  ngOnInit() {
    let role = this.getUserc();
    if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
      this.router.navigate(['/menu/not-found']);
    }

    this.userId = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
    this.typeId = this.currentRoute.snapshot.paramMap.get('type') ? +this.currentRoute.snapshot.paramMap.get('type') : null;
    this.etudiant = new User();

    if(role.role_type.id == ConstantRole.ETUDIANT){
      this.haveType = true;
      if(this.userId != role.user_id){
        this.router.navigate(['/menu/not-found'])
      }
    }else {
      this.haveType = false;
    }

    if (typeof this.typeId  === 'number' &&   this.typeId  > 0) {
      this.haveType = true;
      this.etudiant.role = this.typeId;
    }
    if (typeof  this.userId  === 'number' &&  this.userId  > 0) {
      this.getUserById(this.userId);
      this.updateAction = true;
    } else {
      this.updateAction = false;
    }
    this.getTypeRole();
  }

  /**
   * Get user connecté
   */
  getUserc(){
    return this.userConnected.userConnected();
  }

  /**
   * Fetch current user
   * @param id
   */
  getUserById(id: number) {
    this.loading = true;
    this.dataService.get(urlList.path_find_user + '/' + id).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.etudiant = response.data;
        this.etudiant.role = response.data.role_type.id;
      } else {
        window.alert('user not fond');
      }
      this.loading = false;
    });
  }


  /**
   * Fetch role type
   */
  getTypeRole() {
    this.loading = true;
    let role = this.getUserc();
    if (role.role_type.id !== ConstantRole.SUPERADMIN){
      this.dataService.post(urlList.path_find_role).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.roles = response.data !== null ? response.data : [];
          this.roles.splice(4, 1);
        }
      });
    }else {
      this.dataService.post(urlList.path_find_role).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.roles = response.data !== null ? response.data : [];
          this.loading = false;
        }
      });
    }
    this.loading = false;
  }

  /**
   * Nouveau utilisateur
   * @param etudiant
   */
  ajouter(etudiant: User) {
    this.loading = true;
    if (this.updateAction) {
      this.dataService.post(urlList.path_user_find + '/' + this.userId, etudiant).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          window.alert(response.message);
          this.loading = false;
          this.router.navigate(['/menu/user/list']);
        }
      });
    } else {
      this.dataService.post(urlList.path_user_find, etudiant).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
         window.alert(response.message)
          this.router.navigate(['/menu/user/list']);
        }
        if (this.haveType) {
          switch (this.typeId) {
            case Constants.ETUDIANT:
              this.router.navigate(['/menu/inscription/' + response.data.id]);
              break;
            case Constants.PROF:
              this.router.navigate(['/menu/fonction/' + response.data.id]);
              break;
          }
        } else {
          this.router.navigate(['/menu/user/list']);
        }
        this.loading = false;
      });
    }
  }
}
