import {ReduceStore} from 'flux/utils';
import Dispatcher from '../../dispatcher';
import ActionConstants from '../../action-constants';
import Grid from '../../lib/grid';

class GridStore extends ReduceStore {

  getInitialState() {
    return new Grid(9, 9, 10);
  }

  reduce(state, action) {
    console.log('action', action);
    const {type, payload} = action;
    switch (type) {
      case ActionConstants.CELL_OPEN:
        return state.open(payload.cell.x, payload.cell.y);
      case ActionConstants.CELL_FLAG:
        return state.flag(payload.cell.x, payload.cell.y);
      case ActionConstants.CELL_UNFLAG:
        return state.unflag(payload.cell.x, payload.cell.y);
      case ActionConstants.GRID_CHANGE:
        return state.changeGrid(payload.m, payload.n, payload.occupied);
      case ActionConstants.GAME_NEW:
        return state.new(state.m, state.n, state.countOccupied);
      default: return state;
    }
  }

}

const instance = new GridStore(Dispatcher);
export default instance;

