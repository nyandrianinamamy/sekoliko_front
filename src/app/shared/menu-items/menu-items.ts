import {Injectable} from '@angular/core';
import * as url from 'url';
import {LocalStorageService} from "../service/local-storage.service";
import {DataService} from "../service/data.service";
import {log} from "util";

export interface Menu {
    state: string[];
    name: string;
    type: string;
    icon: string;
    child: any;
}

const RESPMENU = [
    {
        state: ['#'],
        name: 'Home',
        type: 'link',
        icon: 'home',
        child: []
    },
    {
        state: ['#'],
        name: 'Paramétrage',
        type: 'expand',
        icon: 'settings',
        child: [
            {
                state: ['/', 'menu', 'dashboard'],
                name: 'Dashboard',
                type: 'link',
                icon: 'dns'
            },
            {
                state: ['/', 'menu', 'ets'],
                name: 'Etablissement',
                type: 'link',
                icon: 'home'
            }
        ],
    },
];

const ETUDIANTMENU = [
    {
        state: ['#'],
        name: 'Home',
        type: 'link',
        icon: 'home',
        child: []
    },
    {
        state: ['#'],
        name: 'Paramétrage',
        type: 'expand',
        icon: 'settings',
        child: [
            {
                state: ['/', 'menu', 'dashboard'],
                name: 'Dashboard',
                type: 'link',
                icon: 'dns'
            }, {
                state: ['/', 'menu', 'etudiant'],
                name: 'Mes collegues',
                type: 'link',
                icon: 'account_circle'
            }, {
                state: ['/', 'menu', 'salle'],
                name: 'Salle',
                type: 'link',
                icon: 'home'
            }, {
                state: ['/', 'menu', 'anne'],
                name: 'Années scolaires',
                type: 'link',
                icon: 'event'
            }
        ],
    },
];

const SECMENU = [

    {
        state: ['#'],
        name: 'Home',
        type: 'link',
        icon: 'home',
        child: []
    },
    {
        state: ['#'],
        name: 'Paramétrage',
        type: 'expand',
        icon: 'settings',
        child: [
            {
                state: ['/', 'menu', 'dashboard'],
                name: 'Dashboard',
                type: 'link',
                icon: 'dns'
            }, {
                state: ['/', 'menu', 'etudiant'],
                name: 'Étudiants par classes',
                type: 'link',
                icon: 'account_circle'
            }, {
                state: ['/', 'menu', 'profs'],
                name: 'Professeurs',
                type: 'link',
                icon: 'perm_identity'
            }, {
                state: ['/', 'menu', 'administratif'],
                name: 'Administration',
                type: 'link',
                icon: 'settings'
            }, {
                state: ['/', 'menu', 'list-classe'],
                name: 'Niveaux',
                type: 'link',
                icon: 'school'
            },
            {
                state: ['/', 'menu', 'list-classe-eft'],
                name: 'Classe et Matieres',
                type: 'link',
                icon: 'class'
            }, {
                state: ['/', 'menu', 'payement'],
                name: 'Paiement',
                type: 'link',
                icon: 'attach_money'
            }, {
                state: ['/', 'menu', 'salle'],
                name: 'Gestion salles',
                type: 'link',
                icon: 'home'
            },
            {
                state: ['/', 'menu', 'user'],
                name: 'Gestion utilisateurs',
                type: 'link',
                icon: 'account_circle'
            }, {
                state: ['/', 'menu', 'anne'],
                name: 'Années scolaires',
                type: 'link',
                icon: 'event'
            }
        ],
    },
];

const PROFSMENU = [
    {
        state: ['#'],
        name: 'Home',
        type: 'link',
        icon: 'home',
        child: []
    },
    {
        state: ['#'],
        name: 'Paramétrage',
        type: 'expand',
        icon: 'settings',
        child: [
            {
                state: ['/', 'menu', 'dashboard'],
                name: 'Dashboard',
                type: 'link',
                icon: 'dns'
            }, {
                state: ['/', 'menu', 'etudiant'],
                name: 'Etudiant',
                type: 'link',
                icon: 'account_circle'
            }, {
                state: ['/', 'menu', 'profs'],
                name: 'Professeurs',
                type: 'link',
                icon: 'perm_identity'
            }, {
                state: ['/', 'menu', 'salle'],
                name: 'Gestion salles',
                type: 'link',
                icon: 'home'
            }, {
                state: ['/', 'menu', 'list-classe'],
                name: 'Niveaux',
                type: 'link',
                icon: 'school'
            }, {
                state: ['/', 'menu', 'list-classe-eft'],
                name: 'Classe et Matieres',
                type: 'link',
                icon: 'class'
            }, {
                state: ['/', 'menu', 'anne'],
                name: 'Années scolaires',
                type: 'link',
                icon: 'event'
            }
        ],
    },
];

@Injectable({
        providedIn: 'root'
    }
)

export class MenuItems {

    constructor(private localstorage: LocalStorageService,
                private dataService: DataService) {

    }

    getRoleUser() {
        return this.localstorage.getLocalstorage('user_info');
    }

    getMenuitem(): Menu[] {
        let userData = this.getRoleUser();
        const PROFS = userData.role_type.id == 1;
        const ETUDIANT = userData.role_type.id == 2;
        const SECRETARIAT = userData.role_type.id == 3;
        const DIRECTION = userData.role_type.id == 4;
        const RESPONSABLE = userData.role_type.id == 5;
        if (RESPONSABLE) {
            return RESPMENU
        }
        if (DIRECTION) {
            return SECMENU
        }
        if (PROFS) {
            return PROFSMENU;
        }
        if (SECRETARIAT) {
            return SECMENU;
        }
        if (ETUDIANT) {
            return ETUDIANTMENU;
        }

    }

}
