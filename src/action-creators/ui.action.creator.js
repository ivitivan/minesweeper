import Dispatcher from '../dispatcher';
import ActionConstants from '../action-constants';

let apiAcions = {

  showMenu() {
    Dispatcher.dispatch({
      type: ActionConstants.UI_SHOW_MENU,
    });
  },

  hideMenu() {
    Dispatcher.dispatch({
      type: ActionConstants.UI_HIDE_MENU,
    })
  }

};

export default apiAcions;

