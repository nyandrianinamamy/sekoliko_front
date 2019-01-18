import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import {MenuItems} from '../../../shared/menu-items/menu-items';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../../shared/service/local-storage.service";

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  opened = true;
  over = 'side';
  panelOpenState: boolean;
  userProfile = '';
  watcher: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

constructor(media: ObservableMedia,
            private breakpointObserver: BreakpointObserver,
            public menuItems: MenuItems,
            private router: Router,
            private Localstorage:LocalStorageService) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.userProfile = this.getProfileUser();
  }

  getProfileUser(){
    return this.Localstorage.getLocalstorage('user_info');
  }

}
