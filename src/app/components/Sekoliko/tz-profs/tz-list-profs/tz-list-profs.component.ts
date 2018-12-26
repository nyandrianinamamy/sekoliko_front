import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../../../../shared/service/data.service';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import { urlList } from 'src/app/Utils/api/urlList';
import {Subject} from "rxjs";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Profs} from '../../../../shared/model/Profs';

@Component({
  selector: 'app-tz-list-profs',
  templateUrl: './tz-list-profs.component.html',
  styleUrls: ['./tz-list-profs.component.scss']
})
export class TzListProfsComponent implements OnInit {

  /**
   * Table
   */
  displayedColumns: string[] = ['nom', 'coefficient', 'class', 'prof', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading: boolean;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  listProff = [];
  _listProff : Profs[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getListProffesseurs().subscribe((response: any) => {
      this.dtTrigger.next();
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this._listProff = response.data;
        console.log(this._listProff);
        this.dataSource = new MatTableDataSource<any>(this._listProff);
        response.data.forEach(element => {
          this.listProff.push({
            id: element.id,
            nom: element.nom}
            );
          console.log(this.listProff);
        });
      } else {
        console.log('Pas de proff');
      }
    });
  }

  getListProffesseurs() {
    return this.dataService.post(urlList.path_list_proffesseurs);
  }

}
