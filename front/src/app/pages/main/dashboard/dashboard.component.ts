import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../../shared/services/dashboard.service";
import {take} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardService
      .checkForAdmin()
      .pipe(take(1))
      .subscribe(data => {
        this.alertService.openSnackBar(data.message)
      }, error => {
        this.router.navigate(['/'])
        this.alertService.openSnackBar(error.error.message, 'error')
      })
  }
}
