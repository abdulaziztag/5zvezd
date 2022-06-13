import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  title: string = 'Sign In'
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
  }

}
