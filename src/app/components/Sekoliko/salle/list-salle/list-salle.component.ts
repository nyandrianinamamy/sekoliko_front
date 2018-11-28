import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.scss']
})
export class ListSalleComponent implements OnInit {

  salle: any;
  displayedColumns: string[] = ['salle', 'action'];
  dataSource: MatTableDataSource<any>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    /*this.dataService.get(urlList.path_list_salle + '/2').subscribe(response=> {
      console.log(response);
      this.salle = (response.code === ConstantHTTP.CODE_SUCCESS) ? response.data : null;
      this.dataSource = new MatTableDataSource<any>(this.salle);
      });*/
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
