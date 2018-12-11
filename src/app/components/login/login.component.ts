import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../../shared/service/authentification.service';
import {Login} from '../../shared/model/login';
import {DataService} from '../../shared/service/data.service';
import {urlList} from '../../Utils/api/urlList';
import {ConstantHTTP} from '../../Utils/ConstantHTTP';
import {LocalStorageService} from '../../shared/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  title = 'Techzara Ny Sekoliko';
  login: Login;
  submitted: boolean;
  error: string;
  loading: boolean;
  constructor(private router: Router,
              private authData: AuthentificationService,
              private dataService: DataService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.login = new Login();
    this.loading = false;
    this.authData.setLoggedIn(false);
    localStorage.clear();
  }
  onclick() {
  }
  onSubmit() {
    this.submitted = true;
  }
  auth(login: Login) {
    this.loading = true;
    this.dataService.post(urlList.path_login, login).subscribe((log) => {
      if (log.code === ConstantHTTP.CODE_SUCCESS) {
        this.updateLocalStorage(log);
        this.router.navigate(['menu']);
        this.loading = false;
      } else {
        window.alert(log.message);
        this.loading = false;
      }
    });
  }
  updateLocalStorage(log: any) {
    this.localStorageService.setLocalstorage('access_token', log.data.token);
    this.localStorageService.setLocalstorage('info_user', {userId: log.data.user_id, username: log.data.username, session: log.data.jwt_token_ttl});
  }
}
