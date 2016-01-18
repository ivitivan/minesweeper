import React, {Component} from 'react';
import UIStore from '../../stores/ui.store';
import {Container} from 'flux/utils';
import UIActionCreator from '../../action-creators/ui.action.creator';

class MenuButton extends Component {

  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  static getStores() {
    return [UIStore];
  }

  static calculateState(prevState) {
    return {
      ui: UIStore.getState(),
    };
  }

  render() {
    return (
      <button
        className="menu-button button"
        onClick={this._onClick}
        >
        <i className="icon-ic_settings_black_24px"></i>
      </button>
    );
  }

  _onClick(e) {
    const {ui} = this.state;
    if (ui.menu === 'hidden') UIActionCreator.showMenu();
    if (ui.menu === 'show') UIActionCreator.hideMenu();
  }

}

const container = Container.create(MenuButton);
export default container;

