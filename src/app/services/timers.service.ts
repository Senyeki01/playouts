import { Injectable } from '@angular/core'
import { interval, Observable, Observer, Subscription, timeout, timer } from 'rxjs'
import { GameList } from 'src/interfaces/GameList'
import { Goal } from 'src/interfaces/Goal'
import { Sport } from 'src/interfaces/Sport'

@Injectable({
  providedIn: 'root'
})
export class TimersService {
  private gameList!: GameList

  private updateTime: number = 1
  private startTime: number = 0
  private previousStartTime: number = 0
  private timePlayed: number = 0
  private previousTimePlayed: number = 0
  private breakCount: number = 0

  public breakStatus: string = 'Not Started'
  public minutes: string = '00'
  public seconds: string = '00'

  gamesObs$!: Observable<number>

  constructor() { }

  startTimer(gameList: GameList) {
    this.gameList = gameList;

    // Start Games
    this.gameList.startGames(this.timePlayed)
    this.breakStatus = 'Games On'

    this.startTime = Date.now() - this.timePlayed

    const gameObs$: Observable<number> = interval(this.updateTime)
    const gameSub: Subscription = gameObs$.subscribe((stream: number) => {
      this.timePlayed += this.updateTime
      this.updateUiTime()

      // Check if the current half is complete
      if (this.timePlayed >= (this.gameList.gameConfig.msPerGamePeriod * (this.breakCount + 1))) {
        this.breakStatus = 'Break Time'

        // Start Break
        this.startBreak(gameSub)
      }
    })
  }

  private startBreak(gameSub: Subscription) {
    gameSub.unsubscribe()
    this.breakCount++

    if (this.breakCount <= this.gameList.gameConfig.breakCount) {
      this.previousTimePlayed = this.timePlayed
      this.timePlayed = 0
      this.previousStartTime = this.startTime
      this.startTime = Date.now() - this.timePlayed

    } else {
      this.breakStatus = 'Game Over'
      return
    }

    this.breakConfigs()
  }

  private breakConfigs() {
    const breakObs$: Observable<number> = interval(this.updateTime)

    const breakSub: Subscription = breakObs$.subscribe((stream: number) => {
      this.timePlayed += this.updateTime
      this.updateUiTime()

      // Check if the current break is complete
      if (this.timePlayed >= (this.gameList.gameConfig.breakDuration)) {
        breakSub.unsubscribe()

        // Continue with the game
        this.startTime = this.previousStartTime
        this.timePlayed = this.previousTimePlayed
        this.previousStartTime = 0
        this.previousTimePlayed = 0

        this.startTime = Date.now() - this.timePlayed

        this.startTimer(this.gameList)
      }
    })
  }

  private updateUiTime() {
    this.timePlayed = Date.now() - this.startTime
    const time = this.timePlayed
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)

    this.minutes = this.pad(minutes, 2)
    this.seconds = this.pad(seconds, 2)
  }

  private pad(num: number, size: number): string {
    let s = '00' + num
    return s.substr(s.length - size)
  }
}
