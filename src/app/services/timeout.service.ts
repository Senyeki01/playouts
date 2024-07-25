import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeoutService {
  private timeouts: { timeoutId: number, remainingTime: number, startTime: number, callback: Function }[] = [];
  public isPaused = false;

  constructor() { }

  startTimeout(callback: Function, delay: number) {
    const startTime = Date.now();
    const timeoutId = window.setTimeout(() => {
      callback();
      this.clearTimeout(timeoutId);
    }, delay);

    this.timeouts.push({ timeoutId, remainingTime: delay, startTime, callback });
  }

  startBreak() {
    if (this.isPaused) return;
    this.isPaused = true;
    const currentTime = Date.now();

    this.timeouts.forEach(timeout => {
      clearTimeout(timeout.timeoutId);
      const elapsed = currentTime - timeout.startTime;
      timeout.remainingTime -= elapsed;
    });
  }

  clearTimeout(timeoutId: number) {
    this.timeouts = this.timeouts.filter(timeout => timeout.timeoutId !== timeoutId);
  }
}
