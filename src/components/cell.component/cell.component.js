import React, {Component} from 'react';
import classnames from 'classnames';
import GridActionCreator from '../../action-creators/grid.action.creator';
import GameActionCreator from '../../action-creators/game.action.creator';

export default class Cell extends Component {

  constructor(props) {
    super(props);
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this.state = {status: 'default'};
  }

  render() {
    const {cell} = this.props;
    const classNames = this.props.classNames ? this.props.classNames : [];

    classNames.push('cell');
    if (cell.isOpen) classNames.push('grid__cell_open');
    if (cell.isOpen && cell.isOccupied) classNames.push('grid__cell_occupied');
    if (cell.isFlagged) classNames.push('grid__cell_flagged');

    const content = cell.isOpen ? cell.value === 0 ? '' : cell.value : '';
    //const content = cell.value;
    return (
      <div className={classnames(classNames)}
        onClick={this._onClick} ref="cell"
        onMouseDown={this._onMouseDown}
        onMouseUp={this._onMouseUp}
        >
        {content}
      </div>
    );
  }

  _onMouseDown(e) {
    this.setState({status: 'default'});
    const {x, y} = this.props.cell;
    const {cell} = this.props;
    this.timer = setTimeout(() => {
      if (cell.isFlagged && !cell.isOpen) {
        GridActionCreator.cellUnflag(cell);
        this.setState({status: 'unflagging'});
      } else if (!cell.isFlagged && !cell.isOpen) {
        GridActionCreator.cellFlag(cell);
      }
    }, 500);
  }

  _onMouseUp(e) {
    clearTimeout(this.timer);
    if (this.state.status === 'unflagging') {
      return;
    } else {
      const {game, cell} = this.props;
      if (game.isOver) return;
      if (!cell.isOpen && !cell.isFlagged && this.state.status !== 'unflagging') {
        const {x, y} = this.props.cell;
        GridActionCreator.cellOpen(cell);
      } else {
        this.setState({status: 'default'});
      }
    }
  }

}
