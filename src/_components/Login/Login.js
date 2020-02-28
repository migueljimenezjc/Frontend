import React, { Component } from "react";
import {Link} from 'react-router-dom'
import Input from '../Forms/Input';
import { Button } from "react-bootstrap";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      msg : ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]:value
    });

  }
  onClick(event){
    var obj = {
      email: this.refs.email.value, 
      password:this.refs.password.value
    }
    event.preventDefault();
    var queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    axios
      .post('/api/Users/Login?'+queryString)
      .then(result => {
        if(result.status == 200){
          localStorage.setItem("token",result.data.token );
          window.location = '/home'; 
        }else{
          this.setState({ msg:'Invalid user' });
        }
      })
      .catch(e => {
        this.setState({ msg:'Invalid user' });
      });
  }
  render() {
    return (
      <form>
        <h3>Sign In</h3>
        <span className="App-span-error">{ this.state.msg }</span>
        <br></br>
        <label>Email</label>
        <input className="form-control" placeholder="Enter mail" name="Email address" type='email' ref="email" required />
        <br></br>
        <label>Password</label>
        <input className="form-control" placeholder="Enter password" name="Password" type='password' ref="password"  />
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <Button className="btn btn-primary btn-block" onClick={ this.onClick.bind(this) }>
            Submit
        </Button>
        <p className="forgot-password text-right">
          Forgot <a href="/">password?</a>
        </p>
      </form>
    );
  }
}
