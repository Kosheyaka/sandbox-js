import { Reporter } from './reporter';

class Launcher {
  constructor(
    private functionToCall: CallableFunction,
    private dataSet: any[],
  ) {
    this.reporter = new Reporter();
  }

  private readonly reporter: Reporter;

  public go(): string {
    this.reporter.startTimer();
    this.functionToCall(this.dataSet);
    this.reporter.stopTimer();
    return this.reporter.getInterval();
  }
}

export function logLaunchResult(
  functionToCall: CallableFunction,
  functionArguments: any[],
): void {
  console.log(`<${functionToCall.name}>`);
  const runner = new Launcher(functionToCall, functionArguments);
  const timer = runner.go();
  console.log(`${functionArguments.length} => ${timer}`);
  console.log('');
}
