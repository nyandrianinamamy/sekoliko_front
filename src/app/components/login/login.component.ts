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
  user_info : '';
  error: string;
  loading: boolean;
  constructor(private router: Router,
              private authData: AuthentificationService,
              private dataService: DataService,
              private localStorageService: LocalStorageService) {
              if (window.matchMedia("(max-width: 600px)").matches) {
                document.body.style.overflow = "block";
              } else {
                document.body.style.overflow = "hidden";
              }
              document.body.style.background = "#2d6bb0";

  }

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
        // this.user_info = log.data;
        this.router.navigate(['menu']);
        this.loading = false;
      } else {
        window.alert(log.message);
        this.loading = false;
      }
    });
  }
  updateLocalStorage(log: any) {
    localStorage.setItem('user_info',log.data);
    localStorage.setItem('token', log.data.token);
    localStorage.setItem('user_id', log.data.user_id);
    localStorage.setItem('jwt_token_ttl', log.data.jwt_token_ttl);
    this.localStorageService.setLocalstorage('user_info',log.data);
  }
}
