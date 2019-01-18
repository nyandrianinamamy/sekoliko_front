import { Component, OnInit } from '@angular/core';
import {Classe} from "../../../../shared/model/Classe";
import {DataService} from "../../../../shared/service/data.service";
import {urlList} from "../../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../../Utils/ConstantHTTP";
import {Router} from "@angular/router";
import {UserConnectedService} from "../../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../../Utils/ConstantRole";

@Component({
  selector: 'app-tz-ajout-classe',
  templateUrl: './tz-ajout-classe.component.html',
  styleUrls: ['./tz-ajout-classe.component.scss']
})
export class TzAjoutClasseComponent implements OnInit {

  loading: boolean;
  classe : Classe;
  constructor(private dataService : DataService,private router:Router,private userConnected:UserConnectedService) { }

  ngOnInit() {
    this.classe = new Classe();

    let role = this.getUserc();
    if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
      this.router.navigate(['/menu/not-found']);
    }
  }

  /**
   * Get user connecté
   */
  getUserc(){
    return this.userConnected.userConnected();
  }

  /**
   *
   * @param classe
   */
  save(classe:Classe){
    this.loading = true;
    this.dataService.post(urlList.path_edit_class,classe).subscribe(response=>{
      if (response.code == ConstantHTTP.CODE_SUCCESS){
        this.loading = false;
        this.router.navigate(['/menu/list-classe']);
      }
    });
  }

}
