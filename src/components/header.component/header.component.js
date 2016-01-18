import React, {Component} from 'react';
import Timer from '../timer.component';
import FlaggedCounter from '../flagged-counter.component';
import NewGameButton from '../new-game-button';
import MenuButton from '../menu-button.component';

export default class Header extends Component {

  render() {
    const {game} = this.props;
    const content = game.isOver ? 'Game Over' : game.isWin ? 'You Win!' : '';
    return (
      <div className="header">
        <div className="header__left">
          <NewGameButton />
        </div>
        <div className="header__center">
          <Timer />
          <div className="game__status">
            {content}
          </div>
          <FlaggedCounter grid={this.props.grid} />
        </div>
        <div className="header__right">
          <MenuButton />
        </div>
      </div>
    );
  }

}
