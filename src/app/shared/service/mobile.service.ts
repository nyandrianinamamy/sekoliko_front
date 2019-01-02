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
    getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
    }
}