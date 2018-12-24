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

  /**
   * Table
   */
  displayedColumns: string[] = ['id', 'nom', 'debut', 'fin', 'classe', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private dataService: DataService,
              private router: Router,
              public dialog: MatDialog
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
   * Function list , edit , delete , Modifiable
   */
  getListSalle() {
    return this.dataService.post(urlList.path_list_salle);
  }

  getListSalleLibre() {
    this.dataService.post(urlList.path_list_salle, {occupation: false}).subscribe(response => {
      this.listSalleLibre = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
    });
  }

  exportCsv() {
    new Angular5Csv(this._salle, 'liste_salle');
  }

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

  editSalle(
    id: number,
  ) {
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

  reservations() {
    this.loading = true;
    this.dataService.post(urlList.path_reservation_salle + this.reservation.id, this.reservation).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.router.navigateByUrl('/menu', {skipLocationChange: true}).then(() =>
          this.router.navigate(['/menu/salle']));
        this.loading = false;
      }
    });
  }

  getClasseEnfant() {
    return this.dataService.post(urlList.path_list_class_enfant);
  }


  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

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
}
