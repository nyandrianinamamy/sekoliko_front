import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import {User} from '../../../../shared/model/User';
import {Role} from '../../../../shared/model/Role';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {DataService} from '../../../../shared/service/data.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Angular5Csv} from "angular5-csv/Angular5-csv";
import {ExcelService} from "../../../../shared/service/excel.service";
import * as jsPDF from '../../../../../assets/jq/jspdf.min.js';
// import * as jspdf from 'jspdf/dist/jspdf.min.js';
// console.log(jsPDF);
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  etudiant: any[];
  utilisateur: User;
  listUtilisateur: any;
  roles: Role[];
  loading: boolean;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'age', 'adresse', 'contact', 'email', 'action'];
  constructor(private dataService: DataService,
              private excelService:ExcelService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.utilisateur = new User();
    this.getTypeRole();
    this.getListEtudiants(this.utilisateur);
    console.log(this.utilisateur)
  }

  /**
   * Fetch role type
   */
  getTypeRole() {
    this.loading = true;
    this.dataService.post(urlList.path_find_role).subscribe(response => {
      if (response.data.length != 0 && response.code === ConstantHTTP.CODE_SUCCESS){
        this.roles = response.data !== null ? response.data : [];
        this.loading = false;
      }else {
        this.roles = response.data = [];
      }
    });
  }

  /**
   * Fetch listes des utilisateurs
   * @param utilisateur
   */
  getListEtudiants(utilisateur: User) {
    this.loading = true;
    this.dataService.post(urlList.path_find_user, utilisateur).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.paginator.length = +response.data.total;
        this.paginator.pageSize = +this.utilisateur.limit;
        this.etudiant = response.data.list;
        console.log(this.etudiant)
        this.dataSource = new MatTableDataSource<any>(this.etudiant);
        this.loading = false;
      } else {
        console.log('verifieo le function aloha papie a :D ');
      }
    });
  }

  /**
   * find user
   */
  findUser() {
    this.utilisateur.page = this.paginator.pageIndex + 1;
    this.utilisateur.limit = this.paginator.pageSize;
    this.getListEtudiants(this.utilisateur);
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

  /**
   * Export table
   */
  exportCsv() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'liste utilisateur',
      useBom: true,
      noDownload: true,
      headers: ["Nom", "Prenom", "ID"]
    };
    new Angular5Csv(this.etudiant,'liste_utilisateur',options);
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.etudiant, 'userliste');
  }

  exportPdf()
  {
    var data = document.getElementById('userListe');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('user-liste.pdf');
    });
  }
}
