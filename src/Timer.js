import audio from '../assets/metronome-click.mp3';

const metronomeClick = new Audio(audio); // eslint-disable-line

export default class Timer {
  oneMinute = 60000;
  constructor(bpm, setBeatCounting, beats) {
    this.bpm = bpm;
    this.beats = beats;
    this.interval;
    this.setBeatCounting = setBeatCounting;
  }

  click() {
    metronomeClick.play();

    this.drift = new Date().getTime() - this.expected;

    this.expected += this.timeOut;

    this.setBeatCounting(prev => prev + 1 >= this.beats ? 0 : prev+= 1);

    this.interval = setTimeout(() => {  this.click(); }, this.timeOut - this.drift);
  }

  start() {
    metronomeClick.play();

    this.timeOut =  this.oneMinute / this.bpm;

    this.expected = new Date().getTime(); + this.timeOut;

    this.interval = setTimeout(() => {  this.click(); }, this.timeOut);
  }

  stop() {
    clearTimeout(this.interval);
  }
}