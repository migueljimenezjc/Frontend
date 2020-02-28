import React, {Component} from 'react';
import DataTimePickerField from 'react-bootstrap-date-picker'
class DateTimePicker extends Component {
    static defaultProps = {
        id: 'example-datepicker'
    }
    getInitialState =  () =>{
        var value = new Date().toISOString();
        return {
          value: value
        }
      };
      handleChange = (value, formattedValue) => {
        this.setState({
          value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
          formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
      };
      componentDidUpdate = () => {
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementById(this.props.id);
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute(this.props.id)) // Formatted String, ex: "11/19/2016"
      };
    render() {
        const {id, title} = this.props;
        return (
           <div className="form-group">
               <label>{title}</label>
               <DataTimePickerField id={id} value={this.state.value} onChange={this.handleChange(this.getInitialState(), 'dd/MM/YYYY')} />
           </div> 
        );
    }
}
export default DateTimePicker;