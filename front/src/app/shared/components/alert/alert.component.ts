import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() public background: String;
  @Input() public borderColor: String;

  constructor() { }

  ngOnInit(): void {
  }

}
