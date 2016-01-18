import Dispatcher from '../dispatcher';
import ActionConstants from '../action-constants';

let timerToken;

let apiAcions = {

  timerStart: () => {
    Dispatcher.dispatch({
      type: ActionConstants.TIMER_START,
    });
    timerToken = setInterval(() => {
      Dispatcher.dispatch({
        type: ActionConstants.TICK,
      });
    }, 1000);
  },

  timerStop: () => {
    console.log('HERE');
    clearInterval(timerToken);
    Dispatcher.dispatch({
      type: ActionConstants.TIMER_STOP,
    });
  }

};

export default apiAcions;

