import Dispatcher from '../dispatcher';
import ActionConstants from '../action-constants';
import TimerActionCreator from './timer.action.creator';

let apiAcions = {

  gameStart: (game) => {
    setTimeout(TimerActionCreator.timerStart, 0);
    Dispatcher.dispatch({
      type: ActionConstants.GAME_START,
      payload: {
        game
      }
    });
  },

  gameOver: (game) => {
    setTimeout(TimerActionCreator.timerStop, 0);
    Dispatcher.dispatch({
      type: ActionConstants.GAME_OVER,
      payload: {
        game
      }
    });
  },

  gameWin: (game) => {
    setTimeout(TimerActionCreator.timerStop, 0);
    Dispatcher.dispatch({
      type: ActionConstants.GAME_WIN,
      payload: {
        game
      }
    });
  },

  gameNew: () => {
    setTimeout(TimerActionCreator.timerStop, 0);
    Dispatcher.dispatch({
      type: ActionConstants.GAME_NEW,
    });
  },

};

export default apiAcions;

