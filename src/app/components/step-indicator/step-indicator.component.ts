import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.css']
})
export class StepIndicatorComponent implements OnInit {
  @Input() activeStepIndex: Number = 0;
  @Input() stepCount: Number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
