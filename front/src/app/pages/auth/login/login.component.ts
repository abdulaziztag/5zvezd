import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {AlertService} from "../../../shared/services/alert.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public email: FormControl = new FormControl('', [Validators.required, Validators.email])
  public password: FormControl = new FormControl('', [Validators.minLength(6)])
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.login(this.email.value, this.password.value).subscribe(data => {
      console.log(data);
    }, error => {
      this.alertService.openSnackBar(error.error.message, 'error');
    })
  }

}
