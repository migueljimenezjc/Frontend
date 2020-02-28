import React, { Component } from "react";
import Select from '../Forms/Select';
import Input from "../Forms/Input";
import {Link} from "react-router-dom";
import axios from "axios";
import { receiptService } from '../../_services';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default class ReceiptRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: '',
      amount: 0,
      currency: '',
      date: '',
      commentary: '',
      
      show: false,
      msg: '',
      errors: {}
    }
  };
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
  }
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = (msg) => {
    this.setState({ show: true });
    this.setState({ msg:msg });
  };
  onClick(event) {
    var obj = {
      provider : this.refs.provider.value, 
      amount : this.refs.amount.value,
      currency : this.refs.currency.value,
      date : this.refs.date.value,
      commentary :this.refs.commentary.value,
    };
    event.preventDefault();
    if(!this.handleValidation()){
      return;
    }
    var queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    fetch('/api/Receipts?'+queryString, {
      method: 'POST'
    }).then((data) => {
        console.log(data.status);
        if(data.status == 201){
          this.handleShow('Te receipter created sucessfull..');
        }else{
          this.handleShow('Unable to process request..');
        }
    })
    .catch(error => {
      this.handleShow('Unable to process request..');
      console.error('error', error)    
    });
  };
  render() {
    return (
      <form>
        <h3>Register Receipt</h3>
        <label>Provider</label>
        <span style={{color: "red"}}>{this.state.errors["provider"]}</span>
        <input placeholder="Enter provider" title="Provider" type='text' className="form-control" ref="provider" required />
        <label>Amount</label>
        <span style={{color: "red"}}>{this.state.errors["amount"]}</span>
        <input  placeholder='Enter amount' title='Amount' type='text' className="form-control" ref="amount"   />
        <label>Currency</label>
        <span style={{color: "red"}}>{this.state.errors["currency"]}</span>
        <input  placeholder='Enter currency' title='Currency' type='text' className="form-control" ref="currency"   />
        <label>Date</label>
        <span style={{color: "red"}}>{this.state.errors["date"]}</span>
        <input  title='Date' type='date' className="form-control" ref="date"   />
        <label>Commentary</label>
        <span style={{color: "red"}}>{this.state.errors["commentary"]}</span>
        <textarea placeholder='Enter commentary' title='Commentary' type='date' className="form-control" ref="commentary"></textarea>
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