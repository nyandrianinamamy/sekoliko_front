import {Injectable} from '@angular/core';
import * as url from 'url';

export interface Menu {
  state: string[];
  name: string;
  type: string;
  icon: string;
  child: any;
}

const MENUITEMS = [
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
      name: 'Professeur',
      type: 'link',
      icon: 'perm_identity'
    }, {
      state: ['/', 'menu', 'administratif'],
      name: 'Administration',
      type: 'link',
      icon: 'settings'
    }, {
        state: ['/', 'menu', 'list-classe'],
        name: 'Classe',
        type: 'link',
        icon: 'school'
      }, {
      state: ['/', 'menu', 'payement'],
      name: 'Payement',
      type: 'link',
      icon: 'attach_money'
    }, {
        state: ['/', 'menu', 'salle'],
        name: 'Gestion salle',
        type: 'link',
        icon: 'home'
      } ,{
        state: ['/', 'menu', 'matiere-list'],
        name: 'Matieres',
        type: 'link',
        icon: 'book'
      },
      {
        state: ['/', 'menu', 'user'],
        name: 'Gestion utilisateurs',
        type: 'link',
        icon: 'account_circle'
      },
      {
        state: ['/', 'menu', 'edt'],
        name: 'Emploie du temps',
        type: 'link',
        icon: 'date_range'
      }
      ],
  },
];

@Injectable({
    providedIn: 'root'
  }
)

export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

}
