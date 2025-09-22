class StopWatch {
  static hourMax = 24;
  static minuteMax = 60;
  static secondMax = 60;
  static centisecondMax = 100;

  static tenMs = 10;

  constructor() {
    this.centiseconds = document.querySelector('#centiseconds');
    this.seconds = document.querySelector('#seconds');
    this.minutes = document.querySelector('#minutes');
    this.hours = document.querySelector('#hours');
    
    this.allTimers = [
      this.centiseconds,
      this.seconds, 
      this.minutes,
      this.hours,
    ];

    this.start = document.querySelector('.start');
    this.reset = document.querySelector('.reset');

    this.start.addEventListener('click', this.handleStartClick.bind(this));
    this.reset.addEventListener('click', this.handleResetClick.bind(this));
  }

  handleStartClick() {
    if (this.isStartButton()) {
      this.timeCode = this.startTimer();
      this.makeStop();
    } else {
      this.stopTimer();
      this.makeStart();
    }
  }

  handleResetClick() {
    console.log('All timers are being reset');

    this.stopTimer();
    this.resetAllTimers();

    if (this.isStopButton()) {
      this.makeStart();
    }
  }

  makeStart() {
    this.start.textContent = 'Start';
  }

  makeStop() {
    this.start.textContent = 'Stop';
  }

  isStartButton() {
    return this.start.textContent === 'Start';
  }

  isStopButton() {
    return this.start.textContent === 'Stop';
  }

  getTimerValue(timer) {
    let value = timer.textContent.replaceAll(/[^\d]/g, '');
    return Number(value);
  }

  setDisplay(timer, value) {
    if (value < 10) value = '0' + String(value);
    if (timer !== this.centiseconds) value += ':';
    timer.textContent = value;
  }

  stopTimer() {
    clearInterval(this.timeCode);
  }

  startTimer() {
    return setInterval(() => {
      this.addToCentiseconds();
      
      if (this.centisecondsHitMax()) {
        this.addToSeconds();
      }

      if (this.secondsHitMax()) {
        this.addToMinutes();
      }

      if (this.minutesHitMax()) {
        this.addToHours();
      }

      if (this.hoursHitMax()) {
        this.resetAllTimers();
      }
    }, StopWatch.tenMs);
  }

  addToCentiseconds() {
    let value = this.getTimerValue(this.centiseconds);
    value += 1;
    this.setDisplay(this.centiseconds, value);
  }

  addToSeconds() {
    let value = this.getTimerValue(this.seconds);
    value += 1;
    this.setDisplay(this.seconds, value);
    this.resetTimersBefore(this.seconds);
  }

  addToMinutes() {
    let value = this.getTimerValue(this.minutes);
    value += 1;
    this.setDisplay(this.minutes, value);
    this.resetTimersBefore(this.minutes);
  }

  addToHours() {
    let value = this.getTimerValue(this.hours);
    value += 1;
    this.setDisplay(this.hours, value);
    this.resetTimersBefore(this.hours);
  }

  resetAllTimers() {
    this.allTimers.forEach(timer => this.resetTimer(timer));
  }

  resetTimersBefore(timer) {
    let idx = this.allTimers.indexOf(timer);

    this.allTimers.slice(0, idx).forEach(earlierTimer => {
      this.resetTimer(earlierTimer);
    });
  }

  resetTimer(timer) {
    this.setDisplay(timer, 0);
  }

  centisecondsHitMax() {
    return this.getTimerValue(this.centiseconds) === StopWatch.centisecondMax;
  }

  secondsHitMax() {
    return this.getTimerValue(this.seconds) === StopWatch.secondMax;
  }

  minutesHitMax() {
    return this.getTimerValue(this.minutes) === StopWatch.minuteMax;
  }

  hoursHitMax() {
    return this.getTimerValue(this.hours) === StopWatch.hourMax;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StopWatch();
});