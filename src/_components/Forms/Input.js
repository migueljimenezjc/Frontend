import React, { Component } from "react";
class Input extends Component {
  static defaultProps = {
    value: ''
  }
  render() {
      const {id,title, type, placeholder, value} = this.props;
    return (
      <div className="form-group">
        <label>{title}</label>
        <input id={id} type={type} className="form-control" placeholder={placeholder} value={value} />
      </div>
    );
  }
}
export default Input;
