import {Component, OnInit} from '@angular/core';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Classe} from '../../../shared/model/Classe';
import {DataService} from '../../../shared/service/data.service';

@Component({
    selector: 'app-tz-profs',
    templateUrl: './tz-profs.component.html',
    styleUrls: ['./tz-profs.component.scss']
})
export class TzProfsComponent implements OnInit {
    details = 'Cliquer pour voir les details';
  listClasse = [];
  classe: Classe[];
  loading: boolean;
    constructor(private dataService: DataService) {
    }

    ngOnInit() {
      this.checkEnfantClasse();
    }
  checkEnfantClasse() {
    this.loading = true;
    this.dataService.post(urlList.path_list_class_enfant).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.classe = response.data;
        this.loading = false;
      }
    });
  }
}
