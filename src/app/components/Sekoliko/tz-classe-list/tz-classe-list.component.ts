import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { urlList } from 'src/app/Utils/api/urlList';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';

@Component({
  selector: 'app-tz-classe-list',
  templateUrl: './tz-classe-list.component.html',
  styleUrls: ['./tz-classe-list.component.scss']
})
export class TzClasseListComponent implements OnInit {

  listClasse = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getListClasse().subscribe((response: any) => {

      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        response.data.forEach(element => {

          this.listClasse.push({
            id: element.id,
            classe: element.classedesc

          });
          console.log(response.data);
        });

      }
    });
  }

  getListClasse() {

    return this.dataService.get(urlList.path_list_class);
  }

}
