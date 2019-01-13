import {Component, OnInit,Inject, ViewChild} from '@angular/core';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Classe} from '../../../shared/model/Classe';
import {DataService} from '../../../shared/service/data.service';
import {User} from "../../../shared/model/User";
import {Role} from "../../../shared/model/Role";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {ExcelService} from "../../../shared/service/excel.service";
import {Angular5Csv} from "angular5-csv/Angular5-csv";
import * as jsPDF from '../../../../assets/jq/jspdf.min.js';
import html2canvas from 'html2canvas';
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";

@Component({
    selector: 'app-tz-profs',
    templateUrl: './tz-profs.component.html',
    styleUrls: ['./tz-profs.component.scss']
})
export class TzProfsComponent implements OnInit {
  etudiant: any[];
  admin: User[];
  utilisateur: User;
  listUtilisateur: any;
  roles: Role[];
  loading: boolean;
  profs: boolean;
  listProff:any[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'adresse', 'contact', 'email', 'action'];
  constructor(private dataService: DataService,
              private excelService: ExcelService,
              public dialog: MatDialog,
              private userConnected:UserConnectedService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    let role = this.getUserc();
    if(role.role_type.id === ConstantRole.PROFS){
      this.profs = true;
    }
    this.utilisateur = new User();
    this.getTypeRole();
    this.getListAdmin();
  }
  /**
   * Get user connecté
   */
  getUserc() {
    return this.userConnected.userConnected();
  }

  /**
   * Get roletype
   */
  getTypeRole() {
    this.loading = true;
    this.dataService.post(urlList.path_find_role).subscribe(response => {
      if (response.data.length != 0 && response.code === ConstantHTTP.CODE_SUCCESS){
        this.roles = response.data !== null ? response.data : [];
        console.log("roles" + this.roles);
        this.loading = false;
      }else {
        this.roles = response.data = [];
      }
    });
  }

  /**
   * Get profs listes
   */
  getListAdmin() {
    this.utilisateur.role = 1;
    this.loading = true;
    this.dataService.post(urlList.path_find_user, this.utilisateur).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.admin = response.data.list;
        this.dataSource = new MatTableDataSource<any>(this.admin);
        this.paginator.length = +response.data.total;
        this.paginator.pageSize = +this.utilisateur.limit;
        this.loading = false;
      }
    });
  }

  findUser() {
    this.utilisateur.page = this.paginator.pageIndex + 1;
    this.utilisateur.limit = this.paginator.pageSize;
    this.getListAdmin();
  }

  /**
   * Export
   */
  exportCsv(){
    new Angular5Csv(this.admin,'liste-profs');
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.admin, 'liste-profs');
  }

  exportPdf()
  {
    var data = document.getElementById('liste-profs');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('profs-liste.pdf');
    });
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
