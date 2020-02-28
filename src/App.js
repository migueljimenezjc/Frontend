import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./_components/Login/Login";
import Signup from "./_components/Signup/Signup";
import ReceiptList from './_components/Receipt/ReceipterList';
import ReceiptUpdate  from './_components/Receipt/ReceipterUpdate';
import ReceiptRegister from "./_components/Receipt/ReceiptRegister";

class App extends Component {

  state = {
    isActive: false
  };

  handleShow = () => {
    this.setState({
      isActive: true
    });
  };

  handleHide = () => {
    this.setState({
      isActive: false
    });
  };
  
  logOut(){
    localStorage.removeItem('token');
    window.location = '/sign-in'; 
  }

  componentDidMount(){
    if(localStorage.getItem('token') != null){
      this.setState({
        isActive: true
      });
    }else{
      this.setState({
        isActive: false
      });
     
    }
  }

render() {
return(
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Tes.API
            </Link>
            <div className="collapse navbar-collapse" id="navbarToglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                 { this.state.isActive ?(
                  <Link className="nav-link" onClick={ this.logOut.bind(this) }>
                     Log Out
                   </Link>
                   ) : (
                   <Link className="nav-link" to={"/sign-up"}>
                      Sign up 
                   </Link>
                 )}
               </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/sign-in" component={Login} />
              <Route exact path="/sign-up" component={Signup} />
              <Route exact path="/home" component={ReceiptList} />
              <Route exact path="/update/:id" component={ReceiptUpdate} />
              <Route exact path="/new" component={ReceiptRegister} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
);
  }
}

export default App;
