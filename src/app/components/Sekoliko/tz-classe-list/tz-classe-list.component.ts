import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { urlList } from 'src/app/Utils/api/urlList';
import { ConstantHTTP } from 'src/app/Utils/ConstantHTTP';
import {ActivatedRoute, Router} from '@angular/router';
import {Classe} from '../../../shared/model/Classe';
import {Subject} from "rxjs";

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

  constructor(private dataService: DataService,
              private router: Router) {
  }

  getNiveau() {
    return this.dataService.post(urlList.path_list_class_parent);
  }

  ngOnInit() {
    this.loading = true;
    this.getNiveau().subscribe(response => {
      this.dtTrigger.next();
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        console.log(response.data)
        this.classe = response.data;
        this.loading = false;
      }
    });
  }

  deleteClasse(id:number){
    console.log(id);
    this.loading = true;
    return this.dataService.post(urlList.path_delete_class+id).subscribe(response=>{
      if (response.code == ConstantHTTP.CODE_SUCCESS){
        this.router.navigate(['/menu/list-classe']);
        this.loading = false;
      }
    })
  }

  editClasse(id:number){
    this.loading = true;
  }
}
