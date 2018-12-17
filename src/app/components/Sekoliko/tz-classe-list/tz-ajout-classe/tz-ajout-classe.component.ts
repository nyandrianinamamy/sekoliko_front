import { Component, OnInit } from '@angular/core';
import {Classe} from "../../../../shared/model/Classe";
import {DataService} from "../../../../shared/service/data.service";
import {urlList} from "../../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../../Utils/ConstantHTTP";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-ajout-classe',
  templateUrl: './tz-ajout-classe.component.html',
  styleUrls: ['./tz-ajout-classe.component.scss']
})
export class TzAjoutClasseComponent implements OnInit {

  loading: boolean;
  classe : Classe;
  constructor(private dataService : DataService,private router:Router) { }

  ngOnInit() {
    this.classe = new Classe();
  }

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
