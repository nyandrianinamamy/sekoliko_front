import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {DataService} from "../../../shared/service/data.service";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-matiere',
  templateUrl: './tz-matiere.component.html',
  styleUrls: ['./tz-matiere.component.scss']
})
export class TzMatiereComponent implements OnInit {
  listMatiere = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  id:'';


  constructor(private dataService:DataService,
  private router : Router) { }

  ngOnInit() {
    this.getMatiere().subscribe((response:any)=>{
      this.dtTrigger.next();
            if (response.code == ConstantHTTP.CODE_SUCCESS){
              console.log(response.data);
              response.data.forEach((element:any)=>{
                this.listMatiere.push({
                  id:element.id,
                  desc:element.description,
                  coeff:element.coefficient
                });
              })
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
