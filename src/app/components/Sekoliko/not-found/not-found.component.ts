import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public reportedError: boolean;
  public errorPercentage: number = 0;
  public timer;

  constructor(private router:Router) { }

  ngOnInit() {}



  public checkChanged = (event) => {
    this.reportedError = event.checked;
    this.reportedError ? this.startTimer() : this.stopTimer();
  };

  private startTimer = () => {
    this.timer = setInterval(() => {
      this.errorPercentage += 1;
      if (this.errorPercentage === 101) {
        clearInterval(this.timer);
        this.router.navigate(['/menu/dashboard'])
      }
    }, 30);
  };

  private stopTimer = () => {
    clearInterval(this.timer);
    this.errorPercentage = 0;
  }
}
