import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Input from '../input.component';
import GridActionCreator from '../../action-creators/grid.action.creator';

export default class RowsInput extends Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  render() {
    return (
      <div
        className="rows-input"
        onChange={this._onChange}
        >
        <div className="input-text">
          <label
            htmlFor="Height"
            >
            Height
          </label>
          <input
            ref="input"
            id="Height"
            type="text"
          />
        </div>
      </div>
    );
  }

  _onChange(e) {
    const grid = this.props.grid;
    const inputDom = ReactDom.findDOMNode(this.refs.input);
    const rows = Number.parseInt(inputDom.value);
    GridActionCreator.gridChange(rows, grid.n, grid.countOccupied);
  }

}
