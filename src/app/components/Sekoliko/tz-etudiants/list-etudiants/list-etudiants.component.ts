import {Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../../../../shared/service/data.service';
import { Etudiants } from '../../../../shared/model/Etudiants';
import { urlList } from 'src/app/Utils/api/urlList';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';

@Component({
    selector: 'app-list-etudiants',
    templateUrl: './list-etudiants.component.html',
    styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent implements OnInit {

    listEtudiants = [];

    constructor(private dataService: DataService) {
    }


    ngOnInit() {
      this.getListEtudiants().subscribe((response: any) => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          response.data.forEach(element => {
             this.listEtudiants.push({
              id: (element.id).toString(),
              nom: element.non,
              age: element.age,
              sexe: element.sexe,
              adresse: element.adr
             });
             console.log(response.data);
          });
        } else {
          console.log('Pas de donnée');
        }
      });
    }

    getListEtudiants() {
      return this.dataService.get(urlList.path_list_etudiants);
    }
}
