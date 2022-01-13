export class Reporter {
  private startTime = 0;
  private stopTime = 0;

  public startTimer(): void {
    this.startTime = this.getCurrentTime();
  }

  public stopTimer(): void {
    this.stopTime = this.getCurrentTime();
  }

  public getInterval(): string {
    return ((this.stopTime - this.startTime) / 1000).toString();
  }

  public getCurrentTime(): number {
    return new Date().getTime();
  }
}
