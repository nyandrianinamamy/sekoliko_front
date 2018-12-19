import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Salle} from '../../../shared/model/Salle';

@Component({
  selector: 'app-tz-salle',
  templateUrl: './tz-salle.component.html',
  styleUrls: ['./tz-salle.component.scss']
})
export class TzSalleComponent implements OnInit {

  listSalle: Salle[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getListSalle();
  }
  getListSalle() {
    this.dataService.post(urlList.path_list_salle).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listSalle = response.data;
      }
    })
  }
}
