import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {DataService} from "../../../shared/service/data.service";
import {urlList} from "../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../Utils/ConstantHTTP";

@Component({
  selector: 'app-tz-matiere',
  templateUrl: './tz-matiere.component.html',
  styleUrls: ['./tz-matiere.component.scss']
})
export class TzMatiereComponent implements OnInit {
  listMatiere = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  id: '';


  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getMatiere().subscribe((response:any)=>{
            if (response.code == ConstantHTTP.CODE_SUCCESS){
              console.log(response.data);
              response.data.forEach((element:any)=>{
                this.listMatiere.push({
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
     return this.dataService.post(urlList.path_delete_matiere + this.id).subscribe(()=>{
       console.log(urlList.path_delete_matiere + this.id)
     });
  }
}
