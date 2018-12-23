import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Router} from '@angular/router';
import {MatiereParam} from '../../../shared/model/MatiereParam';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Angular5Csv} from 'angular5-csv/Angular5-csv';
import {Classe} from '../../../shared/model/Classe';

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
  matiere: number;
  listClasse: Classe[];

  constructor(
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.matiereCreate = new MatiereParam();
    this.loading = true;
    this.getMatiere().subscribe((response: any) => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.listMatiere = response.data;
        this.dataSource = new MatTableDataSource<any>(this.listMatiere);
        this.dataSource.paginator = this.paginator;
        console.log(this.listMatiere);
        this.dtTrigger.next();
      }
    });
  }

  getMatiere() {
    return this.dataService.post(urlList.path_list_matiere);
  }

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

  exportCsv() {
    new Angular5Csv(this.listMatiere, 'liste_matiere');
  }
}
