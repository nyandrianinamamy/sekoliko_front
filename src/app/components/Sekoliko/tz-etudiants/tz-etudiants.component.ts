import {Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {DataService} from '../../../shared/service/data.service';
import {Router} from '@angular/router';
import {UserConnectedService} from "../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../Utils/ConstantRole";
import {User} from "../../../shared/model/User";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Inscription} from "../../../shared/model/Inscription";
import {Classe} from "../../../shared/model/Classe";

@Component({
  selector: 'app-tz-etudiants',
  templateUrl: './tz-etudiants.component.html',
  styleUrls: ['./tz-etudiants.component.scss']
})

export class TzEtudiantsComponent implements OnInit {
  niveau = [];
  // lentgh = this.niveau.length;
  details = 'Cliquer pour voir details';
  loading: boolean;
  etudiant_user:boolean;
  role:any;
  etudiant:User;
  inscription: any;
  user:any;
  class:Classe[];
  profs:boolean;

  /**
   * Table
   */
  displayedColumns: string[] = ['ref', 'description', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService,
              private router: Router,
              private userConnected: UserConnectedService) {
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  getUserConnected(){
   return this.userConnected.userConnected();
  }

  ngOnInit() {
    this.loading = true;
    let role = this.getUserConnected();
    if (role.role_type.id === ConstantRole.PROFS){
      this.profs = true;
    }
    if (role.role_type.id === ConstantRole.ETUDIANT){
      this.etudiant_user = true;
      this.etudiant = new User();
      this.getListEtudiants(this.etudiant);
      this.getUserInsc().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          let a = response.data[0].id_classe.id;
          this.router.navigate(['/menu/list-etudiant/'+a]);
        }
      });
    }else{
      this.getNiveau().subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.class = response.data ;
          console.log(this.class);
          this.dataSource= new MatTableDataSource<any>(this.class);
          this.dataSource.paginator = this.paginator;
          // response.data.forEach(element => {
          //   this.niveau.push({
          //     id: element.id,
          //     nom: element.description
          //   });
          // });
        }
      });
    }
    this.loading = false;
  }

  /**
   * Fetch inscription liste
   */
  getUserInsc(){
    let role = this.getUserConnected();
    return this.dataService.post(urlList.path_list_etudiants,{userid:role.user_id});
  }

  /**
   * Fetch listes des utilisateurs
   * @param user
   */
  getListEtudiants(user: User) {
    this.loading = true;
    this.dataService.post(urlList.path_find_user, user).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.etudiant = response.data;
        console.log(this.etudiant)
      } else {
        console.log('verifieo le function aloha papie a :D ');
      }
    });
  }
  /**
   * Check classe efant
   * @param id
   */
  checkEnfant(id: number) {
    this.router.navigate(['/menu/classe/' + id]);
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
