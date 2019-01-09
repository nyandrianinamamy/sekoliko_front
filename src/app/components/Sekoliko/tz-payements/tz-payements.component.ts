import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tz-payements',
  templateUrl: './tz-payements.component.html',
  styleUrls: ['./tz-payements.component.scss']
})
export class TzPayementsComponent implements OnInit {

  constructor(
      private router:Router
  ) { }

  ngOnInit() {
  }

  ecolage(){
    this.router.navigate(['/menu/etudiant'])
  }

  profs(){
    this.router.navigate(['/menu/profs'])
  }

  admin(){
    this.router.navigate(['/menu/administratif'])
  }

  achat(){
    this.router.navigate(['/menu/'])
  }



}
