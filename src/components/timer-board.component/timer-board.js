import React, {Component} from 'react';
import Timer from '../timer.component';
import GridStore from '../../stores/grid.store';
import {Container} from 'flux/utils';

export default class TimerBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {status: 'default'};
  }

  static getStores() {
    return [GridStore];
  }

  static calculateState(prevState) {
    return {
      grid: GridStore.getState(),
    };
  }


  render() {
    return (
      <div className="timer-board">
        <Timer />
      </div>
    )
  }

}

const container = Container.create(TimerBoard);
export default container;

