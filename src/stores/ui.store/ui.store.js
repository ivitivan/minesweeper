import {ReduceStore} from 'flux/utils';
import Dispatcher from '../../dispatcher';
import ActionConstants from '../../action-constants';

class UIStore extends ReduceStore {

  getInitialState() {
    return {
      menu: 'hidden'
    };
  }

  reduce(state, action) {
    const {type, payload} = action;
    switch (type) {
      case ActionConstants.UI_SHOW_MENU:
        return {menu: 'show'};
      case ActionConstants.UI_HIDE_MENU:
        return {menu: 'hidden'};
      default: return state;
    }
  }

}

const instance = new UIStore(Dispatcher);
export default instance;

