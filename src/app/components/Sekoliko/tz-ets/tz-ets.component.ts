import {Component, OnInit, ViewChild} from '@angular/core';
import {ConstantRole} from "../../../Utils/ConstantRole";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {DataService} from "../../../shared/service/data.service";
import {urlList} from "../../../Utils/api/urlList";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-tz-ets',
  templateUrl: './tz-ets.component.html',
  styleUrls: ['./tz-ets.component.scss']
})
export class TzEtsComponent implements OnInit {

  superadmin:boolean;
  listEts:any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['matricule', 'nom','action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
      private userConnected:UserConnectedService,
      private dataService:DataService) { }

  ngOnInit() {
    let role = this.getUserConnected();
    if (role.role_type.id === ConstantRole.SUPERADMIN){
      this.getEts().subscribe(response =>{
        console.log(response.data);
        if (response.code === ConstantHTTP.CODE_SUCCESS){
          this.superadmin = true;
          this.listEts = response.data;
          console.log(this.listEts);
          this.dataSource = new MatTableDataSource<any>(this.listEts);
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

  /**
   * Get user connected
   */
  getUserConnected(){
    return this.userConnected.userConnected();
  }

  /**
   * Fetch ets liste
   */
  getEts(){
    return this.dataService.post(urlList.path_ets);
  }

  /**
   * Table filter
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    // @ts-ignore
    if (this.dataSource.filteredData === 0) {
      // @ts-ignore
      console.log('null');
    }
  }
}
