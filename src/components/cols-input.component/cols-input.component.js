import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Input from '../input.component';
import GridActionCreator from '../../action-creators/grid.action.creator';

export default class ColsInput extends Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div
        className="cols-input"
        onChange={this._onChange}
        >
        <div className="input-text">
          <label
            htmlFor="Width"
            >
            Width
          </label>
          <input
            ref="input"
            id="Width"
            type="text"
          />
        </div>
      </div>
    );
  }

  _onChange(e) {
    const grid = this.props.grid;
    console.log('grid', grid);
    const inputDom = ReactDom.findDOMNode(this.refs.input);
    const cols = Number.parseInt(inputDom.value);
    console.log('cols', cols);
    GridActionCreator.gridChange(grid.m, cols, grid.countOccupied);
  }

}
