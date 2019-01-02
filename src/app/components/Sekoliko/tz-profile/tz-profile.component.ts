import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../../shared/service/local-storage.service";

@Component({
  selector: 'app-tz-profile',
  templateUrl: './tz-profile.component.html',
  styleUrls: ['./tz-profile.component.scss']
})
export class TzProfileComponent implements OnInit {

  userProfile : any[];

  constructor(private Localstorage : LocalStorageService) { }

  ngOnInit() {
    this.userProfile = this.getProfileUser();
  }

  /**
   * Fetch profile info in localstorage
   */
  getProfileUser(){
     return this.Localstorage.getLocalstorage('user_info');
  }

}
