import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../../shared/service/data.service";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {AnneeScolaire} from "../../../shared/model/AnneeScolaire";

@Component({
  selector: 'app-tz-anne-scolaire',
  templateUrl: './tz-anne-scolaire.component.html',
  styleUrls: ['./tz-anne-scolaire.component.scss']
})
export class TzAnneScolaireComponent implements OnInit {

  anneScolaire:AnneeScolaire[];
  loading:boolean;
  /**
   * Table
   */
  displayedColumns: string[] = ['id', 'debut', 'fin'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.loading = true;
    this.getAnneScolaire().subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS){
        this.anneScolaire = response.data;
        console.log(this.anneScolaire);
        this.dataSource = new MatTableDataSource<any>(this.anneScolaire);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      }
    })
  }

  getAnneScolaire(){
    return this.dataService.get(urlList.path_anne_list);
  }
}
