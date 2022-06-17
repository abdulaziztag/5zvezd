import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  title: string = 'Sign In'
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.authService.login('amanopov@exadel.com', '123').subscribe(data => {
      console.log(data)
    }, error => {
      this.alertService.openSnackBar(error.error.message, 'error')
    })
  }

}
