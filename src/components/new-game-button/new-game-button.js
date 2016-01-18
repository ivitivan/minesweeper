import React, {Component} from 'react';
import GameActionCreator from '../../action-creators/game.action.creator';

export default class NewGameButton extends Component {

  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <button
        className="new-game-button button"
        onClick={this._onClick}
        >
        <i className="icon-ic_refresh_black_24px"></i>
      </button>
    );
  }

  _onClick(e) {
    GameActionCreator.gameNew();
  }

}
