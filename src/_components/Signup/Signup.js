import React, {Component} from 'react';
import Input from '../Forms/Input'
export default class Signup extends Component {
    render() {
        return (
            <form>
            <h3>Sign Up</h3>

            <Input id ='txtFistname' placeholder="Fist name" title="Fist Name" type='text'  />
            <Input id ='txtLastname' placeholder="Last name" title="Last Name" type='text'  />
            <Input id ='txtEmail' placeholder="Enter mail" title="Email Address" type='email'  />
            <Input id ='txtPassword' placeholder="Enter password" title="Password" type='password'  />
            
            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="/">sign in?</a>
            </p>
        </form>
        );
    }
}