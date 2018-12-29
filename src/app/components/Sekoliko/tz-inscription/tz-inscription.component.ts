import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Classe} from '../../../shared/model/Classe';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {DataService} from '../../../shared/service/data.service';
import {InscriptionParam} from '../../../shared/model/InscriptionParam';
import {AnneeScolaire} from '../../../shared/model/AnneeScolaire';

@Component({
  selector: 'app-tz-inscription',
  templateUrl: './tz-inscription.component.html',
  styleUrls: ['./tz-inscription.component.scss']
})
export class TzInscriptionComponent implements OnInit {
  idEtudiant: number;
  listClasse: Classe[];
  anneeScolaire: AnneeScolaire[];
  inscription: InscriptionParam;
  loading: boolean;

  constructor(private currentRoute: ActivatedRoute,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.inscription = new InscriptionParam();
    this.getListClasse();
    this.getAllAnneeScolaire();
    this.idEtudiant = this.currentRoute.snapshot.paramMap.get('id') ? +this.currentRoute.snapshot.paramMap.get('id') : null;
  }

  /**
   * Fetch liste classes
   */
  getListClasse() {
    this.loading = true;
    this.dataService.post(urlList.path_list_classe).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listClasse = response.data;
        this.loading = false;
      }
    });
  }

  /**
   * Fetch année scolaire
   */
  getAllAnneeScolaire() {
    this.loading = true;
    this.dataService.get(urlList.path_find_annee_scolaire).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.anneeScolaire = response.data;
      }
    });
  }

  /**
   * Nouveau inscription
   * @param inscription
   */
  addInscription(inscription: InscriptionParam) {
    inscription.userid = this.idEtudiant;
    this.dataService.post(urlList.path_add_inscription, inscription).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        window.alert(response.message);
        this.router.navigate(['/menu']);
      }
    });
  }
}
