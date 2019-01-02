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
import {UserConnectedService} from "../../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../../Utils/ConstantRole";
import {MobileService} from "../../../../shared/service/mobile.service";

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent implements OnInit {
  etudiant: any[];
  pdf:boolean;
  mobile : boolean;
  mobileClass = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['matricule', 'nom', 'prenom', 'age', 'adresse', 'contact', 'sexe', 'action'];
  inscription: Inscription;
  listEtudiants = [];
  idClasseEnfant: number;
  dtOptions: DataTables.Settings = {};
  loading: boolean;
  etudiant_user:boolean;
  idInscription: number;
  idClasse: number;
  inscriptionUser: string;
  dtTrigger: Subject<any> = new Subject();
  constructor(private dataService: DataService,
              private currentRoute: ActivatedRoute,
              private dialog: MatDialog,
              private excelService: ExcelService,
              private router: Router,
              private userConnected:UserConnectedService,
  ) {}

  ngOnInit() {

    let role = this.getUserConnected();
    if(role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant_user = true;
      if (window.screen.width >= 600) {
        this.displayedColumns = ['matricule', 'nom', 'prenom', 'age', 'adresse', 'contact', 'sexe'];
      }else {
        this.mobile = true;
        this.displayedColumns = [ 'nom', 'prenom'];
      }
      this.idClasseEnfant = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
      this.loading = true;
      this.getListEtudiants(this.idClasseEnfant).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.loading = false;
          this.etudiant = response.data;
          this.dataSource = new MatTableDataSource<any>(this.etudiant);
          this.dataSource.paginator = this.paginator;
        }
      });
    }else{
      if (window.screen.width >= 600) {
        this.mobileClass = "";
      }else {
        this.mobile = true;
        this.displayedColumns = [ 'nom', 'prenom', 'action'];
      }
      this.idClasseEnfant = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
      this.loading = true;
      this.getListEtudiants(this.idClasseEnfant).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.loading = false;
          this.etudiant = response.data;
          this.dataSource = new MatTableDataSource<any>(this.etudiant);
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

  /**
   * Note etudiant
   */
  voirNote(){
    this.getUserInsc().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
         this.idInscription = response.data[0].NumInscription
         this.idClasse = response.data[0].id_classe.id;
         this.inscriptionUser = response.data[0].user_id.user_id;
        this.router.navigate(['/menu/note/' + this.idInscription + '/' + this.idClasse], { queryParams: {etudiant: this.inscriptionUser}});
      }
    });
  }

  /**
   * Ajout note
   * @param idInscription
   * @param idClasse
   * @param inscription
   */
  addNote(idInscription: number, idClasse: number, inscription: string) {
    this.router.navigate(['/menu/note/' + idInscription + '/' + idClasse], { queryParams: {etudiant: inscription}});
  }

  /**
   * Fetch etudiant liste
   * @param classe
   */
  getListEtudiants(classe: number) {
    return this.dataService.post(urlList.path_list_etudiants, {idclasse: classe, list: 'liste'});
  }

  /**
   * retour
   */
  retour(){
    this.router.navigate(['/menu/etudiant'])
  }


  /**
   * Fetch inscription liste
   */
  getUserInsc(){
    let role = this.getUserConnected();
    return this.dataService.post(urlList.path_list_etudiants,{userid:role.user_id});
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

  getUserConnected(){
    return this.userConnected.userConnected();
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
      console.log("oui")
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
