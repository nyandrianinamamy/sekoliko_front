import {Component, Inject, OnInit} from '@angular/core';
import {Salle} from '../../../../shared/model/Salle';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConstantRole} from "../../../../Utils/ConstantRole";
import {UserConnectedService} from "../../../../shared/service/user-connected.service";

@Component({
  selector: 'app-tz-ajout-salle',
  templateUrl: './tz-ajout-salle.component.html',
  styleUrls: ['./tz-ajout-salle.component.scss']
})
export class TzAjoutSalleComponent implements OnInit {

  salle: Salle;
  loading: boolean;
  id = '';

  constructor(private dataservice: DataService,
              private userConnected:UserConnectedService,
              private router: Router,
              public dialogRef: MatDialogRef<TzAjoutSalleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.salle = new Salle();
    let role = this.getUserc();
    if (role.role_type.id !== ConstantRole.ADMIN && role.role_type.id != ConstantRole.SECRETARIAT){
      this.router.navigate(['/menu/not-found']);
    }
  }

  /**
   * Get user connecté
   */
  getUserc(){
    return this.userConnected.userConnected();
  }

  save(salle: Salle) {
    this.loading = true;
    this.dataservice.post(urlList.path_edit_salle, salle).subscribe(response => {
      if (response.code === ConstantHTTP.CODE_SUCCESS) {
        this.loading = false;
        this.dialogRef.close(1);
      }
    });
  }
}
