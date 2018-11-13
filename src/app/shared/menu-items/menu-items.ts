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
      state: ['/', 'menu'],
      name: 'Note',
      type: 'link',
      icon: 'view_comfy'
    }, {
      state: ['/', 'menu'],
      name: 'Classe et Prof',
      type: 'link',
      icon: 'dns'
    }, {
      state: ['/', 'menu', 'etudiant'],
      name: 'Eleve',
      type: 'link',
      icon: 'accessibility'
    },  {
      state: ['/', 'menu'],
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
    }],
  },
  {
    state: ['#'],
    type: 'expand',
    name: 'Activité',
    icon: 'inbox',
    child: [{
      state: ['/', 'menu'],
      name: 'Business',
      type: 'link',
      icon: 'business_center'
    },
      {
        state: ['/', 'menu'],
        name: 'Nouvelles',
        type: 'link',
        icon: 'fiber_new'
      },
      {
        state: ['/', 'menu', 'activity'],
        name: 'Activités',
        type: 'link',
        icon: 'local_activity'
      },
      {
        state: ['#'],
        name: 'Evenement',
        type: 'link',
        icon: 'event_available'
      }
    ]
  }
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
