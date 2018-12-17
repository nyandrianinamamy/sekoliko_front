import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Subject} from 'rxjs';
import { Salle } from '../../../shared/model/Salle';

@Component({
  selector: 'app-tz-salle',
  templateUrl: './tz-salle.component.html',
  styleUrls: ['./tz-salle.component.scss']
})


export class TzSalleComponent implements OnInit {

  salle: Salle;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loading: boolean;
  public description: string;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getListSalle().subscribe((data: any) => {
      if (data.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.salle = data.data;
        this.dtTrigger.next();
      }
    });
  }

  /**
   * Function list , edit , delete , Modifiable
   */
  getListSalle() {
  return this.dataService.post(urlList.path_list_salle);
  }

  deleteSalle(id:number) {
    this.loading = true;
    return this.dataService.post(urlList.path_delete_salle + id).subscribe(response=>{
      if (response.code == ConstantHTTP.CODE_SUCCESS){
        this.loading = false;
        this.ngOnInit();
        this.dtTrigger.next();
      }
    });
  }

  editSalle(id:number){
    this.loading = true;
    this.dataService.post(urlList.path_mod_salle+id,{
      "description":this.description
    }).subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.ngOnInit();
        this.dtTrigger.next();
      }
    })
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }


}
