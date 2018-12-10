import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  value: any;
  constructor() {
  }
  setLocalstorage(cle, nom) {
    localStorage.setItem(cle, JSON.stringify(nom));
  }
  getLocalstorage(cle) {
    return JSON.parse(localStorage.getItem(cle));
  }
  delLocalStorage(cle) {
    localStorage.removeItem(cle);
  }
}
