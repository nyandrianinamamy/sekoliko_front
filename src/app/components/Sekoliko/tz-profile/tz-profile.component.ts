import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../../shared/service/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-profile',
  templateUrl: './tz-profile.component.html',
  styleUrls: ['./tz-profile.component.scss']
})
export class TzProfileComponent implements OnInit {

  userProfile : any[];

  constructor(private Localstorage : LocalStorageService,
              private router:Router) { }

  ngOnInit() {
    this.userProfile = this.getProfileUser();
  }

  /**
   * Fetch profile info in localstorage
   */
  getProfileUser(){
     return this.Localstorage.getLocalstorage('user_info');
  }

  editMe(){
    // @ts-ignore
    this.router.navigate(['/menu/user/edit/' + this.userProfile.user_id])
  }
}
