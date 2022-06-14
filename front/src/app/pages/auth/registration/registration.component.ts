import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  title: string = 'Sign Up'
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
  }

}
