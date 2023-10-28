import audio from '../assets/metronome-click.mp3';

const metronomeClick = new Audio(audio); // eslint-disable-line

export default class Timer {
  oneMinute = 60000;
  constructor(bpm) {
    this.bpm = bpm;
    this.timeOut = this.oneMinute / this.bpm;
    this.interval;
  }

  click() {
    metronomeClick.play();

    this.drift = new Date().getTime() - this.expected;

    this.expected += this.timeOut;

    this.interval = setTimeout(() => {  this.click(); }, this.timeOut - this.drift);

  }

  start() {
    metronomeClick.play();

    this.expected = new Date().getTime(); + this.timeOut;

    this.interval = setTimeout(() => {  this.click(); }, this.timeOut);
  }

  stop() {
    clearTimeout(this.interval);
  }
}