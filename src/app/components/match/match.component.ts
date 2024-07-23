import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SportCreated } from 'src/classes/Sport';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnChanges {
  @Input() game!: SportCreated;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['game']) {
      this.game = changes['game'].currentValue;
    }
  }
}
