import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../shared/service/data.service";

@Component({
  selector: 'app-tz-salle',
  templateUrl: './tz-salle.component.html',
  styleUrls: ['./tz-salle.component.scss']
})
export class TzSalleComponent implements OnInit {

  paginators: Array<any> = [];
  url: any = 'https://www.techzara.org/sekoliko-api/api/listEtd';

  constructor(private data: DataService) {
  }

  getData() {
    return this.data.get(this.url);
  }

  ngOnInit() {
    this.getData().subscribe((response:any) => {
      var a = response.data;
      console.log(a);
    })
  }
}
