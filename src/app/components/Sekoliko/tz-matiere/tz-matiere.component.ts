import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {ActivatedRoute, Router} from '@angular/router';
import {MatiereParam} from '../../../shared/model/MatiereParam';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';
import {Classe} from '../../../shared/model/Classe';
import * as jsPDF from "../../../../assets/jq/jspdf.min";
import {ExcelService} from "../../../shared/service/excel.service";
import html2canvas from 'html2canvas'
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";

@Component({
  selector: 'app-tz-matiere',
  templateUrl: './tz-matiere.component.html',
  styleUrls: ['./tz-matiere.component.scss']
})

export class TzMatiereComponent implements OnInit {

  listMatiere: MatiereParam[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  matiereCreate: MatiereParam;

  /**
   * Table
   */
  displayedColumns: string[] = ['nom', 'coefficient', 'class', 'prof', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading: boolean;
  id: number;
  nom: string;
  coeff: number;
  class: number;
  idClasseEnfant: number;
  matiere: number;
  listClasse: Classe[];
  listMatier = [];
  etudiant:boolean;
  idClasse:number;
  href:any;
  classes:number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private excelService: ExcelService,
    private currentRoute: ActivatedRoute,
    private userConnected : UserConnectedService) {
  }

  ngOnInit() {
    this.matiereCreate = new MatiereParam();
    this.loading = true;

    let user = this.getUserConnected();
    if(user.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant = true;
      this.displayedColumns = ['nom', 'coefficient', 'prof'];
      this.getUserInsc().subscribe(response => {
        if(response.code === ConstantHTTP.CODE_SUCCESS){
          this.href = this.currentRoute.snapshot.paramMap.get('id');
          this.idClasse = response.data[0].id_classe.id;
          if (this.href != this.idClasse) {
            this.router.navigate(['/menu/not-found']);
          }
          this.getAllMatiere(this.idClasse);
        }
      });
    }else{
      this.getMatiere().subscribe((response: any) => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.loading = false;
          this.listMatiere = response.data;
          this.dataSource = new MatTableDataSource<any>(this.listMatiere);
          this.dataSource.paginator = this.paginator;
          this.dtTrigger.next();
        }
      });
    }
  }

  /**
   * get user connected
   */
  getUserConnected(){
    return this.userConnected.userConnected();
  }

  /**
   * Fetch matiere listes
   */

  getUserInsc(){
    let role = this.getUserConnected();
    return this.dataService.post(urlList.path_list_etudiants,{userid:role.user_id});
  }

  getMatiere() {
    this.idClasseEnfant = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    return this.dataService.post(urlList.path_list_matiere,{class: this.idClasseEnfant});
  }

  getAllMatiere(idClass: number) {
    this.loading = true;
    this.dataService.post(urlList.path_list_matiere, {class: idClass}).subscribe(response => {
      this.listMatier = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
      this.dataSource = new MatTableDataSource<any>(this.listMatier);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
      console.log(this.listMatier);
    });
  }

  /**
   * supprimer un matiere
   * @param id
   */
  deleteMatiere(id: number) {
    console.log('la valeur de l id de la matiere est de :', id);
    this.loading = true;
    return this.dataService.post(urlList.path_delete_matiere + id).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        window.alert(response.message);
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/menu/matiere-list']));
        this.loading = false;
      }
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

  /**
   * All export
   * Touch it if you want to debug this one year
   */
  exportCsv() {
    new Angular5Csv(this.listMatiere, 'liste_matiere');
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.listMatiere, 'matierelListe');
  }

  exportPdf()
  {
    var data = document.getElementById('matiereListe');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('matiere-liste.pdf');
    });
  }
}
