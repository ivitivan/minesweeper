import React, {Component} from 'react';
import Cell from '../cell.component';

export default class Grid extends Component {

  render() {
    const {grid} = this.props;
    if (!grid) return (
      <div className="grid">
        Loading ...
      </div>
    );
    return (
      <div className="grid-container">
        <div className="grid">
          {
            grid.cells.map((row, x) => {
              return (
                <div key={x} className="grid__row">
                  {
                    row.map((cell, y) => {
                      return (
                        <Cell
                          key={`${cell.x}:${cell.y}`}
                          classNames={['grid__cell']}
                          cell={cell}
                          game={this.props.game}
                        />
                        );
                    })
                  }
                </div>
                );
            })
          }
        </div>
      </div>
    );
  }
}

