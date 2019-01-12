import {Component, OnInit} from '@angular/core';
import {ConstantFront} from '../../Utils/ConstantFront';
import {trigger, transition, useAnimation} from '@angular/animations';
import {bounce, bounceInLeft} from 'ng-animate';

const base_url = 'https://avatars3.githubusercontent.com/u/';
const base_git = 'https://github.com/';
const base_fb = 'https://www.facebook.com/';

@Component({
    selector: 'app-tz-sk-front-office',
    templateUrl: './tz-sk-front-office.component.html',
    styleUrls: ['./tz-sk-front-office.component.scss'],
    animations: [
        trigger('bounce', [transition('* => *', useAnimation(bounce, {
            params: {timing: 3, delay: 0.5}
        }))]),
        trigger('bounceInLeft', [transition('* => *', useAnimation(bounceInLeft, {
            params: {timing: 3, delay: 0.5}
        }))]),
    ],
})


export class TzSkFrontOfficeComponent implements OnInit {

    but = ConstantFront.but;
    but1 = ConstantFront.but1;
    but2 = ConstantFront.but2;
    but3 = ConstantFront.but3;
    but4 = ConstantFront.but4;
    but5 = ConstantFront.but5;
    but6 = ConstantFront.but6;
    but7 = ConstantFront.but7;
    but8 = ConstantFront.but8;
    soutient = ConstantFront.soutient;
    soutient1 = ConstantFront.soutient1;
    soutient2 = ConstantFront.soutient2;
    soutient3 = ConstantFront.soutient3;
    soutient4 = ConstantFront.soutient4;
    soutient5 = ConstantFront.soutient5;
    sout1 = ConstantFront.sout1;
    sout2 = ConstantFront.sout2;
    equipe = ConstantFront.equipe;
    pre_equipe = ConstantFront.pre_equipe;
    Tahiana_dev = ConstantFront.Tahiana_dev;
    Tahiana_tache = ConstantFront.Tahiana_tache;
    Antso_dev = ConstantFront.Antso_front;
    Antso_tache = ConstantFront.Antso_tache;
    Daulis_dev = ConstantFront.Daulis_front;
    Daulis_tache = ConstantFront.Daulis_tache;
    Janny_dev = ConstantFront.Janny_front;
    Janny_tache = ConstantFront.Janny_tache;
    Andry_dev = ConstantFront.Andry_dev;
    Andry_tache = ConstantFront.Andry_tache;
    Jul_resp = ConstantFront.Jul_resp
    Jul_tache = ConstantFront.Jul_tache;
    sekoliko_vue = ConstantFront.sekoliko_vue;
    sekoliko_vue1 = ConstantFront.sekoliko_vue1;
    dashboard = ConstantFront.dashboard;
    sekoliko_vue2 = ConstantFront.sekoliko_vue2;
    liste_etudiant = ConstantFront.liste_etudiant;
    sekoliko_vue3 = ConstantFront.sekoliko_vue3;
    liste_salle = ConstantFront.liste_salle;
    contributeur = ConstantFront.contributeur;
    google = ConstantFront.google;
    stackoverflow = ConstantFront.stackoverflow;
    github = ConstantFront.github;
    imageright = './assets/images/school.svg';
    titles = 'SEKOLIKO';
    techzara = 'TECHZARA';
    githubName = 'Github';
    loginName = 'Login';
    team = 'Team';
    gitTz = base_git + 'Techzara/sekoly-numerika';
    opensource = 'OpenSoure Project';

    imagesBasic = [
        {img: "./assets/images/img1.jpeg", description: "Image 1"},
        {img: "./assets/images/img2.jpeg", description: "Image 1"},
        {img: "./assets/images/img3.jpeg", description: "Image 1"},
    ];

    buts = [
        {name: this.but},
        {name: this.but1},
        {name: this.but2},
        {name: this.but3},
        {name: this.but4},
        {name: this.but5},
        {name: this.but6},
        {name: this.but7},
        {name: this.but8},
    ];

    soutients = [
        {name: this.soutient1},
        {name: this.soutient2},
        {name: this.soutient3},
        {name: this.soutient4},
    ];

    imageSlide = [
        {img: "./assets/images/google.jpeg", partenaire: "Google", thanks: this.google},
        {img: "./assets/images/stack.jpeg", partenaire: "Stackoverflow", thanks: this.stackoverflow},
        {img: "./assets/images/gith.jpeg", partenaire: "Github", thanks: this.github}
    ];

    developer = [
        {
            name: 'Tahiana', img: base_url + '32259364', dev: this.Tahiana_dev, tache: this.Tahiana_tache,
            githube: base_git + 'Tax16', facebook: base_fb + 'kala.Nance'
        },
        {
            name: 'Andry', img: base_url + '45004342', dev: this.Andry_dev, tache: this.Andry_tache,
            githube: base_git + 'm0r7y', facebook: base_fb + 'andry.an.37604'
        },
        {
            name: 'Janny', img: base_url + '44327690', dev: this.Janny_dev, tache: this.Janny_tache,
            githube: base_git + 'jmRakoto', facebook: base_fb + 'jm.rakoto.7'
        },
        {
            name: 'Ny Antso', img: base_url + '35923219', dev: this.Antso_dev, tache: this.Antso_tache,
            githube: base_git + 'NyAntsoRK', facebook: base_fb + 'nyantso.rak'
        },
        {
            name: 'Daulis', img: base_url + '21168538', dev: this.Daulis_dev, tache: this.Daulis_tache,
            githube: base_git + 'Fidaulis', facebook: base_fb + 'odonfidaulis.andrianjakatiana'
        },
        {
            name: 'Julien', img: base_url + '30557565', dev: this.Jul_resp, tache: this.Jul_tache,
            githube: base_git + 'julkwel', facebook: base_fb + 'julkwel'
        },
    ];

    footer = [
        {cop: 'Techzara', right: '© 2018 Copyright:'}
    ];

    constructor() {
        document.body.style.background = "white!important";
    }

    ngOnInit() {

    }

}
