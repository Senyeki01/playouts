import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Sport } from 'src/interfaces/Sport';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnChanges {
  @Input() game!: Sport;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['game']);

    if (changes['game']) {
      this.game = changes['game'].currentValue;
    }
  }
}
