import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Subject} from 'rxjs';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';
import {Salle} from '../../../shared/model/Salle';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';
import {ClasseEnfant} from '../../../shared/model/ClasseEnfant';
import {Classe} from '../../../shared/model/Classe';
import {TzAjoutSalleComponent} from './tz-ajout-salle/tz-ajout-salle.component';
import * as jsPDF from "../../../../assets/jq/jspdf.min";
import {ExcelService} from "../../../shared/service/excel.service";
import html2canvas from 'html2canvas';
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";

@Component({
  selector: 'app-tz-salle',
  templateUrl: './tz-salle.component.html',
  styleUrls: ['./tz-salle.component.scss']
})


export class TzSalleComponent implements OnInit {

  _salle: any[];
  listSalleLibre: any[];
  reservation: Salle;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loading: boolean;
  salle: Salle;
  niveau: Classe[];
  classe_enfant: ClasseEnfant[];
  public description: string;
  public dateDebut: Date;
  public dateFin: Date;
  public classe: string;
  etudiant : boolean;
  profs:boolean;
  dateok:boolean;
  error:any={isError:false,errorMessage:''};

  /**
   * Table
   */
  displayedColumns: string[] = ['id', 'nom', 'debut', 'fin', 'classe', 'action' ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private dataService: DataService,
              private router: Router,
              public dialog: MatDialog,
              private excelService: ExcelService,
              private userConnected: UserConnectedService
  ) {
  }

  ngOnInit() {

    /**
     * Table
     */
    this.listSalleLibre = [];
    this.reservation = new Salle();
    this.salle = new Salle();
    this.getListSalleLibre();
    this.loading = true;
    let role = this.getUserConnected();
    if(role.role_type.id === ConstantRole.PROFS){
      this.profs = true;
    }
    if (role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant = true;
      this.displayedColumns  = ['id', 'nom', 'debut', 'fin', 'classe'];
    }
    this.getClasseEnfant().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.classe_enfant = response.data;
      }
    });
    this.getNiveau().subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.niveau = response.data;
      }
    });
    this.getListSalle().subscribe((data: any) => {
      if (data.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.salle = data.data;
        this._salle = data.data;
        this.dataSource = new MatTableDataSource<any>(this._salle);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  /**
   * Get user connected
   */
  getUserConnected(){
    return this.userConnected.userConnected();
  }

  /**
   * Compare date
   */
  compareTwoDates(){
    console.log(this.reservation.dateDebut);
    if(new Date(this.reservation.dateFin) < new Date(this.reservation.dateDebut)){
      this.error={isError:true,errorMessage:'End Date can\'t before start date'};
      }else{
        this.error.isError = false;
      }
    }

    /**
   * Function list , edit , delete , Modifiable
   */
  getListSalle() {
    return this.dataService.post(urlList.path_list_salle);
  }

  /**
   * Fetch liste salle libre
   */
  getListSalleLibre() {
    this.dataService.post(urlList.path_list_salle, {occupation: false}).subscribe(response => {
      this.listSalleLibre = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
    });
  }

  /**
   * Supprimer un salle
   * @param id
   */
  deleteSalle(id: number) {
    this.loading = true;
    return this.dataService.post(urlList.path_delete_salle + id).subscribe(response => {
      if (response.code == ConstantHTTP.CODE_SUCCESS) {
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/menu/salle']));
        this.loading = false;
      }
    });
  }

  /**
   * Modifier salle
   * @param id
   */
  editSalle( id: number) {
    this.loading = true;
    this.dataService.post(urlList.path_mod_salle + id, {
      'description': this.description
    }).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/menu/salle']));
        this.loading = false;
      }
    });
  }

  /**
   * Réserver un salle
   */
  reservations() {
    this.loading = true;
    this.dataService.post(urlList.path_reservation_salle + this.reservation.id, this.reservation).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/menu/salle']));
        this.reservation.occupation = true;
        this.loading = false;
      }
    });
  }

  /**
   * Fetch liste classe enfant
   */
  getClasseEnfant() {
    return this.dataService.post(urlList.path_list_class_enfant);
  }

  /**
   * Fetch liste niveau
   */
  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  /**
   * Ajouter un salle
   * @param salle
   */
  saveSalle(salle: Salle) {
    console.log('la valeur de recherche de salle est de :')
    this.loading = true;
    this.dataService.post(urlList.path_edit_salle, salle).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/menu/salle']));
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TzAjoutSalleComponent);
    dialogRef.afterClosed().subscribe(() => {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.ngOnInit();
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
   */
  exportCsv() {
    new Angular5Csv(this._salle, 'liste_salle');
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this._salle, 'salleliste');
  }

  exportPdf()
  {
    var data = document.getElementById('salleliste');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('salle-liste.pdf');
    });
  }
}
