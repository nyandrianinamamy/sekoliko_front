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
    child: [{
      state: ['/', 'menu', 'etudiant'],
      name: 'Les etudiants',
      type: 'link',
      icon: 'accessibility'
    }, {
      state: ['/', 'menu'],
      name: 'Les professeurs',
      type: 'link',
      icon: 'dns'
    }, {
      state: ['/', 'menu'],
      name: 'Les classes',
      type: 'link',
      icon: 'view_comfy'
    },  {
      state: ['/', 'menu', 'administration'],
      name: 'Administration',
      type: 'link',
      icon: 'settings'
    }, {
      state: ['/', 'menu'],
      name: 'Ecolage',
      type: 'link',
      icon: 'attach_money'
    }, {
      state: ['/', 'menu'],
      name: 'Utilisateurs',
      type: 'link',
      icon: 'account_circle'
    },
      {
        state: ['/', 'menu', 'salle'],
        name: 'Gestion Salle',
        type: 'link',
        icon: 'home'
      }],
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
