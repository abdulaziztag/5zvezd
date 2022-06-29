import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-example-card',
  templateUrl: './example-card.component.html',
  styleUrls: ['./example-card.component.scss']
})
export class ExampleCardComponent implements OnInit {
  @Input() public order: number;
  @Input() public parent: string;

  constructor() { }

  ngOnInit(): void {
  }

}
