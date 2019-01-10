import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../shared/service/data.service";
import {urlList} from "../../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../../Utils/ConstantHTTP";
import {MatTableDataSource} from "@angular/material";
import {Role} from "../../../../shared/model/Role";
import {Classe} from "../../../../shared/model/Classe";
import {element} from "protractor";

export interface Payement {
  value: string;
  viewValue: string;
}

export interface Profs {
  value: string;
  viewValue: string;
}

export interface Etd {
  value: string;
  viewValue: string;
}

export interface Mois {
  id: number;
  name: string;
}


@Component({
  selector: 'app-tz-payements-ajout',
  templateUrl: './tz-payements-ajout.component.html',
  styleUrls: ['./tz-payements-ajout.component.scss']
})



export class TzPayementsAjoutComponent implements OnInit {

  selectedValue: string;
  payement_type:string;
  profs:string;
  niveau_d:string;
  moi:string;
  classe_d:string;
  edt_liste:string;
  confirmation:boolean;

  etudiants:string;
  getProf:boolean;
  getEtd:boolean;
  listMois:boolean;
  admin: any[];
  _classe:any[];
  classe:any[];
  etudiantes:any[];
  roles: Classe[];
  loading:boolean;
  classe_enfant:boolean;
  liste_etudiant:boolean;

  constructor (private dataService: DataService) {}

  ngOnInit() {
  }

  payements: Payement[] = [
    {value: '0', viewValue: 'Ecolage'},
    {value: '1', viewValue: 'Payement profs'},
    {value: '2', viewValue: 'Achat'}
  ];

  etudiant: Etd[] = [
    {value: '0', viewValue: 'Ecolage'},
    {value: '1', viewValue: 'Payement profs'},
    {value: '2', viewValue: 'Achat'}
  ];

  profd: Profs[] = [
    {value: '0', viewValue: 'Ecolage'},
    {value: '1', viewValue: 'Payement profs'},
    {value: '2', viewValue: 'Achat'}
  ];

  mois: Mois[] = [
    {id:0,name: 'Janvier'},
    {id:0,name: 'Fevrier'},
    {id:0,name: 'Mars'},
    {id:0,name: 'Avril'},
    {id:0,name: 'Mai'},
    {id:0,name: 'Juin'},
    {id:0,name: 'Juillet'},
    {id:0,name: 'Aout'},
    {id:0,name: 'Septembre'},
    {id:0,name: 'Octobre'},
    {id:0,name: 'Novembre'},
    {id:0,name: 'Decembre'},
  ]

  payementTypes(event){
    console.log(event.value)
    if(event.value == 1){
      this.getProf = true;
      this.getEtd = false;
      this.getListAdmin();
    }else  {
      this.getProf = false;
      this.getEtd = true;
      this.getNiveau();
    }
  }


  /**
   * Get profs listes
   */
  getListAdmin() {
    this.loading = true;
    this.dataService.post(urlList.path_find_user, {role :1}).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.admin = response.data.list;
        console.log(this.admin);
        this.loading = false;
      }
    });
  }

  /**
   * Liste niveau
   */
  getNiveau() {
    this.dataService.post(urlList.path_list_class_parent).subscribe((response)=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this._classe = response.data;
        response.data.forEach((element)=>{
          this._classe.push({
            id:element.id,
            description:element.description
          });
        });
        console.log(this._classe);
        this.loading = false;
      }
    });
  }


  /**
   * Liste classe enfant
   * @param event
   */
  getClasseEnfant(event) {
    this.dataService.post(urlList.path_list_class_enfant, {parent: event.value}).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.classe_enfant = true;
        this.classe = response.data;
        console.log(this.classe);
      }
    });
  }

  getListeEtudiants(event){
      this.dataService.post(urlList.path_list_etudiants, {idclasse: event.value, list: 'liste'}).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.liste_etudiant = true;
          this.etudiantes = response.data;
          console.log(this.etudiantes);
        }
      });
  }

  getListeMoi(event){
    this.listMois = true;
  }

  payer(){
    this.confirmation = true;
  }

  confirmer(){

  }
}
