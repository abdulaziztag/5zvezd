import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {AlertService} from "../../../shared/services/alert.service";
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  public email: FormControl = new FormControl('', [Validators.required, Validators.email])
  public password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)])
  private subscription?: Subscription
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    public loaderService: LoaderService
  ){}


  public login(): void {
    this.loaderService.setLoader(true)
    this.subscription = this.authService.login(this.email.value, this.password.value).subscribe(data => {
      this.loaderService.setLoader(false);
      console.log(data);
    }, error => {
      this.alertService.openSnackBar(
        error.error.message || 'Something went wrong, try again later',
        'error'
      );
      this.loaderService.setLoader(false);
    })
  }

  public isDisabled(): boolean {
    return (
      this.email.hasError('required') ||
      this.email.hasError('email') ||
      this.password.hasError('required') ||
      this.password.hasError('minlength')
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  ngOnInit(): void {
    this.loaderService.setLoader(false)
  }

}
