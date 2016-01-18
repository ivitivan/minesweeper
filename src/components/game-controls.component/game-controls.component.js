import React, {Component} from 'react';
import RowsInput from '../rows-input.component';
import ColsInput from '../cols-input.component';
import BombsInput from '../bombs-input.component';
import {Container} from 'flux/utils';
import UIStore from '../../stores/ui.store';
import classnames from 'classnames';

class GameControls extends Component {

  static getStores() {
    return [UIStore];
  }

  static calculateState(prevState) {
    return {
      ui: UIStore.getState(),
    };
  }

  render() {
    const {game} = this.props;
    const {ui} = this.state;
    const classNames = [];
    if (ui.menu === 'show') classNames.push('game__controls_show');
    if (ui.menu === 'hidden') classNames.push('game__controls_hide');
    classNames.push('game__controls');
    return (
      <div className={classnames(classNames)}>
        <RowsInput grid={this.props.grid} />
        <ColsInput grid={this.props.grid} />
        <BombsInput grid={this.props.grid} />
      </div>
    );
  }

}

const container = Container.create(GameControls);
export default container;

