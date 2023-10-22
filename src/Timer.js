import audio from '../assets/metronome-click.mp3';

const metronomeClick = new Audio(audio); // eslint-disable-line

export default class Timer {
  oneMinute = 60000;
  constructor(bpm) {
    this.bpm = bpm;
  }

  start() {
    this.interval = setInterval(() => { metronomeClick.play(); }, this.oneMinute / this.bpm);
  }

  stop() {
    clearInterval(this.interval);
  }
}