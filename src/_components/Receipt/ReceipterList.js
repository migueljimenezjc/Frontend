import React, { Component } from "react";
import DataTable from "../Forms/Table";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default class ReceiptRegister extends Component {
  state = {
    registers: [],
    show: false,
    id: 0
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = (id) => {
    this.setState({ show: true });
    this.setState({ id:id });
  };
  componentDidMount() {
    if(localStorage.getItem('token') == null){
       window.location = '/sign-in'; 
    }
    axios
      .get("/api/Receipts")
      .then(result => {
        const registers = result.data;
        this.setState({ registers });
      })
      .catch(e => {
        console.log(e);
      });
  }
  onDelete(id){
    this.handleShow(id);
  };
  onConfirmDelete(){
     var id = this.state.id;
     axios
    .delete(`/api/Receipts/${ id }`)
    .then(data => {
      if(data.status == 200){
         this.handleClose();
         this.componentDidMount();
      }
    })
    .catch(e => {
        console.log(e);
    });
  }
  render() {
    return (
      <>
        <div className="form-group">
          <h3>Receipt List</h3>
          <div className="form-group">
          <Link className="btn btn-info" to="/new">New Register</Link>
          </div>
          <DataTable
            registers={this.state.registers}
            functions={{
              handleClose: this.handleClose,
              handleShow: this.handleShow,
              onDelete: this.onDelete
            }}
          />
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you agree to delete the record?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={ this.onConfirmDelete.bind(this) }>Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
