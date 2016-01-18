import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Input from '../input.component';
import GridActionCreator from '../../action-creators/grid.action.creator';

export default class BombsInput extends Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div
        className="bombs-input"
        onChange={this._onChange}
        >
        <div className="input-text">
          <label
            htmlFor="Mines"
            >
            Mines
          </label>
          <input
            ref="input"
            id="Mines"
            type="text"
          />
        </div>
      </div>
    );
  }

  _onChange(e) {
    const grid = this.props.grid;
    const inputDom = ReactDom.findDOMNode(this.refs.input);
    const bombs = Number.parseInt(inputDom.value);
    GridActionCreator.gridChange(grid.m, grid.n, bombs);
  }

}
