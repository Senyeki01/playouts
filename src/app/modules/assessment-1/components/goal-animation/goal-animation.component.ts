import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-goal-animation',
  templateUrl: './goal-animation.component.html',
  styleUrls: ['./goal-animation.component.scss']
})
export class GoalAnimationComponent implements OnChanges {
  @Input() teamScored!:string;

  ngOnChanges(changes: SimpleChanges){
    if(changes['teamScored']) {
      this.teamScored = changes['teamScored'].currentValue + ' has scored!!!';
    }
  }
}
