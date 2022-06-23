import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {AlertService} from "../../../shared/services/alert.service";
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {LoaderService} from "../../../shared/services/loader.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {Router} from "@angular/router";

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
    public loaderService: LoaderService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ){}


  public login(): void {
    this.loaderService.setLoader(true)
    this.subscription = this.authService.login(this.email.value, this.password.value).subscribe(data => {
      this.loaderService.setLoader(false);
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      })
      this.router.navigate(['/'])
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
