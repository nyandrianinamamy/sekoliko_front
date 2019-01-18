import {HostListener, Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class MobileService {
    screenHeight:any;
    screenWidth:any;
    mobile:boolean;

    constructor() {
        this.getScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        if (this.screenWidth  <= 479){
            return this.mobile = true;
        } else if(this.screenWidth >= 479){
            return this.mobile = false;
        }
    }
}