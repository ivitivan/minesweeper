import React, {Component} from 'react';

export default class Input extends Component {

  render() {
    return (
      <div className="input-text">
        <label
          htmlFor={this.props.label}
        >
          {this.props.label}
        </label>
        <input
          id={this.props.label}
          type="text"
        />
      </div>
    );
  }

}

