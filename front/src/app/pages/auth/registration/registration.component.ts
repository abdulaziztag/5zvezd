import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from '../../../shared/helpers/confirmPassword.validator'
import {LoaderService} from "../../../shared/services/loader.service";
import {AlertService} from "../../../shared/services/alert.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup = new FormGroup({})
  private subscription?: Subscription

  constructor(
    private fb: FormBuilder,
    public loaderService: LoaderService,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      firstName: ['', [Validators.required]],
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ''
    }, {
      validator: ConfirmPasswordValidator('password', 'confirmPassword')
    })
  }

  get regForm(){
    return this.form.controls;
  }

  public isDisabled(): boolean {
    return (
      this.regForm['firstName']?.errors?.['required'] ||
      this.regForm['confirmPassword']?.errors?.['confirmedValidator'] ||
      this.regForm['password']?.errors?.['required'] ||
      this.regForm['password']?.errors?.['minlength'] ||
      this.regForm['email']?.errors?.['required'] ||
      this.regForm['email']?.errors?.['email']
    )
  }

  public registration(): void {
    this.loaderService.setLoader(true)
    this.subscription = this.authService.register(
      this.regForm['firstName'].value,
      this.regForm['email'].value,
      this.regForm['password'].value,
      this.regForm['lastName'].value
    ).subscribe(data => {
      this.alertService.openSnackBar(data.message)
      this.loaderService.setLoader(false)
      this.router.navigate(['/'])
    }, err => {
      this.alertService.openSnackBar(
        err.error.message || 'Something went wrong, try again later',
        'error'
      )
      this.loaderService.setLoader(false)
    })
  }

  ngOnInit(): void {
    this.loaderService.setLoader(false)
  }

}
