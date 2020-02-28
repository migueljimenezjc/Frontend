import React, { Component } from "react";
import Select from '../Forms/Select';
import Input from "../Forms/Input";
import {Link} from "react-router-dom";
import axios from "axios";
import { receiptService } from '../../_services';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { formatDate } from "../../_helpers";


export default class ReceiptUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      provider: '',
      amount: 0,
      currency: '',
      date: '',
      commentary: '',
      
      show: false,
      msg: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleValidation(){
    let errors = {};
    let formIsValid = true;

    if(!this.refs.provider.value){
       formIsValid = false;
       errors["provider"] = "  *Cannot be empty";
    }
    if(!this.refs.amount.value){
      formIsValid = false;
      errors["amount"] = "  *Cannot be empty";
    }
    if(!this.refs.currency.value){
        formIsValid = false;
        errors["currency"] = "  *Cannot be empty";
    }
    if(!this.refs.date.value){
      formIsValid = false;
      errors["date"] = "  *Cannot be empty";
    }
    if(!this.refs.commentary.value){
      formIsValid = false;
      errors["commentary"] = "  *Cannot be empty";
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  componentWillMount(){
    if(localStorage.getItem('token') == null){
      window.location = '/sign-in'; 
   }
    this.getReceipt();
  }
  
  getReceipt = () => {
    var receiptId = this.props.match.params.id;
    axios
    .get(`/api/Receipts/GetById?id=${ receiptId }`)
    .then( response => {
      this.setState({
      id : response.data.id,
      provider : response.data.provider,
      amount : response.data.amount,
      currency : response.data.currency,
      date : formatDate(response.data.date),
      commentary : response.data.commentary
      });
    })
    .catch(e => {
      console.log(e);
    });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = (msg) => {
    this.setState({ show: true });
    this.setState({ msg:msg });
  };
  onClick(event) {
    var obj = {
      id: this.state.id,
      provider : this.refs.provider.value, 
      amount : this.refs.amount.value,
      currency : this.refs.currency.value,
      date : this.refs.date.value,
      commentary :this.refs.commentary.value,
    };
    event.preventDefault();
    var queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    fetch('/api/Receipts?'+queryString, {
      method: 'PUT'
    }).then((data) => {
        console.log(data);
        if(data.status == 200){
          this.handleShow('Te receipter updateds sucessfull..');
        }else{
          this.handleShow('Unable to process request..');
        }
    })
    .catch(error => {
      this.handleShow('Unable to process request..');
      console.error('Unable to add item.', error)    
    });
  };

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]:value
    });

  }
  render() {
    return (
      <form>
        <h3>Register Receipt</h3>
        <label>Provider</label>
        <span style={{color: "red"}}>{this.state.errors["provider"]}</span>
        <input placeholder="Enter provider" name="provider" type='text' className="form-control" ref="provider" value={ this.state.provider } onChange={ this.handleInputChange }  />
        <label>Amount</label>
        <span style={{color: "red"}}>{this.state.errors["amount"]}</span>
        <input  placeholder='Enter amount' name='amount' type='text' className="form-control" ref="amount" value={ this.state.amount } onChange={ this.handleInputChange }  />
        <label>Currency</label>
        <span style={{color: "red"}}>{this.state.errors["currency"]}</span>
        <input  placeholder='Enter currency' name='currency' type='text' className="form-control" ref="currency" value={ this.state.currency } onChange={ this.handleInputChange }   />
        <label>Date</label>
        <span style={{color: "red"}}>{this.state.errors["date"]}</span>
        <input  name='date' type='date' className="form-control" ref="date" defaultValue={ this.state.date } value={ this.state.date } onChange={ this.handleInputChange }  />
        <label>Commentary</label>
        <span style={{color: "red"}}>{this.state.errors["commentary"]}</span>
        <textarea placeholder='Enter commentary' name='commentary' type='date' className="form-control" ref="commentary" value={ this.state.commentary } onChange={ this.handleInputChange }  ></textarea>
        <br></br>
        <button className="btn btn-primary btn-block" onClick={ this.onClick.bind(this) } >
          Save
        </button>
        <Link className="btn btn-danger btn-block"  to="/home">
          Cancel
        </Link>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.msg}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={ this.handleClose } >Acept</Button>
          </Modal.Footer>
        </Modal>
      </form>
    );
  }
}