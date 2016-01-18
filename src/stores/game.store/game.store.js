import {ReduceStore} from 'flux/utils';
import Dispatcher from '../../dispatcher';
import ActionConstants from '../../action-constants';
import Game from '../../lib/game';
import GridStore from '../../stores/grid.store';
import GameActionCreator from '../../action-creators/game.action.creator';

class GameStore extends ReduceStore {

  getInitialState() {
    return new Game(9, 9, 10);
  }

  reduce(state, action) {
    Dispatcher.waitFor([
      GridStore.getDispatchToken()
    ]);
    const grid = GridStore.getState();
    const {type, payload} = action;
    switch (type) {
      case ActionConstants.CELL_OPEN:
        if (payload.cell.value === -1) {
          setTimeout(GameActionCreator.gameOver, 0);
          return state.over();
        }
        else if (grid.openedCorrectly) {
          setTimeout(GameActionCreator.gameWin, 0);
          return state.win();
        }
        else if (!state.isStarted) {
          setTimeout(GameActionCreator.gameStart, 0);
          return state.start();
        }
        else return state;
      case ActionConstants.CELL_FLAG: {
        const grid = GridStore.getState();
        if (grid.flaggedCorrectly) return state.win();
        else return state;
      }
      case ActionConstants.GAME_NEW:
        return state.new();
      default: return state;
    }
  }

}

const instance = new GameStore(Dispatcher);
export default instance;

