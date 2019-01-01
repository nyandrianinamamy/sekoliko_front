import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {DataService} from '../../../../shared/service/data.service';
import {urlList} from '../../../../Utils/api/urlList';
import {ConstantHTTP} from '../../../../Utils/ConstantHTTP';
import {ParamNote} from '../../../../shared/model/ParamNote';
import {MatTableDataSource} from '@angular/material';
import {UserConnectedService} from "../../../../shared/service/user-connected.service";
import {ConstantRole} from "../../../../Utils/ConstantRole";

@Component({
  selector: 'app-ajout-note',
  templateUrl: './ajout-note.component.html',
  styleUrls: ['./ajout-note.component.scss']
})
export class AjoutNoteComponent implements OnInit {

  etudiant:boolean;
  details: boolean;
  idInscription: number;
  idClasse: number;
  loading: boolean;
  order: any;
  displayedColumns: string[] = ['classe', 'note', 'coefficient', 'num_inscription'];
  listNode: any[];
  names: string;
  listMatier = [];
  idNoteUpdate: number;
  paramNote: ParamNote;
  updateNote: boolean;
  dataSource: MatTableDataSource<any>;
  constructor(private currentRoute: ActivatedRoute,
              private dataService: DataService,
              private router: Router,
              private userConnected: UserConnectedService) { }

  ngOnInit() {
    this.paramNote = new ParamNote();
    this.currentRoute.queryParams
      .pipe(filter(params => params.etudiant))
      .subscribe(params => {
        this.names = params.etudiant;
      });
    this.idInscription = this.currentRoute.snapshot.paramMap.get('id') ? + this.currentRoute.snapshot.paramMap.get('id') : null;
    this.idClasse = this.currentRoute.snapshot.paramMap.get('idClasse') ? + this.currentRoute.snapshot.paramMap.get('idClasse') : null;
    this.getAllMatiere(this.idClasse);

    /**
     * Role
     */
    let role = this.getUserConnected();
    if (role.role_type.id === ConstantRole.ETUDIANT){
      this.displayedColumns = ['classe', 'note', 'coefficient'];
      this.etudiant = true;
      this.details = true;
      this.dataService.post(urlList.path_get_note_etudiant, {numins: this.idInscription, class: this.idClasse}).subscribe(response => {
        this.listNode = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
        this.dataSource = new MatTableDataSource<any>(this.listNode);
        this.loading = false;
      });
    }
  }

  getAllMatiere(idClass: number) {
    this.loading = true;
    this.dataService.post(urlList.path_list_matiere, {class: idClass}).subscribe(response => {
      this.listMatier = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
      this.loading = false;
    });
  }

  addNote(param: ParamNote) {
    param.numins = this.idInscription;
    this.loading = true;
    if (!this.idNoteUpdate) {
      this.dataService.post(urlList.path_add_note, param).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          window.alert('Ajout de note pour ' + this.names + ' fait');
        }
        this.loading = false;
      });
    } else {
      param.id = this.idNoteUpdate;
      this.dataService.post(urlList.path_edit_note, param).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          window.alert('Mise à jour de note pour ' + this.names + ' fait');
        }
        this.loading = false;
      });
    }
  }

  showDetail() {
    this.details = true;
    this.loading = true;
    this.dataService.post(urlList.path_get_note_etudiant, {numins: this.idInscription, class: this.idClasse}).subscribe(response => {
      this.listNode = response.code === ConstantHTTP.CODE_SUCCESS ? response.data : [];
      this.dataSource = new MatTableDataSource<any>(this.listNode);
      this.loading = false;
    });
  }

  retour() {
    this.router.navigate(['/menu/list-etudiant/' + this.idClasse]);
  }

  checkIfUpdate(id: number) {
    if (id > 0) {
      this.loading = true;
      this.dataService.post(urlList.path_get_note_etudiant, {numins: this.idInscription, class: this.idClasse, mat: id}).subscribe(response => {
        if (response.code === ConstantHTTP.CODE_SUCCESS) {
          this.loading = false;
          if (response.data.length > 1) {
            window.alert('erreur, duplication des notes');
          } else if (response.data.length === 1) {
            this.updateNote = true;
            this.idNoteUpdate = response.data[0].noteId;
            this.paramNote.note = response.data[0].note;
          } else {
            this.updateNote = false;
            this.paramNote = new ParamNote();
          }
        }
      });
    }
  }

  getUserConnected(){
    return this.userConnected.getRoleUser();
  }
}
