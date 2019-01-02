import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../../shared/model/User';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {DataService} from '../../../../shared/service/data.service';

@Component({
  selector: 'app-etudiant-update',
  templateUrl: './etudiant-update.component.html',
  styleUrls: ['./etudiant-update.component.scss']
})
export class EtudiantUpdateComponent implements OnInit {
  etudiant: User;
  constructor(public dialogRef: MatDialogRef<EtudiantUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.etudiant = new User();
    Object.assign(this.etudiant, this.data)
  }

  cancel() {
    this.dialogRef.close('Retour');
  }
}
