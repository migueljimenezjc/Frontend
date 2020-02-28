import React, { Component } from "react";
class Select extends Component {  
  selectOption(value, selected){
    if (value === selected) {
      return true;
    }
    return false;
  }
  render() {
    const { id, title, list, optionSelected } = this.props;
    return (
      <div className="form-group">
        <label>{title}</label>
        <select id={id} className="form-control">
          <option key={0} value="" selected={true} disabled>Select option</option>
          {list.map(data => (
            <option key={data.id} value={data.id} selected={this.selectOption(data.name, optionSelected)}>
              {data.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
export default Select;
