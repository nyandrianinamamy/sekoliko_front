import {Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../../shared/service/data.service';
import {Etudiants} from '../../../../shared/model/Etudiants';
import {urlList} from 'src/app/Utils/api/urlList';
import {ConstantHTTP} from 'src/app/Utils/ConstantHTTP';
import {Subject} from 'rxjs';
import {User} from '../../../../shared/model/User';
import {Inscription} from '../../../../shared/model/Inscription';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EtudiantUpdateComponent} from '../etudiant-update/etudiant-update.component';

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
              private dialog: MatDialog) {

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
      } else {
        console.log('verifieo le function aloha papie a :D ');
      }
    });
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
        // this.ngOnInit();
      }
    });
  }
  /**
   * Touche pas
   */
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
