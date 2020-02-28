import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Tbody extends Component {
  render() {
    const { datas, functions } = this.props;
    return (
      <tbody>
        {datas.map((data, index) => (
          <tr key={data.id}>
            <th scope="row">{index + 1}</th>
            <td>{data.provider}</td>
            <td>{data.amount}</td>
            <td>{data.currency}</td>
            <td>{data.date}</td>
            <td>{data.comentary}</td>
            <td>
              <Link
                className="btn btn-success"
                to={{ pathname: `/update/${ data.id }`, query: { data: data } }}
              >
                Actualizar
              </Link>
            </td>
            <td>
              <Button
                className="btn btn-danger"
                onClick={e => {
                  functions.onDelete(data.id);
                }}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
export default class DataTable extends Component {
  render() {
    const { registers, functions } = this.props;
    return (
      <table className="table table-responsive table-sm">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Provider</th>
            <th scope="col">Amount</th>
            <th scope="col">Currency</th>
            <th scope="col">Date</th>
            <th scope="col">Comment</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <Tbody datas={registers} functions={functions} />
      </table>
    );
  }
}
