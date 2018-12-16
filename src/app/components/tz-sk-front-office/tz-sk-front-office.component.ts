import { Component, OnInit } from '@angular/core';
import { ConstantFront } from '../../Utils/ConstantFront';

@Component({
  selector: 'app-tz-sk-front-office',
  templateUrl: './tz-sk-front-office.component.html',
  styleUrls: ['./tz-sk-front-office.component.scss']
})
export class TzSkFrontOfficeComponent implements OnInit {

    but           = ConstantFront.but;
    but1          = ConstantFront.but1;
    but2          = ConstantFront.but2;
    but3          = ConstantFront.but3;
    but4          = ConstantFront.but4;
    soutient      = ConstantFront.soutient;
    soutient1     = ConstantFront.soutient1;
    soutient2     = ConstantFront.soutient2;
    soutient3     = ConstantFront.soutient3;
    soutient4     = ConstantFront.soutient4;
    soutient5     = ConstantFront.soutient5;
    sout1         = ConstantFront.sout1;
    sout2         = ConstantFront.sout2;
    equipe        = ConstantFront.equipe;
    pre_equipe    = ConstantFront.pre_equipe;
    Tahiana_dev   = ConstantFront.Tahiana_dev;
    Tahiana_tache = ConstantFront.Tahiana_tache;
    Antso_dev     = ConstantFront.Antso_front;
    Antso_tache   = ConstantFront.Antso_tache;
    Daulis_dev    = ConstantFront.Daulis_front;
    Daulis_tache  = ConstantFront.Daulis_tache;
    Janny_dev     = ConstantFront.Janny_front;
    Janny_tache   = ConstantFront.Janny_tache;
    Andry_dev     = ConstantFront.Andry_dev;
    Andry_tache   = ConstantFront.Andry_tache;
    Jul_resp      = ConstantFront.Jul_resp
    Jul_tache     = ConstantFront.Jul_tache;
    sekoliko_vue  = ConstantFront.sekoliko_vue;
    sekoliko_vue1 = ConstantFront.sekoliko_vue1;
    dashboard     = ConstantFront.dashboard;
    sekoliko_vue2 = ConstantFront.sekoliko_vue2;
    liste_etudiant= ConstantFront.liste_etudiant;
    sekoliko_vue3 = ConstantFront.sekoliko_vue3;
    liste_salle   = ConstantFront.liste_salle;
    contributeur  = ConstantFront.contributeur;
    google        = ConstantFront.google;
    stackoverflow = ConstantFront.stackoverflow;
    github        = ConstantFront.github;


  constructor() {
    document.body.style.background = "white!important";
  }

  ngOnInit() {
  }

}
