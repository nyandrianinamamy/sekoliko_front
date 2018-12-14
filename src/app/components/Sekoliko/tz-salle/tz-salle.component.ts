import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/service/data.service';
import {urlList} from '../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../Utils/ConstantHTTP';
import {Subject} from "rxjs";
import {Validators ,FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-salle',
  templateUrl: './tz-salle.component.html',
  styleUrls: ['./tz-salle.component.scss']
})
export class TzSalleComponent implements OnInit {

  listSalle = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  id: '';
  public description:string;

  constructor(private dataService: DataService,
              private router:Router,
              )
  {

  }

  ngOnInit() {

    this.getListSalle().subscribe((data: any) => {
      this.dtTrigger.next();
      if (data.code === ConstantHTTP.CODE_SUCCESS){
        data.data.forEach((element: any) => {
          this.listSalle.push({
            id: (element.id).toString(),
            nom: element.nom,
          });
        });
      }else {
        console.log("verifieo le function aloha papie a :D ")
      }
    });

  }

  /**
   * Function list , delete
   */
  getListSalle() {
   return this.dataService.post(urlList.path_list_salle);
  }

  deleteSalle(){
    return this.dataService.post(urlList.path_delete_salle + this.id).subscribe(()=>{
          this.router.navigate(['salle']);
    });
  }

  editSalle(event:any){
     this.dataService.post(urlList.path_edit_salle+event.target.id.value).subscribe(()=>{
       this.id = event.target.salle_nom.value;
       this.description = event.target.id.value;
    })
    return this;
  }


  /**
   * Touche Pas
   */
  signupFormModalName = new FormControl('', Validators.required);

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }


}
