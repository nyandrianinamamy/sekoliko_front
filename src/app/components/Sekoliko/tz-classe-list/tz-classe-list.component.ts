import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { urlList } from 'src/app/Utils/api/urlList';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import {ActivatedRoute, Router} from '@angular/router';
import {Classe} from '../../../shared/model/Classe';
import {Subject} from "rxjs";
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-tz-classe-list',
  templateUrl: './tz-classe-list.component.html',
  styleUrls: ['./tz-classe-list.component.scss']
})
export class TzClasseListComponent implements OnInit {


  classe : Classe;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  details = 'Cliquer pour voir details';
  loading: boolean;
  _classe: Classe[];

  /**
   * Table
   */
  displayedColumns: string[] = ['numero', 'nom', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private dataService: DataService,
              private router: Router) {
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  ngOnInit() {
    this.loading = true;
    this.classe = new Classe();
    this.getNiveau().subscribe(response => {
      this.dtTrigger.next();
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this._classe = response.data;
        this.dataSource = new MatTableDataSource<any>(this._classe);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteClasse(id:number){
    this.loading = true;
    return this.dataService.post(urlList.path_delete_class+id).subscribe(response=>{
      if (response.code == ConstantHTTP.CODE_SUCCESS){
        this.router.navigate(['/menu/list-classe']);
        this.ngOnInit();
        this.loading = false;
      }
    })
  }

  editClasse(id:number,
             description:string){
    this.loading = true;
    return this.dataService.post(urlList.path_mod_class+id,{"description":description}).subscribe(response=>{
      if(response.code === ConstantHTTP.CODE_SUCCESS){
        this.loading = false;
      }
    });
  }

  save(classe:Classe){
    this.loading = true;
    this.dataService.post(urlList.path_edit_class,classe).subscribe(response=>{
      if (response.code == ConstantHTTP.CODE_SUCCESS){
        this.ngOnInit();
        this.loading = false;
      }
    });
  }
}
