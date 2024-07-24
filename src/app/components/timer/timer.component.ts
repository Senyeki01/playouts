import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { TimeoutService } from 'src/app/services/timeout.service';
import { GameList } from 'src/interfaces/GameList';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnDestroy, OnChanges {
  @Input() gameList!: GameList;
  @Input() gamesStarted: boolean = false;

  minutes: string = '00';
  seconds: string = '00';
  milliseconds: string = '00';

  breakStatus: string = '';
  breakCount: number = 0;

  private startTime: number = 0;
  private elapsedTime: number = 0;
  private intervalId: any;

  constructor(public timeoutService: TimeoutService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gamesStarted']) {
      this.gamesStarted = changes['gamesStarted'].currentValue;
      if (this.gamesStarted) {
        this.startTimer();
      }
    }
    if (changes['gameList']) {
      this.gameList = changes['gameList'].currentValue;
    }
  }

  startTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // Start Games
    this.gameList.startGames();

    // Listen for break complete
    this.afterEachBreak();

    this.startTime = Date.now() - this.elapsedTime;
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 10); // Update every 10ms
  }

  afterEachBreak() {
    this.breakCount++;

    this.gameList.breakStatus$.subscribe((breakStatus: string) => {
      this.breakStatus = breakStatus;
      if (breakStatus) {
        this.stopTimer();

        if (breakStatus !== 'Half Time') {
          this.startTime = this.startTime + this.gameList.gameConfig.breakDuration;
        }

        if(breakStatus !== "Match Ended"){
          this.intervalId = setInterval(() => {
            this.updateTimer();
          }, 10); // Update every 10ms
        }
      }
    })
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private updateTimer() {
    this.setTime();

    // Check if the current half is complete
    if (this.elapsedTime >= (this.gameList.gameConfig.msPerGamePeriod * (this.breakCount + 1))) {
      // Stop the timer
      this.stopTimer();

      if (this.breakCount < this.gameList.gameConfig.breakCount) {
        this.elapsedTime = 0;
      };
    };
  }

  private setTime() {
    this.elapsedTime = Date.now() - this.startTime;
    const time = this.elapsedTime;
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    this.minutes = this.pad(minutes, 2);
    this.seconds = this.pad(seconds, 2);
    this.milliseconds = this.pad(milliseconds, 2);
  }

  private pad(num: number, size: number): string {
    let s = '00' + num;
    return s.substr(s.length - size);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
