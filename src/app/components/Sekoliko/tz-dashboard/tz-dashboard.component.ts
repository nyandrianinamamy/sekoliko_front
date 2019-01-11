import { Component, OnInit } from '@angular/core';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import { DataService } from 'src/app/shared/service/data.service';
import { urlList } from 'src/app/Utils/api/urlList';
import {Salle} from "../../../shared/model/Salle";
import {User} from "../../../shared/model/User";
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";
import {MatTableDataSource} from "@angular/material";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-dashboard',
  templateUrl: './tz-dashboard.component.html',
  styleUrls: ['./tz-dashboard.component.scss']
})
export class TzDashboardComponent implements OnInit {

  compteEtudiants = '';
  compteSalles : Salle;
  listProfs : User;
  listEtd : User;
  comptesProff = '';
  etudiant:boolean;
  idClasse:number;
  loading:boolean;
  listMatier:any;
  listEts:any;
  countEts:any;
  superadmin:boolean;

  /**
   * Chartes
   */
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Anné 2017' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Année 2018' }
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(220,220,220,0.2)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    },
    {
      backgroundColor: 'rgba(151,187,205,0.2)',
      borderColor: 'rgba(151,187,205,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(151,187,205,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(151,187,205,1)'
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  etatsEtudiants() {
    const firstChartData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const secondChartData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    // This line will update only data in your Chart
    this.chartDatasets = [
      { data: firstChartData },
      { data: secondChartData },
    ];
  }

  etatsProfs() {
    // This line will update only label in your Chart
    // Note that if you need to update only label, you have to put some data into data property
    this.chartDatasets = [
      { data: this.chartDatasets[0].data, label: 'Label no. ' + Math.floor(Math.random() * 10), },
      { data: this.chartDatasets[1].data, label: 'Label no. ' + Math.floor(Math.random() * 10), },
    ];
  }

  statsProfsEtudiant() {
    const firstChartData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const secondChartData = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    // This line will update both data and label in Chart
    this.chartDatasets = [
      { data: firstChartData, label: 'Label no. ' + Math.floor(Math.random() * 10), },
      { data: secondChartData, label: 'Label no. ' + Math.floor(Math.random() * 10), },
    ];
  }

  congeMensuelle() {
    this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  }

  statsEtablissement() {
    this.chartColors = [
      {
        backgroundColor: 'rgba(159,248,227,0.2)',
        borderColor: 'rgba(15,239,187,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220,220,220,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220,220,220,1)'
      },
      {
        backgroundColor: 'rgba(15,239,75,0.2)',
        borderColor: 'rgba(9,143,45,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220,220,220,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220,220,220,1)'
      },
    ];
  }

  /**
   * End chartes
   */

  /**
   * @param dataService
   * @param userConnected
   * @param router
   */
  constructor(private dataService: DataService,
              private userConnected:UserConnectedService,
              private router:Router
  ) { }

  ngOnInit() {
    this.loading = true;
    let role = this.getUserConnected();
    if(role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant = true;
      this.getUserInsc().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.idClasse = response.data[0].id_classe.id;
          this.getListEtudiants(this.idClasse).subscribe(response => {
            if (response.code === ConstantHTTP.CODE_SUCCESS) {
              this.listEtd = response.data.length;
            }
          });
          this.idClasse = response.data[0].id_classe.id;
          this.getAllMatiere(this.idClasse);
        }
      });
    }else {
      this.getNbEtudiants().subscribe((response: any) => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.listEtd = response.data.list.length;
        }
      });
    }
    if (role.role_type.id === ConstantRole.SUPERADMIN){
      this.getEts().subscribe(response =>{
        console.log(response.data);
        if (response.code === ConstantHTTP.CODE_SUCCESS){
          this.superadmin = true;
          this.listEts = response.data;
          this.countEts = response.data.length;
        }
      });
    }

    this.getNbSalles().subscribe((response: any) => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.compteSalles = response.data.length;
      }
    });
    this.getNbEtudiants().subscribe((response: any) => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listEtd = response.data.list.length;
      }
    });

    this.getNbproff().subscribe((response: any) => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.listProfs = response.data.list.length;
      }
    });


    this.loading = false;
  }

  /**
   * Fetch etudiant liste
   */
  getNbEtudiants() {
    return this.dataService.post(urlList.path_find_user, {role :2});
  }

  /**
   * Fetch ets liste
   */
  getEts(){
    return this.dataService.post(urlList.path_ets);
  }

  /**
   * Fetch salle liste
   */
  getNbSalles() {
    return this.dataService.post(urlList.path_list_salle);
  }

  /**
   * Fetch profs liste
   */
  getNbproff() {
    return this.dataService.post(urlList.path_find_user, {role :1});
  }

  /**
   * Get user connected
   */
  getUserConnected(){
    return this.userConnected.userConnected();
  }

  /**
   * liste etudiant
   * @param classe
   */
  getListEtudiants(classe: number) {
    return this.dataService.post(urlList.path_list_etudiants, {idclasse: classe, list: 'liste'});
  }

  /**
   * Emploie du temps
   */
  edt(){
    const role = this.getUserConnected();
    if(role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant = true;
      this.getUserInsc().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.idClasse = response.data[0].id_classe.id;
          this.router.navigate(['/menu/edt/'+ this.idClasse])
        }
      });
    }
  }

  /**
   * navigate étudiant to matiere et profs
   */
  matProfs(){
    let role = this.getUserConnected();
    if(role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant = true;
      this.getUserInsc().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.idClasse = response.data[0].id_classe.id;
          this.router.navigate(['/menu/matiere-list/'+ this.idClasse])
        }
      });
    }
  }
  /**
   * Get Liste profs
   * @param idClass
   */
  getAllMatiere(idClass: number) {
    this.loading = true;
    let role = this.getUserConnected();
    this.dataService.post(urlList.path_list_matiere, {class: idClass}).subscribe(response => {
      this.listMatier = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
      if(role.role_type.id === ConstantRole.ETUDIANT) {
        this.etudiant = true;
        this.listProfs = this.listMatier.length;
        this.loading = false;
      }
    });
  }
  /**
   * Get user inscription
   */
  getUserInsc(){
    let role = this.getUserConnected();
    return this.dataService.post(urlList.path_list_etudiants,{userid:role.user_id});
  }
}
