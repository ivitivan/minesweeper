import {ReduceStore} from 'flux/utils';
import Dispatcher from '../../dispatcher';
import ActionConstants from '../../action-constants';

class TimerStore extends ReduceStore {

  getInitialState() {
    return {elapsedTime: 0};
  }

  reduce(state, action) {
    const {type, payload} = action;
    switch (type) {
      case ActionConstants.TICK:
        return {elapsedTime: state.elapsedTime + 1};
      case ActionConstants.GAME_NEW:
        return {elapsedTime: 0};
      default: return state;
    }
  }

}

const instance = new TimerStore(Dispatcher);
export default instance;

