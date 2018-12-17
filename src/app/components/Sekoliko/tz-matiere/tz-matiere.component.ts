import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {DataService} from "../../../shared/service/data.service";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {Router} from "@angular/router";
import {MatiereParam} from "../../../shared/model/MatiereParam";

@Component({
  selector: 'app-tz-matiere',
  templateUrl: './tz-matiere.component.html',
  styleUrls: ['./tz-matiere.component.scss']
})
export class TzMatiereComponent implements OnInit {

  listMatiere : MatiereParam;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loading: boolean;

  id:'';

  constructor(private dataService:DataService,
  private router : Router) { }

  ngOnInit() {
    this.loading = true;
    this.getMatiere().subscribe((response:any) => {
        if (response.code == ConstantHTTP.CODE_SUCCESS){
          console.log(response.data);
          this.listMatiere = response.data;
          this.loading = false;
          this.dtTrigger.next();
        }
    });
  }

  getMatiere(){
    return this.dataService.post(urlList.path_list_matiere);
  }

  deleteMatiere(){
     return this.dataService.post(urlList.path_delete_matiere + this.id).subscribe(response=>{
       console.log(urlList.path_delete_matiere + this.id);
       if (response.code == ConstantHTTP.CODE_SUCCESS){
         this.router.navigate(['/menu/matiere-list'])
       }else {
         alert("en cours de traitement");
         this.router.navigate(['/menu/matiere-list'])
       }

     });
  }
}
