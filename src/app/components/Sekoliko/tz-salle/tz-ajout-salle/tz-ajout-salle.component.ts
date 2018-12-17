import { Component, OnInit } from '@angular/core';
import {Salle} from "../../../../shared/model/Salle";
import {DataService} from "../../../../shared/service/data.service";
import {urlList} from "../../../../Utils/api/urlList";
import {ConstantHTTP} from "../../../../Utils/ConstantHTTP";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-ajout-salle',
  templateUrl: './tz-ajout-salle.component.html',
  styleUrls: ['./tz-ajout-salle.component.scss']
})
export class TzAjoutSalleComponent implements OnInit {

  salle : Salle;
  loading: boolean;
  id = '';

  constructor(private dataservice : DataService,private router : Router) { }

  ngOnInit() {
    this.salle = new Salle();
  }

  save(salle : Salle){
    this.loading = true;
    this.dataservice.post(urlList.path_edit_salle,salle).subscribe(response=>{
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.router.navigate(['/menu/salle']);
      }
    })
  }
}
