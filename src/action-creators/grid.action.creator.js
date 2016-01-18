import Dispatcher from '../dispatcher';
import ActionConstants from '../action-constants';

let apiAcions = {

  cellOpen: (cell) => {
    Dispatcher.dispatch({
      type: ActionConstants.CELL_OPEN,
      payload: {
        cell
      }
    });
  },

  cellFlag: (cell) => {
    Dispatcher.dispatch({
      type: ActionConstants.CELL_FLAG,
      payload: {
        cell
      }
    });
  },

  cellUnflag: (cell) => {
    Dispatcher.dispatch({
      type: ActionConstants.CELL_UNFLAG,
      payload: {
        cell
      }
    });
  },

  gridChange: (m, n, occupied) => {
    Dispatcher.dispatch({
      type: ActionConstants.GRID_CHANGE,
      payload: {
        m, n, occupied
      }
    });
  },

};

export default apiAcions;

