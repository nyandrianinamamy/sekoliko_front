import {Component, OnInit, HostListener, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../../../shared/service/data.service';
import {Etudiants} from '../../../../shared/model/Etudiants';
import {urlList} from 'src/app/Utils/api/urlList';
import {ConstantHTTP} from 'src/app/Utils/ConstantHTTP';
import {Subject} from 'rxjs';
import {User} from '../../../../shared/model/User';
import {Inscription} from '../../../../shared/model/Inscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent implements OnInit {
  etudiant: Etudiants;
  mobile = false
  mobileClass = '';


  inscription: Inscription;
  listEtudiants = [];
  idClasseEnfant: number;
  dtOptions: DataTables.Settings = {};
  loading: boolean;
  dtTrigger: Subject<any> = new Subject();
  constructor(private dataService: DataService,
              private currentRoute: ActivatedRoute) {

  }


  ngOnInit() {
    if (window.screen.width >= 600) {
      this.mobileClass = "text-center";
    }else {
      this.mobileClass = "d-none";
    }

    this.idClasseEnfant = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    this.dtTrigger.next();
    this.loading = true;
    this.getListEtudiants(this.idClasseEnfant).subscribe(response => {
      console.log(response.data)
      this.dtTrigger.next();
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.etudiant = response.data;
      } else {
        console.log('verifieo le function aloha papie a :D ');
      }
    });
  }

  getListEtudiants(classe: number) {
    return this.dataService.post(urlList.path_list_etudiants, {idclasse: classe, list: 'liste'});
  }

  /**
   * Touche pas
   */
  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
