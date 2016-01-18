import React, {Component} from 'react';
import {Container} from 'flux/utils';
import TimerStore from '../../stores/timer.store';

class Timer extends Component {

  static getStores() {
    return [TimerStore];
  }

  static calculateState(prevState) {
    return {
      timer: TimerStore.getState(),
    };
  }

  render() {
    return (
      <div className="timer">
        <i className="icon-ic_timer_black_24px"></i>
        {this.state.timer.elapsedTime}
      </div>
    );
  }
}

const container = Container.create(Timer);
export default container;

