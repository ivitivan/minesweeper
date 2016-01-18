import Grid from '../grid';
import _ from 'lodash';

export default class Game {

  constructor() {
    this.init();
  }

  init() {
    this.isStarted = false;
    this.isOver = false;
    this.countFlags = 0;
    this.isWin = false;
  }

  start() {
    this.isStarted = true;
    this.isOver = false;
    return _.clone(this, true);
  }

  over() {
    this.isOver = true;
    this.isStarted = false;
    return _.clone(this, true);
  }

  win() {
    this.isStarted = false;
    this.isWin = true;
    return _.clone(this, true);
  }

  new() {
    this.init();
    return _.clone(this, true);
  }

}

