import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {Classe} from '../../../../shared/model/Classe';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Subject} from "rxjs";

@Component({
    selector: 'app-tz-classe',
    templateUrl: './tz-classe.component.html',
    styleUrls: ['./tz-classe.component.scss']
})
export class TzClasseComponent implements OnInit {

    details = 'Cliquer pour voir les details';
    idClasse: number;
    classe: Classe[];
    loading: boolean;
    constructor(private currentRoute: ActivatedRoute,
                private dataService: DataService,
                private router: Router
                ) {
    }

    ngOnInit() {
      this.idClasse = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
      this.checkEnfantClasse(this.idClasse);
    }

    checkEnfantClasse(parentId: number) {
      this.loading = true;
      this.dataService.post(urlList.path_list_class_enfant, {parent: parentId}).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.classe = response.data;
          this.loading = false;
        }
      });
    }
    checkListEtudiant(idClasse: number) {
      this.router.navigate(['/menu/list-etudiant/' + idClasse]);
    }
}
