import { Component, OnInit } from '@angular/core';
import {MatiereParam} from "../../../../shared/model/MatiereParam";
import {DataService} from "../../../../shared/service/data.service";
import {urlList} from "../../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../../Utils/ConstantHTTP";
import {Classe} from "../../../../shared/model/Classe";
import {Profs} from "../../../../shared/model/Profs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-ajout-matiere',
  templateUrl: './tz-ajout-matiere.component.html',
  styleUrls: ['./tz-ajout-matiere.component.scss']
})
export class TzAjoutMatiereComponent implements OnInit {

  matiere:MatiereParam;
  classe : Classe;
  listProff : Profs;
  loading:boolean;
  class:'';

  constructor(private dataService:DataService,private router:Router) {}

  ngOnInit() {
    this.matiere = new MatiereParam();
    this.getNiveau().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        console.log(response.data)
        this.classe = response.data;
      }
    });

    this.getListProffesseurs().subscribe((response: any) => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listProff = response.data;
      }
    });
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  getListProffesseurs() {
    return this.dataService.post(urlList.path_list_proffesseurs);
  }

  save(matiere:MatiereParam){
    console.log("eto");
    return this.dataService.post(urlList.path_add_matiere,matiere).subscribe(response => {
      if (response.code == ConstantHTTP.CODE_SUCCESS) {
        console.log("poinsa");
        this.router.navigate(['/menu/matiere-list']);
      }
    })
  }


}
