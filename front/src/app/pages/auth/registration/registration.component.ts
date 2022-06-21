import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmPasswordValidator} from '../../../shared/helpers/confirmPassword.validator'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder) {
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
    console.log(this.regForm)
  }

  ngOnInit(): void {
  }

}
