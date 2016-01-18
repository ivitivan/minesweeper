import React, {Component} from 'react';
import {Container} from 'flux/utils';
import GameControls from '../game-controls.component';
import Grid from '../grid.component';
import Header from '../header.component';
import GameStore from '../../stores/game.store';
import GridStore from '../../stores/grid.store';

export default class Root extends Component {

  static getStores() {
    return [GameStore, GridStore];
  }

  static calculateState(prevState) {
    return {
      game: GameStore.getState(),
      grid: GridStore.getState(),
    };
  }

  render() {
    return (
      <div className="root">
        <Header {...this.state} />
        <GameControls {...this.state} />
        <Grid {...this.state} />
        <div className="rules">
          <p>
            Click to open the cell. Click and hold to flag the cell.
          </p>
        </div>
      </div>
    );
  }

}

const container = Container.create(Root);
export default container;

