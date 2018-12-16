import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../../../../shared/service/data.service';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import { urlList } from 'src/app/Utils/api/urlList';
import {Subject} from "rxjs";

@Component({
  selector: 'app-tz-list-profs',
  templateUrl: './tz-list-profs.component.html',
  styleUrls: ['./tz-list-profs.component.scss']
})
export class TzListProfsComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listProff = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
   /* this.getListProffesseurs().subscribe((response: any) => {
      this.dtTrigger.next();
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        response.data.forEach(element => {
          this.listProff.push({
            id: element.id,
            nom: element.nom
            // matiere: element.matiereId

          });
          console.log(this.listProff);
        });
      } else {
        console.log('Pas de proff');
      }
    });*/
  }

  getListProffesseurs() {
    return this.dataService.post(urlList.path_list_proffesseurs);
  }

}
