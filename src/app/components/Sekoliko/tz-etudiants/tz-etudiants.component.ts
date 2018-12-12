import {Component, OnInit, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {DataService} from "../../../shared/service/data.service";

@Component({
    selector: 'app-tz-etudiants',
    templateUrl: './tz-etudiants.component.html',
    styleUrls: ['./tz-etudiants.component.scss']
})
export class TzEtudiantsComponent implements OnInit {
    niveau = [];
    details = 'Cliquer pour voir details';

    constructor(private dataService:DataService) {
    }

    getNiveau() {
        return this.dataService.get(urlList.path_list_class);
    }

    ngOnInit() {
        this.getNiveau().subscribe((response: any) => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
                response.data.forEach(element => {
                    this.niveau.push({
                        id: element.id,
                        nom:element.nomClasse
                    });
                });
            }
        });
    }

}
