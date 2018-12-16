import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { urlList } from 'src/app/Utils/api/urlList';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import {ActivatedRoute} from '@angular/router';
import {Classe} from '../../../shared/model/Classe';

@Component({
  selector: 'app-tz-classe-list',
  templateUrl: './tz-classe-list.component.html',
  styleUrls: ['./tz-classe-list.component.scss']
})
export class TzClasseListComponent implements OnInit {

  listClasse = [];
  idClasse: number;
  classe: Classe[];
  constructor(private dataService: DataService,
              private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idClasse = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
    this.checkEnfantClasse(this.idClasse);
  }

  checkEnfantClasse(parentId: number) {
    this.dataService.post(urlList.path_list_class_enfant, {parentId: parent}).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.classe = response.data;
      }
    });
  }
}
