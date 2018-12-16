import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { urlList } from 'src/app/Utils/api/urlList';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import {ActivatedRoute, Router} from '@angular/router';
import {Classe} from '../../../shared/model/Classe';
import {Subject} from "rxjs";

@Component({
  selector: 'app-tz-classe-list',
  templateUrl: './tz-classe-list.component.html',
  styleUrls: ['./tz-classe-list.component.scss']
})
export class TzClasseListComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  niveau = [];
  // lentgh = this.niveau.length;
  details = 'Cliquer pour voir details';
  loading: boolean;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  ngOnInit() {
    this.loading = true;
    this.getNiveau().subscribe(response => {
      this.dtTrigger.next();
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        console.log('responece of response: ', response);
        response.data.forEach(element => {
          this.niveau.push({
            description: element.description
          });
        });
        this.loading = false;
      }
    });
  }
}
