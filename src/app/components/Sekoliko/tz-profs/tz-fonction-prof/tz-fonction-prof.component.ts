import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../../shared/service/data.service';
import {until} from 'selenium-webdriver';
import urlContains = until.urlContains;
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Classe} from '../../../../shared/model/Classe';
import {MatiereParam} from "../../../../../../../skbcf/src/app/shared/model/MatiereParam";

@Component({
  selector: 'app-tz-fonction-prof',
  templateUrl: './tz-fonction-prof.component.html',
  styleUrls: ['./tz-fonction-prof.component.scss']
})
export class TzFonctionProfComponent implements OnInit {
  idProf: number;
  loading: boolean;
  listClasse: Classe[];
  listMatiere: MatiereParam;
  constructor(private currentRoute: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.idProf = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
    this.getAllClasse();
    this.getAllMatiere();
  }
  getAllClasse() {
    this.dataService.post(urlList.path_list_class_enfant).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listClasse = response.data;
      }
    });
  }
  getAllMatiere(){
    this.loading = true
    this.dataService.post(urlList.path_list_matiere).subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS){
        this.listMatiere = response.data;
        console.log(this.listMatiere);
        this.loading = false
      }
    })
  }
}
