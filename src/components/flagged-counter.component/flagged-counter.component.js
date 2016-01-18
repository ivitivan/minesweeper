import React, {Component} from 'react';

export default class FlaggedCounter extends Component {

  render() {
    const {grid} = this.props;
    const content = grid.countOccupied - grid.countFlagged;
    return (
      <div className="flagged-counter">
        <i className="icon-ic_flag_black_24px"></i>
        {content}
      </div>
    );
  }

}

