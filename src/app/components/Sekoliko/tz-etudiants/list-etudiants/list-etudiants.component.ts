import {Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../../shared/service/data.service';
import {Etudiants} from '../../../../shared/model/Etudiants';
import {urlList} from 'src/app/Utils/api/urlList';
import {ConstantHTTP} from 'src/app/Utils/ConstantHTTP';
import {Subject} from 'rxjs';
import {User} from '../../../../shared/model/User';
import {Inscription} from '../../../../shared/model/Inscription';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EtudiantUpdateComponent} from '../etudiant-update/etudiant-update.component';
import {Angular5Csv} from "angular5-csv/Angular5-csv";
import {ExcelService} from "../../../../shared/service/excel.service";
import * as jsPDF from '../../../../../assets/jq/jspdf.min.js';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent implements OnInit {
  etudiant: any[];
  mobile = false;
  mobileClass = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'age', 'adresse', 'contact', 'sexe', 'email', 'action'];
  inscription: Inscription;
  listEtudiants = [];
  idClasseEnfant: number;
  dtOptions: DataTables.Settings = {};
  loading: boolean;
  dtTrigger: Subject<any> = new Subject();
  constructor(private dataService: DataService,
              private currentRoute: ActivatedRoute,
              private dialog: MatDialog,
              private excelService: ExcelService,
              private router: Router) {

  }
  ngOnInit() {
    if (window.screen.width >= 600) {
      this.mobileClass = "text-center";
    }else {
      this.mobileClass = "d-none";
    }
    this.idClasseEnfant = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    this.loading = true;
    this.getListEtudiants(this.idClasseEnfant).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.etudiant = response.data;
        this.dataSource = new MatTableDataSource<any>(this.etudiant);
      }
    });
  }
  addNote(idInscription: number, idClasse: number, inscription: string) {
    this.router.navigate(['/menu/note/' + idInscription + '/' + idClasse], { queryParams: {etudiant: inscription}});
  }
  getListEtudiants(classe: number) {
    return this.dataService.post(urlList.path_list_etudiants, {idclasse: classe, list: 'liste'});
  }
  openPopUpd(etudiant: User) {
    const openPopUp = this.dialog.open(EtudiantUpdateComponent, {
      data: etudiant
    });
    openPopUp.afterClosed().subscribe(response => {
      if (response === 1) {
      }
    });
  }
  /**
   * Touche pas
   */
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  /**
   * Export
   */
  exportCsv(){
    new Angular5Csv(this.etudiant,'liste_classe');
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.etudiant, 'etudiantListe');
  }

  exportPdf()
  {
    var data = document.getElementById('etudiantListe');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('etudiant-liste.pdf');
    });
  }

}
