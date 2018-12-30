import { Injectable } from '@angular/core';
import {LocalStorageService} from "./local-storage.service";


@Injectable({
    providedIn: 'root'
})

export class UserConnectedService {

    constructor(private localstorage:LocalStorageService) { }

    getRoleUser(){
        return this.localstorage.getLocalstorage('user_info');
    }

    userConnected() {
        return this.getRoleUser();
    }

}